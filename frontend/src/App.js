// client/src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Register";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
