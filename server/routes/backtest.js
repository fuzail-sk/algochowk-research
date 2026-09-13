const express = require("express");
const { runBacktest } = require("../services/backtestService");
const { loadNiftyData } = require("../utils/dataLoader");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    console.log("BACKTEST BODY:", req.body);

    const sharpFallPercent = Number(
      req.body?.sharpFallPercent ?? 2
    );

    const holdingDays = Number(
      req.body?.holdingDays ?? 5
    );

    const data = loadNiftyData();

    console.log("DATA ROWS:", data.length);
    console.log("FIRST ROW:", data[0]);

    const result = runBacktest(data, {
      sharpFallPercent,
      holdingDays,
    });

    res.json({
      dataSource: "Local prototype dataset",
      instrument: "NIFTY",
      timeframe: "Daily",

      assumptions: {
        sharpFallPercent,
        holdingDays,
        entry: "Next trading day's open",
        exit: "Close after holding period",
      },

      ...result,
    });
  } catch (error) {
    console.error("BACKTEST ERROR:", error);

    res.status(500).json({
      message: "Unable to run backtest.",
      error: error.message,
    });
  }
});

module.exports = router;