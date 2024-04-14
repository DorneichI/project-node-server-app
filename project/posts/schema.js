import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    body: { type: String, required: true },
    privacy: {
      type: String,
      enum: ["PRIVATE", "PUBLIC"],
      default: "PRIVATE",},
    date: { type: Date, default: Date.now },
    userId: { type: String },
  },
  { collection: "project_posts" });
export default userSchema;
