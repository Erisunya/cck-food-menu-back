const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StallSchema = new Schema({
  stall: String,
  images: [String],
  halal: String,
});

module.exports = mongoose.model("Stall", StallSchema);
