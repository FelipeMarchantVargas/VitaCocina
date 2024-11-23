// frontend/src/components/TipList.js
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../stylesheets/TipList.css";
import NavBar from "./NavBar"; // Importamos el NavBar

const TipList = () => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState({ title: "", content: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("/api/tips");
        setTips(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const checkAdmin = () => {
      const admin = localStorage.getItem("isAdmin") === "true";
      setIsAdmin(admin);
    };

    fetchTips();
    checkAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTip((prevTip) => ({
      ...prevTip,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post("/api/tips", newTip, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTips([...tips, res.data]);
      setNewTip({ title: "", content: "" });
      alert("Tip agregado exitosamente!");
    } catch (err) {
      console.error(err);
      alert("Error al agregar el tip");
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Consejos Culinarios</h1>
      <div className="tip-list">
        {tips.map((tip) => (
          <div key={tip._id} className="tip-card">
            <h1>{tip.title}</h1>
            <p>{tip.content}</p>
          </div>
        ))}
      </div>
      {isAdmin && (
        <form onSubmit={handleSubmit} className="add-tip-form">
          <h2>Agregar Nuevo Tip</h2>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={newTip.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contenido:
            <textarea
              name="content"
              value={newTip.content}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Agregar Tip</button>
        </form>
      )}
    </div>
  );
};

export default TipList;