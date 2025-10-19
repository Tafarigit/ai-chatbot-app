const express = require("express");

const {
  evaluateInterviewResponse,
  getInterviewQuestions,
} = require("../controllers/interviewCoachController");

const router = express.Router();

router.post("/evaluate", evaluateInterviewResponse);

router.get("/questions", getInterviewQuestions);

module.exports = router;
