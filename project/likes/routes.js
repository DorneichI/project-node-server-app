import * as dao from "./dao.js";

export default function LikesRoutes(app) {
  app.post("/api/likes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const movie = req.body;
    const userId = currentUser._id;
    const response = await dao.userLikesMovie(userId, movie);
    res.send(response);
  }); 
  app.post("/api/dislikes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const movie = req.body;
    const userId = currentUser._id;
    const response = await dao.userDislikesMovie(userId, movie);
    console.log("dislike",response)
    res.send(response);
  });

  app.delete("/api/likes/:movieId", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const movieId = req.params.movieId;
    const response = await dao.userUnlikesMovie(userId, movieId);
    res.send(response);
  });
  app.delete("/api/dislikes/:movieId", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const movieId = req.params.movieId;
    const response = await dao.userUndislikesMovie(userId, movieId);
    res.send(response);
  });

  app.get("/api/likes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const likedMovies = await dao.findAllLikedMovies(userId);
    res.send(likedMovies);
  });
}