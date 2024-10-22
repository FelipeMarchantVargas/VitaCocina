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
      // const token = localStorage.getItem("authToken") || true;
      const token = localStorage.getItem("authToken");
      const userName = localStorage.getItem("userName"); // Usar userName en lugar de userId

      if (token && userName) {
        try {
          const res = await axios.get(`/api/users/${userName}`, {
            // headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
          console.log(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.error(err);
          alert("Error al cargar la información del usuario");
          navigate("/login");
        }
      } else {
        alert("Error al cargar la información del usuario, algo falló en el login");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`/api/users/${user.name}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Perfil actualizado con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el perfil");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/api/users/${user.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cuenta eliminada con éxito");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la cuenta");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
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
