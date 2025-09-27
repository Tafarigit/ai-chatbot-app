const express = require("express");
const router = express.Router();
const pool = require("../db/dbConfig");

router.post("/", async (req, res) => {
  const { userMessage, userId } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res
      .status(500)
      .json({ error: "Server misconfigured: missing API key" });
  }

  if (!userMessage || !userId) {
    return res.status(400).json({ error: "userMessage and userId required" });
  }

  try {
    console.log("Received:", { userMessage, userId });

    await pool.query(
      `INSERT INTO messages (user_id, content, is_bot_message) VALUES ($1, $2, $3)`,
      [userId, userMessage, false]
    );

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );
    const geminiData = await geminiResponse.json();

    const botReplyText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    const savedBotMessage = await pool.query(
      `INSERT INTO messages (user_id, content, is_bot_message) VALUES ($1, $2, $3) RETURNING *`,
      [userId, botReplyText, true]
    );

    res.json({ botMessage: savedBotMessage.rows[0] });
  } catch (err) {
    console.error("Error in chatbot route:", err);
    res.status(500).json({ error: "Error processing chatbot message" });
  }
});

module.exports = router;
