import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RecipeDetail.css"; // Reutilizamos el mismo archivo de estilos

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
    nutrition: { calories: "", protein: "", fat: "", carbs: "" },
    category: "",
    time: "",
    difficulty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutrition: {
        ...prevRecipe.nutrition,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const formattedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((ing) => ing.trim()),
        instructions: recipe.instructions
          .split("\n")
          .map((inst) => inst.trim()),
      };
      await axios.post("/api/recipes", formattedRecipe, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Receta creada exitosamente");
      navigate("/"); // Redirige a la lista de recetas después de crear
    } catch (err) {
      console.error(err);
      alert("Error al crear la receta");
    }
  };

  return (
    <div className="recipe-detail">
      <h1>Crear Nueva Receta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Ingredientes (separados por comas):
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Instrucciones (cada paso en una nueva línea):
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          URL de la imagen:
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
          />
        </label>
        <h3>Valores Nutricionales</h3>
        <label>
          Calorías:
          <input
            type="number"
            name="calories"
            value={recipe.nutrition.calories}
            onChange={handleNutritionChange}
          />
        </label>
        <label>
          Proteína (g):
          <input
            type="number"
            name="protein"
            value={recipe.nutrition.protein}
            onChange={handleNutritionChange}
          />
        </label>
        <label>
          Grasa (g):
          <input
            type="number"
            name="fat"
            value={recipe.nutrition.fat}
            onChange={handleNutritionChange}
          />
        </label>
        <label>
          Carbohidratos (g):
          <input
            type="number"
            name="carbs"
            value={recipe.nutrition.carbs}
            onChange={handleNutritionChange}
          />
        </label>
        <label>
          Categoría:
          <input
            type="text"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Tiempo de preparación (minutos):
          <input
            type="number"
            name="time"
            value={recipe.time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dificultad:
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            required>
            <option value="">Selecciona una dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Intermedia">Intermedia</option>
            <option value="Difícil">Difícil</option>
          </select>
        </label>
        <button type="submit">Crear Receta</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
