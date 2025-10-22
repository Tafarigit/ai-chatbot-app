const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const chatbotRoutes = require("./routes/chatbot");
const interviewCoachRoutes = require("./routes/interviewCoachRoutes")

app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/interview", interviewCoachRoutes)

app.get("/api/test", (req, res) => res.json({ ok: true }));

module.exports = app;
