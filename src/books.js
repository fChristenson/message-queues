const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/v1/books/:id", async (req, res) => {
  res.json({ id: "1", name: "Amazing book" });
});

app.listen(3001, () => {
  console.log("books");
  console.log("--------------------------");
});
