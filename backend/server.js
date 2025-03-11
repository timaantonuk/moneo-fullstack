import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import checkAuth from "./middleware/authMiddleware.js"



dotenv.config()

const app = express()



app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5050


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err))

app.get("/", (req, res) => {
  res.send("API is working! 🚀")
})

app.get("/api/protected", checkAuth, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId })
})

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`))
