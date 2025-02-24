const express = require("express");
const cors = require("cors");
const app = express();
const { getAllGames, getGameById } = require("./controllers/index");

app.use(cors());
app.use(express.json());

app.get("/games", async (req, res) => {
  let games = getAllGames();
  return res.status(200).json({ games });
});

app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGameById(id);
  return res.status(200).json({ game });
});

module.exports = { app };
