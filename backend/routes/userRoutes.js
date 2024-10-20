// server/routes/userRoutes.js
const express = require("express");
const { getUserByName } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:name", protect, getUserByName);

module.exports = router;