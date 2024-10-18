import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div>
      <h1>Recetas Saludables</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <img src={recipe.image} alt={recipe.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;