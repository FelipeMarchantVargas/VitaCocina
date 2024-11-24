import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "../stylesheets/AddRecipe.css";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
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
    tips: [""],
  });
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userName");
      if (token && user) {
        setIsAuthenticated(true);
        setUserName(user);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token al cerrar sesión
    localStorage.removeItem("userName"); // Elimina el nombre del usuario
    setIsAuthenticated(false); // Actualiza el estado
    setUserName(""); // Limpia el nombre del usuario
    alert("Has cerrado sesión");
    navigate("/login");
  };


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
  
  const addTip = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      tips: [...prevData.tips, ""],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post("/api/recipes", recipeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        tips: [""],
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Error adding recipe");
    }
  };

  return (
    <>
    <NavBar
      isAuthenticated={isAuthenticated}
      userName={userName}
      handleLogout={handleLogout}
    />
    <form onSubmit={handleSubmit}>
      <h2>Agregar receta</h2>

      <label>
        Nombre:
        <input
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Descripción:
        <input
        id="description"
          type="text"
          name="description"
          value={recipeData.description}
          onChange={handleChange}
          required
        />
      </label>

      <h3>Ingredientes</h3>
      {recipeData.ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          name={`ingredient${index}`}
          value={ingredient}
          onChange={(e) => handleArrayChange(e, index, "ingredients")}
          required
        />
      ))}
      <button type="button" name="boton1" onClick={addIngredient}>
        Agregar ingrediente
      </button>

      <h3>Instrucciones</h3>
      {recipeData.instructions.map((instruction, index) => (
        <input
          key={index}
          type="text"
          name={`instructions${index}`}
          value={instruction}
          onChange={(e) => handleArrayChange(e, index, "instructions")}
          required
        />
      ))}
      <button type="button" name="boton2" onClick={addInstruction}>
        Agregar instrucción
      </button>

      <label>
        URL Imágen:
        <input
          type="text"
          name="image"
          value={recipeData.image}
          onChange={handleChange}
        />
      </label>

      <h3>Información nutricional</h3>
      <label>
        Calorías:
        <input
          type="number"
          name="calories"
          value={recipeData.nutrition.calories}
          onChange={handleNutritionChange}
        />
      </label>
      <label>
        Proteína (g):
        <input
          type="number"
          name="protein"
          value={recipeData.nutrition.protein}
          onChange={handleNutritionChange}
        />
      </label>
      <label>
        Lípidos (g):
        <input
          type="number"
          name="fat"
          value={recipeData.nutrition.fat}
          onChange={handleNutritionChange}
        />
      </label>
      <label>
        Carbohidratos (g):
        <input
          type="number"
          name="carbs"
          value={recipeData.nutrition.carbs}
          onChange={handleNutritionChange}
        />
      </label>

      <label>
        Categoría:
        <input
          type="text"
          name="category"
          value={recipeData.category}
          onChange={handleChange}
        />
      </label>

      <label>
        Tiempo (en minutos):
        <input
          type="number"
          name="time"
          value={recipeData.time}
          onChange={handleChange}
        />
      </label>

      <label>
        Dificultad:
        <input
          type="text"
          name="difficulty"
          value={recipeData.difficulty}
          onChange={handleChange}
        />
      </label>

      <h3>Consejos</h3>
      {recipeData.tips.map((tip, index) => (
        <input
          key={index}
          type="text"
          name={`tips${index}`}
          value={tip}
          onChange={(e) => handleArrayChange(e, index, "tips")}
          required
        />
      ))}
      <button type="button" name="boton3" onClick={addTip}>
        Agregar consejo
      </button>

      <button type="submit" name="aceptar">Agregar receta</button>
    </form>
    </>
  );
};

export default AddRecipe;