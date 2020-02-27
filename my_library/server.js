const express = require("express");
const mongodbBooks = require("./mongodb_books");
const app = express(),
  PORT = 8080;
app.use(express.json());


app.patch("/books/:id", (req, res) => {
  mongodbBooks.handleUpdate(req, res);
});


app.delete("/books/:id", (req, res) => {
    mongodbBooks.handleDelete(req, res);
  });
  

app.get("/books", (req, res) => {
  mongodbBooks.handleGet(req, res);
});

app.post("/books", (req, res) => {
  mongodbBooks.handlePost(req, res);
});

app.listen(PORT, () => {
  console.log(`app is listeming on port : ${PORT}`);
});
