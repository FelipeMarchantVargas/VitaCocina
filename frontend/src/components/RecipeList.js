import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Si usas react-router-dom para la navegación
import '../stylesheets/RecipeList.css'; // Importa el CSS

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const history = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  const navigateToRegister = () => {
    history("/register");
  };

  const navigateToLogin = () => {
    history("/login");
  };

  return (
    <div>
      <h1>Recetas Saludables</h1>
      
      <div className="button-container">
        <button onClick={navigateToRegister}>Registrarse</button>
        <button onClick={navigateToLogin}>Iniciar Sesión</button>
      </div>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.description}</p>
            <ol>
              {(recipe.ingredients || []).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ol>
            <typography>Instrucciones:</typography>
            <ol>
              {(recipe.instructions || []).map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
