import React, { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    nutrition: {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
    category: "",
    time: 0,
    difficulty: "",
    comments: [],
    ratings: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const updatedArray = [...recipeData[arrayName]];
    updatedArray[index] = value;
    setRecipeData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      nutrition: {
        ...prevData.nutrition,
        [name]: value,
      },
    }));
  };

  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, ""],
    }));
  };

  const addInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/recipes", recipeData);
      alert("Recipe added successfully!");
      // Reset form after submission
      setRecipeData({
        title: "",
        description: "",
        ingredients: [""],
        instructions: [""],
        image: "",
        nutrition: {
          calories: 0,
          protein: 0,
          fat: 0,
          carbs: 0,
        },
        category: "",
        time: 0,
        difficulty: "",
        comments: [],
        ratings: [],
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Recipe</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={recipeData.description}
          onChange={handleChange}
          required
        />
      </label>

      <h3>Ingredients</h3>
      {recipeData.ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          value={ingredient}
          onChange={(e) => handleArrayChange(e, index, "ingredients")}
          required
        />
      ))}
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>

      <h3>Instructions</h3>
      {recipeData.instructions.map((instruction, index) => (
        <input
          key={index}
          type="text"
          value={instruction}
          onChange={(e) => handleArrayChange(e, index, "instructions")}
          required
        />
      ))}
      <button type="button" onClick={addInstruction}>
        Add Instruction
      </button>

      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={recipeData.image}
          onChange={handleChange}
        />
      </label>

      <h3>Nutrition Information</h3>
      <label>
        Calories:
        <input
          type="number"
          name="calories"
          value={recipeData.nutrition.calories}
          onChange={handleNutritionChange}
        />
      </label>
      <label>
        Protein (g):
        <input
          type="number"
          name="protein"
          value={recipeData.nutrition.protein}
          onChange={handleNutritionChange}
        />
      </label>
      <label>
        Fat (g):
        <input
          type="number"
          name="fat"
          value={recipeData.nutrition.fat}
          onChange={handleNutritionChange}
        />
      </label>
      <label>
        Carbs (g):
        <input
          type="number"
          name="carbs"
          value={recipeData.nutrition.carbs}
          onChange={handleNutritionChange}
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          name="category"
          value={recipeData.category}
          onChange={handleChange}
        />
      </label>

      <label>
        Time (in minutes):
        <input
          type="number"
          name="time"
          value={recipeData.time}
          onChange={handleChange}
        />
      </label>

      <label>
        Difficulty:
        <input
          type="text"
          name="difficulty"
          value={recipeData.difficulty}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit Recipe</button>
    </form>
  );
};

export default AddRecipe;