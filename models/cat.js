const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: String,
  age: String,
  vaccinated: Boolean,
  neutered: Boolean,
  adopted: Boolean
});

module.exports = mongoose.model("Cat", CatSchema)