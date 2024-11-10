// frontend/src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Login from "./components/Login";
import RecipeDetail from "./components/RecipeDetail";
import RecipeList from "./components/RecipeList";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import TipList from "./components/TipList";
import TipDetail from "./components/TipDetail";
import AdminDashboard from "./components/AdminDashboard";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAuthenticated && isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

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
        <Route path="/tips" element={<TipList />} />
        <Route path="/tips/:id" element={<TipDetail />} />
        <Route path="/admin" element={<PrivateRoute element={AdminDashboard} />} /> {/* Ruta protegida */}
      </Routes>
    </Router>
  );
}

export default App;
