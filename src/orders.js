const express = require("express");
const axios = require("axios");
const config = require("./config");
const kafka = require("kafka-node");

const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
});
const producer = new kafka.Producer(client, [
  {
    topic: "orders.orderPlaced"
  }
]);

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
  const order = { user: userReq.data, book: bookReq.data };
  producer.send(
    [{ topic: "orders.orderPlaced", messages: JSON.stringify(order) }],
    () => {
      res.json(order);
    }
  );
});

app.listen(process.env.PORT || 3002, () => {
  console.log("orders");
  console.log("--------------------------");
});

producer.on("ready", () => {
  console.log("ready");
  console.log("--------------------------");
});

producer.on("error", e => {
  console.log(e);
  console.log("--------------------------");
});
