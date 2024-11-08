// frontend/src/components/NavBar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/NavBar.css";

const NavBar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("userName");
    const admin = localStorage.getItem("isAdmin") === "true";
    if (token && user) {
      setIsAuthenticated(true);
      setUserName(user);
      setIsAdmin(admin);
    }
  }, []);

  const navigateToMenu = () => {
    navigate("/");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToProfile = () => {
    navigate("/user");
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <nav className="navbar">
      <h1>
        <button onClick={navigateToMenu} className="nav-menu-button">
          VitaCocina
        </button>
      </h1>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <p>Bienvenido, {isAdmin ? "admin " : ""}{userName}!</p>
            {isAdmin && (
              <button onClick={navigateToAdmin} className="nav-button">
                Admin Dashboard
              </button>
            )}
            <button onClick={navigateToProfile} className="nav-button">
              Perfil
            </button>
            <button onClick={handleLogout} className="nav-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button onClick={navigateToRegister} className="nav-button">
              Registrarse
            </button>
            <button onClick={navigateToLogin} className="nav-button">
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
