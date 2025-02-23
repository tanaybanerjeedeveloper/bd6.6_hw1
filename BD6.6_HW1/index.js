const express = require("express");
const cors = require("cors");
const app = express();
const { getAllMovies, getMovieById } = require("./controllers/index");

app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
  let movies = getAllMovies();
  return res.status(200).json({ movies });
});

app.get("/movies/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);
  return res.status(200).json({ movie });
});

module.exports = { app };
