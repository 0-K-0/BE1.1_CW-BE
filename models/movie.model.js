const mongoose = require("mongoose");
const MovieDataSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  genre: [{ type: String }],
  director: String,
  actors: [{ type: String }],
  language: String,
  country: String,
  rating: Number,
  plot: String,
  awards: String,
  posterUrl: String,
  trailerUrl: String,
});
module.exports = mongoose.model("MovieData", MovieDataSchema);
