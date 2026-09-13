const express = require("express");
const {
  analyzeResearchQuestion,
} = require("../services/llmService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: "Please provide a research question.",
      });
    }

    const analysis = await analyzeResearchQuestion(question);

    res.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);

    // Handle Gemini rate limits separately
    if (error.status === 429 || error.statusCode === 429) {
      return res.status(429).json({
        message:
          "AI usage limit reached. Please wait a moment and try again.",
      });
    }

    res.status(500).json({
      message: "Unable to analyze the question.",
    });
  }
});

module.exports = router;