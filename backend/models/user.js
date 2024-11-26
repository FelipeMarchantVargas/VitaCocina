// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean, 
    default: false,
    required: true 
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
  favoriteTips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tip' }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
