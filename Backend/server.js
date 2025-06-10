// Backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Optional route (future use for posting data)
app.post("/api/user", (req, res) => {
    const user = req.body;
    console.log("Received user:", user);
    res.status(200).json({ message: "User received on server", user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
