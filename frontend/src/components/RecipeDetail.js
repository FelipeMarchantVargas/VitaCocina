import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/RecipeDetail.css";
import NavBar from "./NavBar"; // Importamos el NavBar

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // const fetchRecipe = async () => {
  //   try {
  //     const res = await axios.get(`/api/recipes/${id}`);
  //     setRecipe(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   const checkAuth = () => {
  //     const token = localStorage.getItem("authToken");
  //     // const token = localStorage.getItem("authToken") || true;
  //     const user = localStorage.getItem("userName");
  //     if (token && user) {
  //       setIsAuthenticated(true);
  //       setUserName(user);
  //     }
  //   };

  //   fetchRecipe();
  //   checkAuth();
  // }, [id]);

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     // const token = localStorage.getItem("authToken") || true;
  //     // setUserName(localStorage.getItem("userName"));
  //     await axios.post(
  //       `/api/recipes/${id}/comments`,
  //       {
  //         text: comment,
  //         user: userName
  //        },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setComment("");
  //     fetchRecipe();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleRatingSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     await axios.post(
  //       `/api/recipes/${id}/ratings`,
  //       { value: rating },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setRating(0);
  //     fetchRecipe();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken"); // Elimina el token al cerrar sesión
  //   localStorage.removeItem("userName"); // Elimina el nombre del usuario
  //   setIsAuthenticated(false); // Actualiza el estado
  //   setUserName(""); // Limpia el nombre del usuario
  //   alert("Has cerrado sesión");
  // };

  // const handleEdit = () => {
  //   navigate(`/recipes/edit/${id}`); // Redirige a una página de edición
  // };
  // const handleDelete = async () => {
  //   const confirmed = window.confirm(
  //     "¿Estás seguro de que deseas eliminar esta receta?"
  //   );
  //   if (confirmed) {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       await axios.delete(`/api/recipes/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       alert("Receta eliminada exitosamente");
  //       navigate("/");
  //     } catch (err) {
  //       console.error(err);
  //       alert("Error al eliminar la receta");
  //     }
  //   }
  // };
  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userName");
      if (token && user) {
        setIsAuthenticated(true);
        setUserName(user);
      }
    };

    fetchRecipe();
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `/api/recipes/${id}/comments`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment("");
      fetchRecipe();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `/api/recipes/${id}/ratings`,
        { value: rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRating(0);
      fetchRecipe();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token al cerrar sesión
    localStorage.removeItem("userName"); // Elimina el nombre del usuario
    setIsAuthenticated(false); // Actualiza el estado
    setUserName(""); // Limpia el nombre del usuario
    alert("Has cerrado sesión");
  };

  const handleEdit = () => {
    navigate(`/recipes/edit/${id}`); // Redirige a una página de edición
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta receta?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Receta eliminada exitosamente");
        console.log("Receta eliminada exitosamente");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error al eliminar la receta");
      }
    }
  };

  if (!recipe) return <div>Loading...</div>;

  const getValueOrDefault = (value) =>
    value !== undefined ? value : "No hay información disponible";

  return (
    <div>
      <NavBar
        isAuthenticated={isAuthenticated}
        userName={userName}
        handleLogout={handleLogout}
      />
      <div className="recipe-detail">
        <h1>{getValueOrDefault(recipe.title)}</h1>
        <img
          src={getValueOrDefault(recipe.image)}
          alt={getValueOrDefault(recipe.title)}
        />
        <p>{getValueOrDefault(recipe.description)}</p>
        <h2>Ingredientes</h2>
        <ul>
          {(recipe.ingredients || []).map((ingredient, index) => (
            <li key={index}>{getValueOrDefault(ingredient)}</li>
          ))}
        </ul>
        <h2>Instrucciones</h2>
        <ol>
          {(recipe.instructions || []).map((instruction, index) => (
            <li key={index}>{getValueOrDefault(instruction)}</li>
          ))}
        </ol>
        <h2>Valores Nutricionales</h2>
        <p>Calorias: {getValueOrDefault(recipe.nutrition?.calories)}</p>
        <p>Proteina: {getValueOrDefault(recipe.nutrition?.protein)}</p>
        <p>Grasa: {getValueOrDefault(recipe.nutrition?.fat)}</p>
        <p>Carbohidratos: {getValueOrDefault(recipe.nutrition?.carbs)}</p>
        <h2>Información Adicional</h2>
        <p>Categoria: {getValueOrDefault(recipe.category)}</p>
        <p>Tiempo de preparación: {getValueOrDefault(recipe.time)} minutes</p>
        <p>Dificultad: {getValueOrDefault(recipe.difficulty)}</p>
        <h2>Consejos</h2>
        <ol>
          {(recipe.tips || []).map((tip, index) => (
            <li key={index}>{getValueOrDefault(tip)}</li>
          ))}
        </ol>

        <h2>Comentarios</h2>
        <ul>
          {(recipe.comments || []).map((comment, index) => (
            <li key={index}>
              {comment.user.name}: {comment.text}
            </li>
          ))}
        </ul>
        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe un comentario"
              required
            />
            <button type="submit">Enviar Comentario</button>
          </form>
        )}

        <h2>Valoraciones</h2>
        <ul>
          {(recipe.ratings || []).map((rating, index) => (
            <li key={index}>
              {rating.user.name}: {rating.value} estrellas
            </li>
          ))}
        </ul>
        {isAuthenticated && (
          <form onSubmit={handleRatingSubmit}>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required>
              <option value="">Selecciona una valoración</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} estrellas
                </option>
              ))}
            </select>
            <button type="submit">Enviar Valoración</button>
          </form>
        )}
      </div>
      {isAuthenticated && (
        <div className="update-delete">
          <button onClick={handleEdit}>Editar Receta</button>
          <button onClick={handleDelete}>Eliminar Receta</button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
