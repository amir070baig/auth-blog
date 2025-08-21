const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({message: "No token provided"});

  try{
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;
    next();
  }catch(err){
    res.status(401).json({msg: "Invalid token"})
  }
};


exports.isAdmin = (req, res, next) => {
  if(req.user.role !== "admin")
    return res.status(403).json({msg: "Admin only access"});
  next();
}