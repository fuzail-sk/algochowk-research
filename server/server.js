const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");
const backtestRoute = require("./routes/backtest");

const app = express();

const allowedOrigin =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api/analyze", analyzeRoute);
app.use("/api/backtest", backtestRoute);

app.get("/api/health", (req, res) => {
  res.json({
    message: "AlgoChowk Research API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});