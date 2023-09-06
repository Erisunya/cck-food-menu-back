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

// Returns a JSON object containing the sorted names of all the collections in the database
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

// Returns an unsorted JSON object containing information about the stalls in this format:
// { stallName: stallImages}
app.get("/places/:placename", async (req, res) => {
  let documentArray = await client
    .db("Places")
    .collection(req.params.placename)
    .find({})
    .toArray();

  let stallObj = {};
  for (stallDocument of documentArray) {
    stallObj[stallDocument.stall] = stallDocument.images;
  }
  res.send(stallObj).status(200);
});

// Returns a JSON object containing information about the stall in this format:
// { stall: stallName, images: [stallImages], halal: stallHalalStatus}
app.get("/places/:placename/:stallname", async (req, res) => {
  let document = await client
    .db("Places")
    .collection(req.params.placename)
    .find({ stall: req.params.stallname })
    .toArray();

  res.send(document[0]).status(200);
});

// Returns a JSON object containing information about the requested feedback
app.get("/feedback/:id", async (req, res) => {
  let feedback = await client
    .db("Feedback")
    .collection("Feedback")
    .find({ id: req.params.id })
    .toArray();

  res.send(feedback[0]).status(200);
});

module.exports = app;
