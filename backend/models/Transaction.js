import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      type: { type: String, enum: ["income", "expense"], required: true },
      amount: { type: Number, required: true },
      category: { type: String, required: true },
      description: { type: String },
      date: { type: Date, default: Date.now }
    },
    { timestamps: true }
)

export default mongoose.model("Transaction", TransactionSchema)
