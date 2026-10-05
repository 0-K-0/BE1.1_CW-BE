const express = require("express");
const cors = require("cors");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");
app.use(cors());
app.use(express.json());

async function start() {
  await initializeDatabase();
}

start();

//find a movie with a perticulat title
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    return movie;
  } catch (error) {
    throw error;
  }
}
app.get("/", (req, res) => res.send("Hello"));
app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch movie" });
  }
});
//Get all the Movies from the database
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {
    throw error;
  }
}
app.get("/movies", async (req, res) => {
  try {
    const movies = await readAllMovies();
    if (movies.length != 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ error: "No movies found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch movies." });
  }
});
//get movie by diractor name
const readMovieByDirector = async (directorName) => {
  try {
    const movieByDirector = await Movie.find({ director: directorName });
    return movieByDirector;
  } catch (error) {
    throw error;
  }
};
app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movies = await readMovieByDirector(req.params.directorName);
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "No Movies Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch movies." });
  }
});
//find movie by genre name
const readMoviesByGenre = async (genreName) => {
  try {
    const moviesByGenreName = await Movie.find({ genre: genreName });
    return moviesByGenreName;
  } catch (error) {
    throw error;
  }
};
app.get("/movies/genres/:genreName", async (req, res) => {
  try {
    const movies = await readMoviesByGenre(req.params.genreName);
    if (movies.length != 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ error: "movies not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch movies." });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on", PORT));
module.exports = app;
