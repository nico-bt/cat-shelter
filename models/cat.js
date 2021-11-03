const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: String,
  age: String,
  image: {type: String, required: true},
  vaccinated: Boolean,
  neutered: Boolean,
  adopted: Boolean,
  admissionDate: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model("Cat", CatSchema)