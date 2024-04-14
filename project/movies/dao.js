import model from "./model.js";
export const findAllMovies = model.find();
export const findMovieById = (id) => model.findById(id);
export const findMovieByMovieId = (movieId) =>
  model.findOne({ movieId });//.populate("likedBy").exec()
export const createMovie = (movie) => model.create(movie);
export const updateMovie = (movieId, movie) =>
  model.updateOne({ movieId }, { $set: movie });
export const deleteMovie = (movieId) => model.deleteOne({ movieId });