const express = require("express");
const router = express.Router();
const pool = require("../db/dbConfig");
const { createPrompt } = require("../services/promptTemplates");

router.post("/", async (req, res) => {
  const { userMessage, userId } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ Missing API key");
    return res
      .status(500)
      .json({ error: "Server misconfigured: missing API key" });
  }

  if (!userMessage || !userId) {
    return res.status(400).json({ error: "userMessage and userId required" });
  }

  try {
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
              parts: [{ text: createPrompt(userMessage) }],
            },
          ],
        }),
      }
    );
    const geminiData = await geminiResponse.json();

    const botReplyText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    let formattedResponse;
    try {
      const jsonMatch = botReplyText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : botReplyText;

      const evaluation = JSON.parse(jsonString);

      formattedResponse = `📊 Interview Evaluation:

Clarity: ${evaluation.clarity}/1.0
${evaluation.clarity >= 0.7 ? "✓" : "⚠️"} ${
        evaluation.clarity >= 0.7 ? "Good clarity" : "Needs improvement"
      }

Structure: ${evaluation.structure}/1.0
${evaluation.structure >= 0.7 ? "✓" : "⚠️"} ${
        evaluation.structure >= 0.7
          ? "Well structured"
          : "Consider improving structure"
      }

Impact: ${evaluation.impact}/1.0
${evaluation.impact >= 0.7 ? "✓" : "⚠️"} ${
        evaluation.impact >= 0.7 ? "Strong impact" : "Could show more impact"
      }

Overall: ${evaluation.overall}/1.0

💬 Coach's Comments:
${evaluation.comments}`;
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.error("Response text:", botReplyText);

      formattedResponse = botReplyText;
    }

    const savedBotMessage = await pool.query(
      `INSERT INTO messages (user_id, content, is_bot_message) VALUES ($1, $2, $3) RETURNING *`,
      [userId, formattedResponse, true]
    );

    res.json({ botMessage: savedBotMessage.rows[0] });
  } catch (err) {
    console.error("Error in chatbot route:", err);
    res.status(500).json({ error: "Error processing chatbot message" });
  }
});

module.exports = router;
