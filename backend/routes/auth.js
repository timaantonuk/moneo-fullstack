import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import crypto from "crypto" // Для генерации случайного seed


const router = express.Router()

// Register user
// Register user
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Генерируем случайный seed для аватарки
    const avatarSeed = crypto.randomBytes(16).toString("hex")
    const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${avatarSeed}`

    // Create new user
    const newUser = new User({
      fullName,
      email,
      passwordHash,
      avatar: avatarUrl, // Сохраняем ссылку на аватар
      language: "en"
    })
    await newUser.save()

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        language: newUser.language,
        avatar: newUser.avatar // Отправляем аватарку клиенту
      },
      token
    })
  } catch (err) {
    res.status(500).json({ message: "Error in registration", error: err.message })
  }
})


// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return res.status(400).json({ message: "Wrong password" })

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    // Send token and user data
    res.json({
      token,
      user: { fullName: user.fullName, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message })
  }
})

export default router
