import * as dao from "./dao.js";

export default function LikesRoutes(app) {
  app.post("/projectapi/likes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const movie = req.body;
    const userId = currentUser._id;
    const response = await dao.userLikesMovie(userId, movie);
    res.send(response);
  }); 
  app.post("/projectapi/dislikes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const movie = req.body;
    const userId = currentUser._id;
    const response = await dao.userDislikesMovie(userId, movie);
    res.send(response);
  });

  app.delete("/projectapi/likes/:movieId", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const movieId = req.params.movieId;
    const response = await dao.userUnlikesMovie(userId, movieId);
    res.send(response);
  });
  app.delete("/projectapi/dislikes/:movieId", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const movieId = req.params.movieId;
    const response = await dao.userUndislikesMovie(userId, movieId);
    res.send(response);
  });

  app.get("/projectapi/likes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const likedMovies = await dao.findAllLikedMovies(userId);
    res.send(likedMovies);
  });
}