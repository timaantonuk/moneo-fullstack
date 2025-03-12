import express from "express"
import Transaction from "../models/Transaction.js"
import Category from "../models/Category.js"
import checkAuth from "../middleware/authMiddleware.js"
import { generateRandomColor } from "../utils/generateColor.js"

const router = express.Router()

// Add new transaction
router.post("/", checkAuth, async (req, res) => {
  try {
    const { type, amount, category, emoji, description } = req.body

    if (!type || !amount || !category) {
      return res.status(400).json({ message: "Type, amount, and category are required" })
    }

    console.log(`🔹 User ${req.userId} is adding a new transaction with category: ${category}`);

    // Check if category already exists FOR THIS USER
    let existingCategory = await Category.findOne({ userId: req.userId, name: category });

    if (!existingCategory) {
      // If category does not exist for this user, create a new one
      existingCategory = new Category({
        userId: req.userId,
        name: category,
        emoji: emoji || "💰", // Default emoji if not provided
        color: generateRandomColor()
      })
      await existingCategory.save()
      console.log(`✅ Created new category '${category}' for user ${req.userId}`);
    }

    // Create transaction with the category's color and emoji
    const transaction = new Transaction({
      userId: req.userId,
      type,
      amount,
      category,
      emoji: existingCategory.emoji,
      color: existingCategory.color,
      description
    })

    await transaction.save()
    res.status(201).json({ message: "Transaction added successfully!", transaction })
  } catch (err) {
    console.error("❌ Error adding transaction:", err);
    res.status(500).json({ message: "Error adding transaction", error: err.message })
  }
})

// Get all transactions for user
router.get("/", checkAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 })
    res.json(transactions)
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res.status(500).json({ message: "Error fetching transactions", error: err.message })
  }
})

// Update transaction
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const { amount, description } = req.body
    console.log(`🔄 Received update request for transaction ${req.params.id}:`, req.body)

    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to edit this transaction" })
    }

    // Update only provided fields
    if (amount !== undefined) transaction.amount = amount
    if (description !== undefined) transaction.description = description

    await transaction.save()
    res.json({ message: "Transaction updated successfully!", transaction })
  } catch (err) {
    console.error("❌ Error updating transaction:", err);
    res.status(500).json({ message: "Error updating transaction", error: err.message })
  }
})

// Delete transaction
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this transaction" })
    }

    await transaction.deleteOne()
    res.json({ message: "Transaction deleted successfully!" })
  } catch (err) {
    console.error("❌ Error deleting transaction:", err);
    res.status(500).json({ message: "Error deleting transaction", error: err.message })
  }
})

export default router
