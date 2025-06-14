const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (tokenId) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        console.error("Token verification error:", error.message);
        throw new Error("Invalid Google token");
    }
};

module.exports = verifyGoogleToken;
