import movieModel from "../movies/model.js";
import userModel from "../users/model.js";


export const userLikesMovie = async (userId, movie) => {
  const user = await userModel.findById(userId);
  let actualMovie = await movieModel.findOne({ movieId: movie.movieId });
  if (!actualMovie) {
    actualMovie = await movieModel.create(movie);
  }
  user.likesMovies.push(actualMovie._id);
  actualMovie.likedBy.push(user._id);
  await user.save();
  await actualMovie.save();
  return {movie: actualMovie, user: user};
};
export const userDislikesMovie = async (userId, movie) => {
  const user = await userModel.findById(userId);
  let actualMovie = await movieModel.findOne({ movieId: movie.movieId });
  if (!actualMovie) {
    actualMovie = await movieModel.create(movie);
  }
  user.dislikesMovies.push(actualMovie._id);
  actualMovie.dislikedBy.push(user._id);
  await user.save();
  await actualMovie.save();

  return {movie: actualMovie, user: user};
};

export const userUnlikesMovie = async (userId, movieId) => {
  const user = await userModel.findById(userId);
  const movie = await movieModel.findOne({ movieId });
  user.likesMovies = user.likesMovies.filter((id) => id.toString() === movie._id.toString());
  movie.likedBy = movie.likedBy.filter((id) => id === user._id);

  const response = {movie: await movie.save(), user: await user.save()};
  return response;
};

export const userUndislikesMovie = async (userId, movieId) => {
  const user = await userModel.findById(userId);
  const movie = await movieModel.findOne({ movieId });
  user.dislikesMovies = user.dislikesMovies.filter((id) => id.toString() === movie._id.toString());
  movie.dislikedBy = movie.dislikedBy.filter((id) => id === user._id);

  const response = {movie: await movie.save(), user: await user.save()}; 
  return response;
};

export const findAllLikedMovies = async (userId) => {
  const user = await userModel.findById(userId).populate("likesMovies");
  return user.likesMovies;
};