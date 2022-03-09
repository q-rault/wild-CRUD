const mongoose = require("mongoose");
const { Schema } = mongoose;

const WilderModel = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

module.exports = mongoose.model("wilder", WilderModel);
