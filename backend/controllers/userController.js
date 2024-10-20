// server/controllers/userController.js
const User = require("../models/user");

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