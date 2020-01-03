const express = require("express");
const axios = require("axios");
const config = require("./config");

const app = express();

app.use(express.json());

app.post("/api/v1/orders", async (req, res) => {
  const { bookId, userId } = req.body;
  const userReq = await axios.get(
    `${config.usersApiUrl}/api/v1/users/${userId}`
  );
  const bookReq = await axios.get(
    `${config.booksApiUrl}/api/v1/books/${bookId}`
  );
  res.json({ user: userReq.data, book: bookReq.data });
});

app.listen(3002, () => {
  console.log("orders");
  console.log("--------------------------");
});
