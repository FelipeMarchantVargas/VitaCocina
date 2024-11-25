import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
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
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchRecipe = useCallback(async () => {
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

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

    fetchRecipe();
    checkAuth();
  }, [id, fetchRecipe]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token al cerrar sesión
    localStorage.removeItem("userName"); // Elimina el nombre del usuario
    localStorage.removeItem("isAdmin"); // Elimina el estado de administrador
    setIsAuthenticated(false); // Actualiza el estado
    setUserName(""); // Limpia el nombre del usuario
    setIsAdmin(false); // Limpia el estado de administrador
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

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este comentario?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/recipes/${id}/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Comentario eliminado exitosamente");
        fetchRecipe();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar el comentario");
      }
    }
  };

  const handleDeleteRating = async (ratingId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta valoración?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/api/recipes/${id}/ratings/${ratingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Valoración eliminada exitosamente");
        fetchRecipe();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar la valoración");
      }
    }
  };

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
          {console.log(recipe)}
          {(recipe.comments || [])
            .filter((comment) => comment?.user?.name)
            .map((comment, index) => (
              <li key={index} id={`comment${index}`} className="comment-item">
                <span>{`${comment.user.name}: ${comment.text}`}</span>
                {isAdmin && (
                  <button
                    className="right-align-button"
                    onClick={() => handleDeleteComment(comment._id)}
                    name={`borrarComment${index}`}>
                    Eliminar
                  </button>
                )}
              </li>
            ))}
        </ul>
        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              placeholder="Escribe un comentario"
              required
            />
            <button type="submit" name="botonComment">
              Enviar Comentario
            </button>
          </form>
        )}

        <h2>Valoraciones</h2>
        <ul>
          {(recipe.ratings || [])
            .filter((rating) => rating?.user?.name)
            .map((rating, index) => (
              <li key={index} id={`rating${index}`} className="rating-item">
                <span>{`${rating.user.name}: ${rating.value} estrellas`}</span>
                {isAdmin && (
                  <button
                    className="right-align-button"
                    onClick={() => handleDeleteRating(rating._id)}
                    name={`borrarRating${index}`}>
                    Eliminar
                  </button>
                )}
              </li>
            ))}
        </ul>
        {isAuthenticated && (
          <form onSubmit={handleRatingSubmit}>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              name="rating"
              required>
              <option value="">Selecciona una valoración</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} estrellas
                </option>
              ))}
            </select>
            <button type="submit" name="botonRating">
              Enviar Valoración
            </button>
          </form>
        )}

        {isAuthenticated && isAdmin && (
          <div className="update-delete">
            <button onClick={handleEdit}>Editar Receta</button>
            <button onClick={handleDelete} name="botonDelete">
              Eliminar Receta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
