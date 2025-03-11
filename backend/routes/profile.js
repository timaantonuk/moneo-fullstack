import express from "express"
import User from "../models/User.js"
import checkAuth from "../middleware/authMiddleware.js"

const router = express.Router()

// Get user profile
router.get("/", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message })
  }
})

// Update user profile
router.put("/", checkAuth, async (req, res) => {
  try {
    const { fullName, avatar, language } = req.body
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (fullName !== undefined) user.fullName = fullName
    if (avatar !== undefined) user.avatar = avatar
    if (language !== undefined) user.language = language

    await user.save()
    res.json({ message: "Profile updated successfully!", user })
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message })
  }
})

export default router
