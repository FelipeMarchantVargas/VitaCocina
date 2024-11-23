// server/controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Recipe = require("../models/recipes");

exports.getUserByName = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ name: req.params.name });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (!user.favorites.includes(recipe._id)) {
      user.favorites.push(recipe._id);
      await user.save();
    }

    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== recipe._id.toString()
    );
    await user.save();

    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    if (!user.favorites) {
      return res.status(200).json([]);
    }
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};