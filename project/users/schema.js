import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",},
    following: [
      {
        ref: "project_users",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    followers: [
      {
        ref: "project_users",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    likesMovies: [
      {
        ref: "project_movies",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    dislikesMovies: [
      {
        ref: "project_movies",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { collection: "project_users" });
export default userSchema;
