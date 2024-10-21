// server/controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getUserByName = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.updateUser = async (req, res) => {
  try {
    // Si el cuerpo de la solicitud contiene una contraseña, hashearla antes de la actualización
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10); // Generar un salt con factor de costo 10
      req.body.password = await bcrypt.hash(req.body.password, salt); // Hashear la nueva contraseña
    }

    // Buscar y actualizar el usuario
    const user = await User.findOneAndUpdate(
      { name: req.params.name },
      req.body, // El cuerpo puede contener la contraseña ya hasheada si fue proporcionada
      { new: true, runValidators: true }
    ).select("-password"); // Excluir la contraseña del resultado

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ name: req.params.name });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };