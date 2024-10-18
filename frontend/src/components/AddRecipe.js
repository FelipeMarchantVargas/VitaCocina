import React, { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit_measure: "" }]);
  const [nutrition, setNutrition] = useState("");
  const [vegan, setVegan] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [tips, setTips] = useState("");

  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index][event.target.name] = event.target.value;
    setIngredients(values);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit_measure: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = { title, ingredients, nutrition, vegan, instructions, tips };

    try {
      await axios.post("/api/recipes/add", recipe);
      alert("Recipe added successfully!");
    } catch (error) {
      console.error("There was an error adding the recipe!", error);
    }
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
              <input
                type="text"
                name="unit_measure"
                placeholder="Unit Measure"
                value={ingredient.unit_measure}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
              <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        </div>
        <div>
          <label>Nutrition:</label>
          <input
            type="text"
            value={nutrition}
            onChange={(e) => setNutrition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vegan:</label>
          <input
            type="checkbox"
            checked={vegan}
            onChange={(e) => setVegan(e.target.checked)}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tips:</label>
          <textarea
            value={tips}
            onChange={(e) => setTips(e.target.value)}
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;