// client/src/components/Register.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  
  const navigate = useNavigate();

  const { name, email, password, isAdmin } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
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
      <div>
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={isAdmin}
            onChange={handleChange}
          />
          Administrador
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
