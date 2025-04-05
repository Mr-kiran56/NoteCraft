const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoToConnect = require("./db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoToConnect()
  .then(() => console.log("✅ iNotebook Database connected successfully!"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit process if DB connection fails
  });

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow multiple frontend origins
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Default Route (Check Server Status)
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
