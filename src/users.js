const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/v1/users/:id", async (req, res) => {
  res.json({ id: "1", name: "foobar" });
});

app.listen(3000, () => {
  console.log("users");
  console.log("--------------------------");
});
