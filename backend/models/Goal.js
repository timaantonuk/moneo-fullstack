import mongoose from "mongoose"

const GoalSchema = new mongoose.Schema(
    {
      userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
      title: {type: String, required: true},
      targetAmount: {type: Number, required: true},
      isCompleted: {type: Boolean, default: false},
      emoji: {type: String, required: true},
      color: {type: String, required: true},
    },
    {timestamps: true}
)

export default mongoose.model("Goal", GoalSchema)
