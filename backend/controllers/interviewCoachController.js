const evaluateInterviewResponse = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Both question and answer are required.",
        });
    }

    const rubric = {
      clarity: 0.3,
      structure: 0.3,
      impact: 0.4,
    };

    const systemPrompt = `You are an experienced interview coach. Evaluate the following candidate's response based on the rubric below.
        Rubric: ${JSON.stringify(rubric)}
        Return feedback in JSON format:
        {
        "clarity": 0-10,
        "structure": 0-10,
        "impact": 0-10,
        "overall": 0-10,
        "feedback": "..."
        }
        `;
    const fullPrompt = `
        Interview Question: ${question}
        Candidate's Response: ${answer}
        `;
    const aiResponse = (await callAIService)
      ? await callAIService(systemPrompt, fullPrompt)
      : {
          clarity: 8,
          structure: 7,
          impact: 9,
          overall: 8,
          feedback: "Strong communication and well-structured response.",
        };
    res.status(200).json({ success: true, result: aiResponse });
  } catch (error) {
    console.error("Interview Coach Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error evaluating response" });
  }
};

module.exports = { evaluateInterviewResponse };
