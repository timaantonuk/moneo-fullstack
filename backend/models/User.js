import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      passwordHash: { type: String, required: true },
      avatar: { type: String, default: null },
      language: { type: String, default: "en" }
    },
    { timestamps: true }
)

export default mongoose.model("User", UserSchema)
