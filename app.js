const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config;

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
const main = async () => {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
};

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}!`);
});
