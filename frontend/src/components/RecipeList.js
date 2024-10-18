import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../stylesheets/RecipeList.css'; 

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si el usuario está autenticado
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario

  const history = useNavigate(); // Hook para la navegación

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

  const navigateToRegister = () => {
    history("/register");
  };

  const navigateToLogin = () => {
    history("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token al cerrar sesión
    localStorage.removeItem("userName"); // Elimina el nombre del usuario
    setIsAuthenticated(false); // Actualiza el estado
    setUserName(""); // Limpia el nombre del usuario
    alert("Has cerrado sesión");
  };

  return (
    <div>
      <h1>Recetas Saludables</h1>
      
      <div className="user-info">
        {isAuthenticated ? (
          <div className="button-container">
            <p>Bienvenido, {userName}!</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <div className="button-container">
            <button onClick={navigateToRegister}>Registrarse</button>
            <button onClick={navigateToLogin}>Iniciar Sesión</button>
          </div>
        )}
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
