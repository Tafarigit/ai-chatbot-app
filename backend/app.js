// backend/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const usersRoutes = require("./routes/users");
// Add other route imports here (e.g., messagesRoutes)
const messagesRoutes = require("./routes/messages");

// Mount routes

app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes); 

// Test route
app.get("/", (req, res) => {
  res.send("AI Chatbot backend is running!");
});

module.exports = app;  // Export app for server.js
