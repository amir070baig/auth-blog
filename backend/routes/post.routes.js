const express = require("express");
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const {verifyToken, isAdmin} = require("../midleware/auth.middleware");

const prisma = new PrismaClient();


// Create Post
router.post("/", verifyToken, async(req, res) => {
  const {title, content} = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.id
    }
  });
  res.json(newPost)
})


// Get All Posts
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true } } },
  });
  res.json(posts);
});

// Delete Post (Admin Only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id: Number(id) } });
  res.json({ msg: "Post deleted" });
});

module.exports = router;