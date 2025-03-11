import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  emoji: { type: String },
  color: { type: String }
})

export default mongoose.model("Category", CategorySchema)
