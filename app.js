const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
const main = async () => {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
};
main().catch((err) => console.log(err));

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}!`);
});
