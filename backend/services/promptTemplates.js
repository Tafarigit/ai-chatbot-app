const rubric = require("../data/rubric.json");

function createPrompt(candidateAnswer) {
  return `
You are an experienced interview coach and technical recruiter. 
Evaluate the following candidate answer based on the rubric criteria below.

Rubric Criteria:
- Clarity: ${rubric.clarity}
- Structure: ${rubric.structure}
- Impact: ${rubric.impact}
- Overall: ${rubric.overall}

Candidate Answer:
"""
${candidateAnswer}
"""

Your task:
1. Assign a numeric score (0.0 to 1.0) for each rubric category.
2. Write a detailed comment (2–3 sentences) explaining your reasoning and how the candidate could improve.
3. Respond **only** with a valid JSON object — nothing else.

Return output strictly in this format (no code fences, no Markdown, no extra text):

{
  "clarity": 0.85,
  "structure": 0.75,
  "impact": 0.80,
  "overall": 0.80,
  "comments": "The answer is well-organized and clear, but it could be more impactful by including measurable results or specific examples."
}

IMPORTANT RULES:
- The response must be valid JSON.
- All keys must appear exactly as shown.
- Do not include any explanations outside the JSON.
- Do not wrap the JSON in triple backticks or text.`;
}

module.exports = { createPrompt };
