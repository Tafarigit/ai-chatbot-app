const axios = require("axios");
const { createPrompt } = require("../services/promptTemplates");

async function callAIService(prompt) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response from AI."
    );
  } catch (error) {
    console.error("Error calling AI service:", error);
    return "Sorry, AI service could not generate a response.";
  }
}

const evaluateInterviewResponse = async (req, res) => {

  try {
    const userId = req.user.id;
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ success: false, message: "Missing question or answer" });
    }

    const prompt = createPrompt(answer);

    const aiOutput = await callAIService(prompt);
    console.log("Raw Gemini output:\n", aiOutput);

    let parsed;
    try {
      parsed = JSON.parse(aiOutput);
    } catch {
      parsed = { rawResponse: aiOutput };
    }

    res.json({ success: true, result: parsed });
  } catch (err) {
    console.error("Error evaluating response:", err);
    res
      .status(500)
      .json({ success: false, message: "Error evaluating response" });
  }
};

const getInterviewQuestions = async (req, res) => {
  try {
    const questions = [
      "Tell me about a time you overcame a challenge at work.",
      "How do you handle tight deadlines?",
      "Describe a situation where you worked in a team to solve a problem.",
    ];

    res.json({ success: true, questions });
  } catch (err) {
    console.error("Error fetching interview questions:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching questions" });
  }
};

module.exports = { evaluateInterviewResponse, getInterviewQuestions };
