// frontend/src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../stylesheets/AdminDashboard.css";

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [tips, setTips] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const recipesRes = await axios.get("/api/recipes", { headers: { Authorization: `Bearer ${token}` } });
        console.log("Recipes fetched successfully:", recipesRes.data);
        setRecipes(recipesRes.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }

      try {
        const tipsRes = await axios.get("/api/tips", { headers: { Authorization: `Bearer ${token}` } });
        console.log("Tips fetched successfully:", tipsRes.data);
        setTips(tipsRes.data);
      } catch (err) {
        console.error("Error fetching tips:", err);
      }

      try {
        const usersRes = await axios.get("/api/users", { headers: { Authorization: `Bearer ${token}` } });
        console.log("Users fetched successfully:", usersRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchData();
  }, []);

  const handleEditRecipe = (id) => {
    navigate(`/recipes/edit/${id}`);
  };

  const handleDeleteRecipe = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta receta?");
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/recipes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteTip = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este consejo?");
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/tips/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setTips(tips.filter((tip) => tip._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="admin-dashboard">
        <h1>Panel de Administración</h1>
        <section>
          <h2>Recetas</h2>
          {recipes.length === 0 ? (
            <div className="no-results">No se encontraron recetas.</div>
          ) : (
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe._id}>
                  <div className="column-name">{recipe.title}</div>
                  <div className="column">
                    <button onClick={() => handleEditRecipe(recipe._id)}>Editar</button>
                    <button onClick={() => handleDeleteRecipe(recipe._id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2>Consejos Culinarios</h2>
          {tips.length === 0 ? (
            <div className="no-results">No se encontraron consejos culinarios.</div>
          ) : (
            <ul>
              {tips.map((tip) => (
                <li key={tip._id}>
                  <div className="column-name">{tip.title}</div>
                  <div className="column">
                    <button onClick={() => handleDeleteTip(tip._id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2>Usuarios</h2>
          {users.length === 0 ? (
            <div className="no-results">No se encontraron usuarios.</div>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <div className="column-name">{user.name} ({user.email})</div>
                  <div className="column">
                    <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;