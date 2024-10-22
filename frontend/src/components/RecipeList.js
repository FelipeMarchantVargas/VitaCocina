import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RecipeList.css";
import NavBar from "./NavBar"; // Importamos el NavBar

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si el usuario está autenticado
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar el valor de búsqueda
  const Navigator = useNavigate();

  useEffect(() => {
    // Función para verificar si el usuario está logueado
    const checkAuth = () => {
      // const token = localStorage.getItem("authToken") || true;
      let token;
      if (localStorage.getItem("authToken")){
        token = localStorage.getItem("authToken");
      } else {
        token = true;
      } // Verifica si hay un token guardado
      // const token = localStorage.getItem("authToken"); // Verifica si hay un token guardado
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
  
  const handleAddRecipeClick = () => {
    Navigator("/addRecipe");
  };

  const handleSearch = async () => {
    const query = {
      title: { $regex: searchQuery, $options: "i" } // Case-insensitive search
    };
    try {
      const res = await axios.get(`/api/recipes/filter/${encodeURIComponent(JSON.stringify(query))}`);
      setRecipes(res.data); // Actualiza las recetas con los resultados filtrados
    } catch (err) {
      console.error("Error fetching filtered recipes:", err);
    }
  };

  return (
    <div>
      <NavBar
        isAuthenticated={isAuthenticated}
        userName={userName}
        handleLogout={handleLogout}
      />

      <h1>Recetas Saludables</h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Buscar</button>
      </div>


      {isAuthenticated && (
        <div className="center-button">
        <button onClick={handleAddRecipeClick} className="add-recipe-button">
          Agregar Receta
        </button>
        </div>
      )}

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe._id)}>
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
