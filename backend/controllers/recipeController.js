const Recipe = require("../models/Recipe");

// Obtener todas las recetas
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una receta por ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("comments.user", "name").populate("ratings.user", "name");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva receta
exports.createRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, image, nutrition, category, time, difficulty } = req.body;

  const recipe = new Recipe({
    title,
    description,
    ingredients,
    instructions,
    image,
    nutrition,
    category,
    time,
    difficulty,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar una receta
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una receta
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Agregar un comentario a una receta
exports.addComment = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const comment = { user: userId, text };
    recipe.comments.push(comment);
    await recipe.save();

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Agregar una valoración a una receta
exports.addRating = async (req, res) => {
  const { value } = req.body;
  const userId = req.user._id;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingRating = recipe.ratings.find(rating => rating.user.toString() === userId.toString());
    if (existingRating) {
      existingRating.value = value;
    } else {
      const rating = { user: userId, value };
      recipe.ratings.push(rating);
    }

    await recipe.save();

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};