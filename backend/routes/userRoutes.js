// backend/routes/userRoutes.js
const express = require("express");
const { getUserByName, updateUser, deleteUser, getAllUsers } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/:name", protect, getUserByName);
router.put("/:name", protect, updateUser);
router.delete("/:name", protect, deleteUser);

module.exports = router;