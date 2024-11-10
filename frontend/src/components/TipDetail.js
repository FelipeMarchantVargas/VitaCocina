// frontend/src/components/TipDetail.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/TipDetail.css";
import NavBar from "./NavBar"; // Importamos el NavBar

const TipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  
  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await axios.get(`/api/tips/${id}`);
        setTip(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userName");
      const admin = localStorage.getItem("isAdmin") === "true";
      if (token && user) {
        setIsAuthenticated(true);
        setUserName(user);
        setIsAdmin(admin);
      }
    };

    checkAuth();
    fetchTip();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setUserName("");
    setIsAdmin(false);
    alert("Has cerrado sesión");
    navigate("/login");
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este consejo?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/tips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Consejo eliminado exitosamente");
        navigate("/tips");
      } catch (err) {
        console.error(err);
        alert("Error al eliminar el consejo");
      }
    }
  };

  if (!tip) return <div>Loading...</div>;

  return (
    <div>
      <NavBar
        isAuthenticated={isAuthenticated}
        userName={userName}
        handleLogout={handleLogout}
      />
      <div className="tip-detail">
        <h1>{tip.title}</h1>
        <p>{tip.content}</p>
        {isAdmin && (
          <div className="update-delete">
            <button onClick={handleDelete}>Eliminar Consejo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipDetail;