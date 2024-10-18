// client/src/components/NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Para navegación
import "../stylesheets/NavBar.css"; // Asegúrate de tener un archivo CSS para estilizar tu navbar

const NavBar = ({ isAuthenticated, userName, handleLogout }) => {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1><Link to="/">Recetas Saludables</Link></h1> {/* Logo o nombre del sitio que redirige al home */}
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <p>Bienvenido, {userName}!</p>
            <button onClick={handleLogout} className="nav-button">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <button onClick={navigateToRegister} className="nav-button">Registrarse</button>
            <button onClick={navigateToLogin} className="nav-button">Iniciar Sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
