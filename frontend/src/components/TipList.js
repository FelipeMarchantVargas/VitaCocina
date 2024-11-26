import axios from "axios";
import React, { useEffect, useState } from "react";
import "../stylesheets/TipList.css";
import NavBar from "./NavBar";

const TipList = () => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState({ title: "", content: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [favoriteTips, setFavoriteTips] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
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

    const fetchTips = async () => {
      try {
        const res = await axios.get("/api/tips");
        setTips(res.data);
      } catch (err) {
        console.error("Error fetching tips:", err);
      }
    };

    const fetchFavoriteTips = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("/api/users/favorites/tips", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteTips(res.data.map(tip => tip._id) || []);
      } catch (err) {
        console.error("Error fetching favorite tips:", err);
      }
    };

    checkAuth();
    fetchTips();
    fetchFavoriteTips();
  }, [isAuthenticated]);

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
      console.error("Error adding tip:", err);
      alert("Error al agregar el tip");
    }
  };

  const handleFavorite = async (e, tipId) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("authToken");
      if (favoriteTips.includes(tipId)) {
        await axios.delete(`/api/users/favorites/tips/${tipId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteTips(favoriteTips.filter((id) => id !== tipId));
      } else {
        await axios.post(`/api/users/favorites/tips/${tipId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteTips([...favoriteTips, tipId]);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} userName={userName} />
      <h1>Consejos Culinarios</h1>
      <div className="tip-list">
        {tips.map((tip) => (
          <div key={tip._id} className="tip-card">
            <h1>{tip.title}</h1>
            <p>{tip.content}</p>
            <button onClick={(e) => handleFavorite(e, tip._id)}>
              {favoriteTips.includes(tip._id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
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