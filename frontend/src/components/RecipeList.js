import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar"; // Importamos el NavBar
import "../stylesheets/RecipeList.css"; 
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si el usuario está autenticado
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario
  const Navigator = useNavigate();

  useEffect(() => {
    // Función para verificar si el usuario está logueado
    const checkAuth = () => {
      const token = localStorage.getItem("authToken"); // Verifica si hay un token guardado
      const user = localStorage.getItem("userName"); // Recupera el nombre del usuario si está almacenado
      if (token && user) {
        setIsAuthenticated(true); // Si hay token, el usuario está autenticado
        setUserName(user); // Guarda el nombre del usuario
      }
    };

    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth(); // Verifica si el usuario está logueado al cargar el componente
    fetchRecipes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token al cerrar sesión
    localStorage.removeItem("userName"); // Elimina el nombre del usuario
    setIsAuthenticated(false); // Actualiza el estado
    setUserName(""); // Limpia el nombre del usuario
    alert("Has cerrado sesión");
  };

  const handleRecipeClick = (id) => {
    Navigator(`/recipes/${id}`);
  };

  // Función para navegar al formulario para agregar una receta
  const handleAddRecipeClick = () => {
    Navigator("/add");
  };

  return (
    <div>
      <NavBar 
        isAuthenticated={isAuthenticated} 
        userName={userName} 
        handleLogout={handleLogout} 
      />

      <h1>Recetas Saludables</h1>

      {isAuthenticated && (
        <div className="center-button">
          <button onClick={handleAddRecipeClick} className="add-recipe-button">
            Agregar Receta
          </button>
        </div>
      )}

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card" onClick={() => handleRecipeClick(recipe._id)}>
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
