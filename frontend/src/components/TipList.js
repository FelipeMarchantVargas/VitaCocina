// frontend/src/components/TipList.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../stylesheets/TipList.css";
import NavBar from "./NavBar"; // Importamos el NavBar

const TipList = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("/api/tips");
        setTips(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTips();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Consejos Culinarios</h1>
      <div className="tip-list">
        {tips.map((tip) => (
          <div key={tip._id} className="tip-card">
            <h1>{tip.title}</h1>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipList;