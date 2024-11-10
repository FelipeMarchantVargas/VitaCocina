const express = require("express");
const {
  getAllRecipes,
  getFilteredRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addComment,
  addRating,
} = require("../controllers/recipeController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas de recetas
router.get("/", getAllRecipes);
router.get("/filter/:filter", getFilteredRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, createRecipe);
router.put("/:id", protect, admin, updateRecipe);
router.delete("/:id", protect, admin, deleteRecipe);
router.post("/:id/comments", protect, addComment);
router.post("/:id/ratings", protect, addRating);

module.exports = router;