// client/src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Login from "./components/Login";
import RecipeDetail from "./components/RecipeDetail";
import RecipeList from "./components/RecipeList";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
