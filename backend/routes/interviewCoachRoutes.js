const express = require("express");

const { evaluateInterviewResponse } = require("../controllers/interviewCoachController");

const router = express.Router();

router.post("/evaluate", evaluateInterviewResponse);

module.exports = router;
