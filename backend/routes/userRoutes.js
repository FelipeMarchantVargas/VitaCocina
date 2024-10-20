// server/routes/userRoutes.js
const express = require("express");
const { getUserByName, updateUser, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:name", protect, getUserByName);
router.put("/:name", protect, updateUser);
router.delete("/:name", protect, deleteUser);

module.exports = router;