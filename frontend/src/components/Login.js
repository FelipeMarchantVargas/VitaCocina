// client/src/components/Login.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../stylesheets/Register.css"; // Importa los estilos que tengas

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate(); // Hook de React Router para navegar entre rutas

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      const token = res.data.token;
      // localStorage.setItem("authToken", token); // Guarda el token en el localStorage
      localStorage.setItem("userName", res.data.name); // Guarda el nombre del usuario en el localStorage

      alert(res.data.message); // Opcional: mensaje de éxito
      console.log(res)
      navigate("/"); // Redirige al usuario a la página Home
    } catch (error) {
      console.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
