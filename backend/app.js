// // backend/app.js
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// const usersRoutes = require("./routes/users");
// const messagesRoutes = require("./routes/messages");
// const authRoutes = require("./routes/auth");
// const chatbotRoutes = require("./routes/chatbot");

// // Mount routes
// app.use("/api/users", usersRoutes);
// app.use("/api/messages", messagesRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/chatbot", chatbotRoutes);

// // Test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is reachable!" });
// });

// module.exports = app;

// backend/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const chatbotRoutes = require("./routes/chatbot");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is reachable!" });
});

module.exports = app;
