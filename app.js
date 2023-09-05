const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);
const run = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.dir;
  }
};
run();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}!`);
});
