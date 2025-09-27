const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const chatbotRoutes = require("./routes/chatbot");


app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);



module.exports = app;
