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

// Actualizar un consejo
exports.updateTip = async (req, res) => {
  try {
    const updatedTip = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTip) {
      return res.status(404).json({ message: "Tip not found" });
    }
    res.json(updatedTip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un consejo
exports.deleteTip = async (req, res) => {
  try {
    const deletedTip = await Tip.findByIdAndDelete(req.params.id);
    if (!deletedTip) {
      return res.status(404).json({ message: "Tip not found" });
    }
    res.json({ message: "Tip deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};