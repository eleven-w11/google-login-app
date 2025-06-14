const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyGoogleToken");
const User = require("../models/NewUser");

router.get("/me", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "No token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Profile fetch error:", error.message);
        res.status(500).json({ success: false, message: "Invalid or expired token", error: error.message });
    }
});

module.exports = router;