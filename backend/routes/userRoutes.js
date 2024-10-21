// server/routes/userRoutes.js
const express = require("express");
const { getUserByName, updateUser, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:name", getUserByName);
router.put("/:name", updateUser);
router.delete("/:name", deleteUser);

module.exports = router;