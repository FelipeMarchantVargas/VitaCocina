import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar"; // Import the NavBar component
import "../stylesheets/Cart.css";

const Cart = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userName");
      if (token && user) {
        setIsAuthenticated(true);
        setUserName(user);
      }
    };

    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("/api/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favoriteRecipes = res.data;
        const allIngredients = favoriteRecipes.flatMap(recipe => recipe.ingredients);
        setIngredients(allIngredients);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
    fetchIngredients();
  }, []);

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} userName={userName} />
      <h1>Carrito de Ingredientes</h1>
      <div className="cart">
        {ingredients.length === 0 ? (
          <p>No tienes recetas favoritas</p>
        ) : (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;