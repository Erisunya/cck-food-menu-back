const express = require("express");
const MongoClient = require("mongodb").MongoClient;
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

// Returns a JSON object containing the names of all the collections in the database
app.get("/places", async (req, res) => {
  let collectionArray = await client
    .db("Places")
    .listCollections({}, { nameOnly: true })
    .toArray();

  let placeArray = [];
  for (place of collectionArray) {
    placeArray.push(place.name);
  }
  placeArray.sort();
  res.send({ places: placeArray }).status(200);
});

module.exports = app;
