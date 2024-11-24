import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RecipeList.css";
import NavBar from "./NavBar"; // Importamos el NavBar

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [fat, setFat] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [noResults, setNoResults] = useState(false); // Estado para manejar el mensaje de "no se encontraron recetas"
  const Navigator = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userName");
      if (token && user) {
        setIsAuthenticated(true);
        setUserName(user);
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

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("/api/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.map(favorite => favorite._id));
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
    fetchRecipes();
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName("");
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
      title: { $regex: searchQuery, $options: "i" },
      ...(calories && { "nutrition.calories": { $lte: parseInt(calories) } }), // Filtra por calorías
      ...(proteins && { "nutrition.protein": { $gte: parseInt(proteins) } }), // Filtra por proteínas
      ...(fat && { "nutrition.fat": { $lte: parseInt(fat) } }), // Filtra por grasa
      ...(carbohydrates && { "nutrition.carbs": { $lte: parseInt(carbohydrates) } }) // Filtra por carbohidratos
    };
  
    try {
      const res = await axios.get(`/api/recipes/filter/${encodeURIComponent(JSON.stringify(query))}`);
      setRecipes(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching filtered recipes:", err);
    }
  };

  const handleFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (favorites.includes(recipeId)) {
        await axios.delete(`/api/users/favorites/${recipeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favorites.filter((id) => id !== recipeId));
      } else {
        await axios.post(`/api/users/favorites/${recipeId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites([...favorites, recipeId]);
      }
    } catch (err) {
      console.error(err);
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
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Máx Calorías"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Mín Proteínas"
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Máx Grasa"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Máx Carbohidratos"
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} name="buscar" className="search-button">Buscar</button>
      </div>

      {isAuthenticated && (
        <div className="center-button">
          <button onClick={handleAddRecipeClick} className="add-recipe-button">
            Agregar Receta
          </button>
        </div>
      )}

      <div className="recipe-list">
      {noResults ? (
        <>
        <div/>
        <div>
          <h1 className="centered-message">No se encontraron recetas según los filtros aplicados.</h1>
        </div>
        </>
        ) : (
        recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="recipe-card"
            id = {recipe.title}
            onClick={() => handleRecipeClick(recipe._id)}
          >
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.description}</p>
            <p>Calorías: {recipe.nutrition.calories}</p>
            <p>Proteínas: {recipe.nutrition.protein}</p>
            <p>Grasa: {recipe.nutrition.fat}</p>
            <p>Carbohidratos: {recipe.nutrition.carbs}</p>
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
            {isAuthenticated && (
              <button onClick={() => handleFavorite(recipe._id)}>
                {favorites.includes(recipe._id) ? "Quitar de favoritos" : "Agregar a favoritos"}
              </button>
            )}
          </div>
        ))
      )}  
      </div>
    </div>
  );
};

export default RecipeList;
