// backend/routes/index.js
const express = require("express");
const { getAllTips, createTip } = require("../controllers/tipController");

const router = express.Router();

// Rutas de consejos culinarios
router.get("/tips", getAllTips);
router.post("/tips", createTip);

module.exports = router;