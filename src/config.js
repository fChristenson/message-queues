module.exports = {
  usersApiUrl: process.env.USERS_API_URL || "http://localhost:3000",
  booksApiUrl: process.env.BOOKS_API_URL || "http://localhost:3001",
  kafkaHost: process.env.KAFKA_SERVER || "localhost:9092"
};
