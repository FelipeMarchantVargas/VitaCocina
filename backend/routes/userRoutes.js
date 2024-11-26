// backend/routes/userRoutes.js
const express = require("express");
const { getUserByName, updateUser, deleteUser, getAllUsers, addFavorite, removeFavorite, getFavorites, addFavoriteTip, removeFavoriteTip } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/favorites", protect, getFavorites);
router.get("/:name", protect, getUserByName);
router.put("/:name", protect, updateUser);
router.delete("/:name", protect, deleteUser);
router.post("/favorites/:recipeId", protect, addFavorite);
router.delete("/favorites/:recipeId", protect, removeFavorite);
router.post('/favorites/tips/:tipId', protect, addFavoriteTip);
router.delete('/favorites/tips/:tipId', protect, removeFavoriteTip);

module.exports = router;