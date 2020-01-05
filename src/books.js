const express = require("express");
const kafka = require("kafka-node");

const app = express();

app.use(express.json());

app.get("/api/v1/books/:id", async (req, res) => {
  res.json({ id: "1", name: "Amazing book" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("books");
  console.log("--------------------------");
});

const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_SERVER || "localhost:9092"
});
const consumer = new kafka.Consumer(client, [
  {
    topic: "orders.orderPlaced"
  }
]);

consumer.on("message", message => {
  console.log(message);
  console.log("--------------------------");
});

consumer.on("error", e => {
  console.log(e);
  console.log("--------------------------");
});
