const express = require("express");
const router = express.Router();

// POST /api/auth/logout
router.post("/logout", (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            domain: process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost'
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
});

module.exports = router;