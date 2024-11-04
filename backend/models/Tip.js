// backend/models/Tip.js
const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;