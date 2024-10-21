import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/RecipeDetail.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    nutrition: { calories: "", protein: "", fat: "", carbs: "" },
    category: "",
    time: "",
    difficulty: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = localStorage.getItem("authToken");
      await axios.put(`/api/recipes/${id}`, recipe, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      alert("Receta actualizada con éxito");
      navigate(`/recipes/${id}`); // Redirige de nuevo al detalle de la receta
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la receta");
    }
  };

  return (
    <div className="recipe-detail">
      <h1>Editar Receta</h1>
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
            value={recipe.ingredients.join(", ")}
            onChange={(e) =>
              setRecipe({ ...recipe, ingredients: e.target.value.split(",") })
            }
            required
          />
        </label>
        <label>
          Instrucciones:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Calorías:
          <input
            type="number"
            name="calories"
            value={recipe.nutrition.calories}
            onChange={(e) =>
              setRecipe({
                ...recipe,
                nutrition: { ...recipe.nutrition, calories: e.target.value },
              })
            }
            required
          />
        </label>
        <label>
          Categoría:
          <input
            type="text"
            name="category"
            value={recipe.category}
            onChange={handleChange}
            required
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
            <option value="Fácil">Fácil</option>
            <option value="Intermedia">Intermedia</option>
            <option value="Difícil">Difícil</option>
          </select>
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditRecipe;
