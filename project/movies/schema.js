import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    title: String,
    movieId: String,
    likedBy: [
        {
            ref: "project_users",
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    dislikedBy: [
        {
            ref: "project_users",
            type: mongoose.Schema.Types.ObjectId,
        },
    ]
  },
  { collection: "project_movies" }
);
export default movieSchema;