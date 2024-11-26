// frontend/src/components/NavBar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setUserName("");
    setIsAdmin(false);
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

  const navigateToTips = () => {
    navigate("/tips");
  };

  const navigateToCart = () => {
    navigate("/cart");
  };
  const navigateToFavorites = () => {
    navigate("/favorites");
  };
  
//   return (
//     <nav className="navbar">
//       <h1>
//         <button onClick={() => navigate("/")} className="nav-button home-button">
//           VitaCocina
//         </button>
//       </h1>
//       <div className="navbar-links-left">
//         {isAuthenticated ? (
//           <>
//               {isAdmin && (
//                 <button onClick={navigateToAdmin} className="nav-button">
//                   Admin Menu
//                 </button>
//               )}
//               <button onClick={navigateToFavorites} className="nav-button">
//                 Favoritos
//               </button>
//               <button onClick={navigateToTips} className="nav-button">
//                 Tips
//               </button>
//               <button onClick={navigateToCart} className="nav-button">
//                 Carrito
//               </button>
//               {/* <p>Bienvenido, {isAdmin ? "admin " : ""}{userName}!</p> */}
//             </>
//           ) : (
//             <>
//             </>
//           )}
//       </div>
//       <div className="navbar-links">
//           {isAuthenticated ? (
//           <>
//             <>
//               <button onClick={navigateToProfile} className="nav-button">
//                 Perfil
//               </button>
//               <button onClick={handleLogout} className="nav-button">
//                 Cerrar Sesión
//               </button>
//             </>
//           </>
//         ) : (
//           <>
//             <button onClick={navigateToRegister} className="nav-button">
//               Registrarse
//             </button>
//             <button onClick={navigateToLogin} className="nav-button">
//               Iniciar Sesión
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };
return (
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <h1>
        <button
          onClick={() => navigate("/")}
          className="nav-button home-button"
        >
          VitaCocina
        </button>
      </h1>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto navbar-links-left">
          {isAuthenticated && (
            <>
              {isAdmin && (
                <li className="nav-item">
                  <button
                    onClick={navigateToAdmin}
                    className="btn nav-link nav-button"
                  >
                    Admin Menu
                  </button>
                </li>
              )}
              <li className="nav-item">
                <button
                  onClick={navigateToFavorites}
                  className="btn nav-link nav-button"
                >
                  Favoritos
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={navigateToTips}
                  className="btn nav-link nav-button"
                >
                  Tips
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={navigateToCart}
                  className="btn nav-link nav-button"
                >
                  Carrito
                </button>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ms-auto navbar-links">
          {isAuthenticated ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle nav-button"
                href="/"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userName}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <button
                    onClick={navigateToProfile}
                    className="dropdown-item"
                  >
                    Ver Perfil
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <button
                  onClick={navigateToRegister}
                  className="btn nav-link nav-button"
                >
                  Registrarse
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={navigateToLogin}
                  className="btn nav-link nav-button"
                >
                  Iniciar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);
};

export default NavBar;
