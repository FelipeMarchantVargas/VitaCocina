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

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas de recetas
router.get("/", getAllRecipes);
router.get("/filter/:filter", getFilteredRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.post("/:id/comments", addComment);
router.post("/:id/ratings", addRating);

module.exports = router;