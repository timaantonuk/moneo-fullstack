import express from "express"
import Goal from "../models/Goal.js"
import checkAuth from "../middleware/authMiddleware.js"

const router = express.Router()

// Create new goal
router.post("/", checkAuth, async (req, res) => {
  try {
    const { title, targetAmount, emoji, color } = req.body;

    if (!title || !targetAmount || !emoji || !color) {
      return res.status(400).json({ message: "Title, target amount, emoji, and color are required" });
    }

    const goal = new Goal({
      userId: req.userId,
      title,
      targetAmount,
      emoji,
      color
    });

    await goal.save();
    res.status(201).json({ message: "Goal created successfully!", goal });
  } catch (err) {
    res.status(500).json({ message: "Error creating goal", error: err.message });
  }
});

// Get all goals for user
router.get("/", checkAuth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(goals)
  } catch (err) {
    res.status(500).json({ message: "Error fetching goals", error: err.message })
  }
})

// Update goal (mark as completed or update savedAmount)
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const { savedAmount, isCompleted } = req.body
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" })
    }

    if (goal.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to edit this goal" })
    }

    if (savedAmount !== undefined) goal.savedAmount = savedAmount
    if (isCompleted !== undefined) goal.isCompleted = isCompleted

    await goal.save()
    res.json({ message: "Goal updated successfully!", goal })
  } catch (err) {
    res.status(500).json({ message: "Error updating goal", error: err.message })
  }
})

// Delete goal
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" })
    }

    if (goal.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this goal" })
    }

    await goal.deleteOne()
    res.json({ message: "Goal deleted successfully!" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting goal", error: err.message })
  }
})

export default router
