const express = require("express");
const requireAuth  = require("./requireAuth")

const {
  evaluateInterviewResponse,
  getInterviewQuestions,
} = require("../controllers/interviewCoachController");

const router = express.Router();

router.post("/evaluate", requireAuth, evaluateInterviewResponse);

router.get("/questions", getInterviewQuestions);

module.exports = router;
