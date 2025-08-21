const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {PrismaClient} = require("@prisma/client")

dotenv.config();
const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API Running"))

// import routes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/posts", require("./routes/post.routes"))


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})