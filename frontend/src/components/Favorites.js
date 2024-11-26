// frontend/src/components/Favorites.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RecipeList.css";
import NavBar from "./NavBar";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteTips, setFavoriteTips] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
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

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("/api/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favoriteRecipes);
        setFavoriteTips(res.data.favoriteTips);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    checkAuth();
    fetchFavorites();
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} userName={userName} />
      <h1>Recetas Favoritas</h1>
      <div className="recipe-list">
        {favorites.length === 0 ? (
          <p>No tienes recetas favoritas</p>
        ) : (
          favorites.map((recipe) => (
            <div
              key={recipe._id}
              className="recipe-card"
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
            </div>
          ))
        )}
      </div>
      <h1>Tips Favoritos</h1>
      <div className="tip-list">
        {favoriteTips.length === 0 ? (
          <p>No tienes tips favoritos</p>
        ) : (
          favoriteTips.map((tip) => (
            <div key={tip._id} className="tip-card">
              <h1>{tip.title}</h1>
              <p>{tip.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;