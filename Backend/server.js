require("dotenv").config({ path: __dirname + '/.env' });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const googleRoutes = require("./routes/GoogleRoutes");
const userProfileRoutes = require('./routes/UserProRoutes');
const logoutRoutes = require('./routes/LogOutRoutes');

// Then mount them properly (after this line: app.use("/api/auth", googleRoutes);)
const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'] // Important for cookies
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));

console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ Route setup
app.use("/api/auth", googleRoutes);
app.use("/api/auth", userProfileRoutes);
app.use("/api/auth", logoutRoutes);


app.get("/api/test", (req, res) => {
    res.json({ message: "Test route working" });
});

app.get("/", (req, res) => {
    res.send("🚀 Google Login Server is running!");
});



// ✅ Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
});