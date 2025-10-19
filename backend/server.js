const app = require("./app");

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



🌟 Feature: AI Interview Coach (Branch: feature/interview-coach)

This branch builds on the base AI Chatbot and adds a focused Interview Coaching MVP. Key enhancements:

AI-powered evaluation: Submit your answer to a sample interview question and get scores and actionable feedback on Clarity, Structure, Impact, and Overall quality.

Dynamic question selection: Choose from a curated set of interview questions directly from the frontend.

Structured AI responses: Feedback is returned in JSON, parsed and formatted for clear presentation on the UI.

Backend & frontend integration: Fully functional evaluate POST route and synced React component (InterviewCoach.jsx).

Quick Start (Assuming base setup is done)

Checkout this feature branch:

git checkout feature/interview-coach


Start the backend and frontend as usual (npm install if needed, then npm start / npm run dev).

Visit the frontend app, navigate to the Interview Coach component, select a question, and submit your answer. Scores and comments appear immediately.

Note: This is a text-only MVP. Future enhancements may include audio support, expanded question sets, and smarter AI prompts.
