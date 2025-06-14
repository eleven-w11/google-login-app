// googleRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/NewUser");
const verifyGoogleToken = require("../middleware/verifyGoogleToken");

const router = express.Router();

router.post("/google", async (req, res) => {
    try {
        const { tokenId } = req.body;

        if (!tokenId) {
            return res.status(400).json({ success: false, message: "Missing Google token" });
        }

        const payload = await verifyGoogleToken(tokenId);
        const { email, name, picture, sub: googleId } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                name,
                email,
                password: "GOOGLE_OAUTH",
                image: picture,
                googleId,
            });
            await user.save();
        }

        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'lax',
            maxAge: 3600000,
        });

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Google Auth Error:", error.message);
        res.status(500).json({ success: false, message: "Google authentication failed", error: error.message });
    }
});

// ✅ NEW: /me route to get user info from cookie token


module.exports = router;
