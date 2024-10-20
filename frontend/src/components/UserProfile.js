import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/UserProfile.css"; // Archivo de estilos específico para el perfil
import NavBar from "./NavBar"; // Reutilizando NavBar

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        if (token && userId) {
          setIsAuthenticated(true);
          const res = await axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } else {
          navigate("/login"); // Redirigir al login si no está autenticado
        }
      } catch (err) {
        console.error(err);
        alert("Error al cargar la información del usuario");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Cargando...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      await axios.put(`/api/users/${userId}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Perfil actualizado exitosamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el perfil");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        alert("Cuenta eliminada exitosamente");
        navigate("/"); // Redirige a la página principal
      } catch (err) {
        console.error(err);
        alert("Error al eliminar la cuenta");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (!isAuthenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <NavBar
        isAuthenticated={isAuthenticated}
        userName={user.name}
        handleLogout={handleLogout}
      />
      <div className="profile-container">
        <h1>Perfil de Usuario</h1>
        <form onSubmit={handleUpdate}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Actualizar Perfil</button>
        </form>

        <button className="delete-button" onClick={handleDelete}>
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
