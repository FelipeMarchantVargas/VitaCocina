// backend/controllers/tipController.js
const Tip = require("../models/Tip");

// Obtener todos los consejos
exports.getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo consejo
exports.createTip = async (req, res) => {
  const tip = new Tip(req.body);

  try {
    await tip.save();
    res.status(201).json(tip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};