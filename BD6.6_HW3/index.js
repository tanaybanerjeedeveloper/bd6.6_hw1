const express = require("express");
const cors = require("cors");
const app = express();
const { getAllBooks, getBookById } = require("./controllers/index");

app.use(cors());
app.use(express.json());

app.get("/books", async (req, res) => {
  let books = getAllBooks();
  return res.status(200).json({ books });
});

app.get("/books/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let book = getBookById(id);
  return res.status(200).json({ book });
});

module.exports = { app };
