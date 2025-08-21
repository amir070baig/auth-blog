const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  const {name, email, password, role} = req.body

  const existing = await prisma.user.findUnique({where: {email}});
  if(existing) return res.status(400).json({message: "User already exist"})
  
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: role || "user"
    }
  });

  res.json({message: "Registered", user})
});


// Login
router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = await prisma.user.findUnique({where: {email}});
  if(!user) return res.status(400).json({message: "User not found"});

  const token = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({token, user: {id: user.id, name: user.name, role: user.role}});
});

module.exports = router