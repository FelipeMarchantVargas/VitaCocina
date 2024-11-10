// backend/routes/tipRoutes.js
const express = require("express");
const {
  getAllTips,
  createTip,
  updateTip,
  deleteTip,
} = require("../controllers/tipController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllTips);
router.post("/", protect, admin, createTip);
router.put("/:id", protect, admin, updateTip);
router.delete("/:id", protect, admin, deleteTip);

module.exports = router;