// // backend/routes/chatbot.js
// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const pool = require("../db/dbConfig");

// const BOT_UUID = "b29ae6af-4329-44e1-b567-664c39d09307"; // AI_BOT UUID
// const HF_MODEL = "gpt2";; // Choose your Hugging Face model here
// const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;;

// router.post("/", async (req, res) => {
//   console.log("✅ /api/chatbot POST route hit");

//   const { userMessage, userId } = req.body;

//   if (!process.env.GEMINI_API_KEY) {
//     console.error("❌ HF_API_KEY is missing in backend!");
//     return res.status(500).json({ error: "Server misconfigured: missing API key" });
//   }

//   if (!userMessage || !userId) {
//     return res.status(400).json({ error: "userMessage and userId required" });
//   }

//   try {
//     console.log("Received:", { userMessage, userId });

//     // 1. Call Hugging Face Inference API
//     const hfResponse = await axios.post(
//       HF_API_URL,
//       { inputs: userMessage },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Extract the generated text
//     const botReplyText = hfResponse.data?.[0]?.generated_text || "Sorry, I couldn't generate a response.";

//     // 2. Save bot message in DB
//     const savedMessage = await pool.query(
//       `INSERT INTO messages (sender_id, receiver_id, content)
//        VALUES ($1, $2, $3) RETURNING *`,
//       [BOT_UUID, userId, botReplyText]
//     );

//     // 3. Send back bot message to frontend
//     res.json({ botMessage: savedMessage.rows[0] });

//   } catch (err) {
//     console.error("Error in chatbot route:", err.response?.data || err.message);
//     res.status(500).json({ error: "Error processing chatbot message" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const pool = require("../db/dbConfig");

router.post("/", async (req, res) => {
  console.log("✅ /api/chatbot POST route hit");

  const { userMessage, userId } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing in backend!");
    return res.status(500).json({ error: "Server misconfigured: missing API key" });
  }

  if (!userMessage || !userId) {
    return res.status(400).json({ error: "userMessage and userId required" });
  }

  try {
    console.log("Received:", { userMessage, userId });

    // 1. Save user message to database
    await pool.query(
      `INSERT INTO messages (user_id, content, is_bot_message) VALUES ($1, $2, $3)`,
      [userId, userMessage, false]
    );

    // 2. Call Gemini API
  const geminiResponse = await fetch(
     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
     {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         contents: [{
           parts: [{ text: userMessage }]
         }]
       })
     }
   );
    const geminiData = await geminiResponse.json();
   console.log("🔍 Gemini API response:", geminiData);
   const botReplyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
   console.log("🤖 Bot reply extracted:", botReplyText);

    // 3. Save bot response to database
    const savedBotMessage = await pool.query(
      `INSERT INTO messages (user_id, content, is_bot_message) VALUES ($1, $2, $3) RETURNING *`,
      [userId, botReplyText, true]
    );

    // 4. Return bot response
    res.json({ botMessage: savedBotMessage.rows[0] });

  } catch (err) {
    console.error("Error in chatbot route:", err);
    res.status(500).json({ error: "Error processing chatbot message" });
  }
});

module.exports = router;