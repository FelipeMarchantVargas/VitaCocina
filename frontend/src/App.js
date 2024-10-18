// client/src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Register";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
