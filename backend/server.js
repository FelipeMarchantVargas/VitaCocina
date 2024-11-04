// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/userRoutes");
const tipRoutes = require("./routes/tipRoutes");

dotenv.config();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/tips", tipsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
