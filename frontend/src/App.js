// client/src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditRecipe from "./components/EditRecipe";
import Login from "./components/Login";
import RecipeDetail from "./components/RecipeDetail";
import RecipeList from "./components/RecipeList";
import Register from "./components/Register";
import AddRecipe from "./components/AddRecipe";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
