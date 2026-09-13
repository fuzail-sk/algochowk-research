# AlgoChowk Research Assistant

An AI-assisted market research prototype that turns a natural-language trading question into a structured, testable experiment.

## Problem

A question such as:

> "Does buying NIFTY after a sharp fall work?"

sounds simple, but it is ambiguous.

What is a "sharp fall"?  
When should the position be entered?  
How long should it be held?  
When should it be exited?

This prototype addresses that ambiguity before running a backtest.

## Product Workflow

The application follows:

**ASK → CLARIFY → DEFINE → TEST → LEARN**

### 1. ASK

The user enters a market research question in natural language.

### 2. CLARIFY

The AI interprets the question and identifies missing parameters such as:

- Instrument
- Timeframe
- Entry condition
- Entry timing
- Holding period
- Exit condition
- Test period

The application presents suggested assumptions that the user can change.

### 3. DEFINE

The confirmed assumptions are converted into a structured experiment.

The user reviews the experiment before testing.

### 4. TEST

A deterministic JavaScript backtest engine runs the experiment.

The LLM does not calculate the numerical results.

For the prototype experiment:

- Instrument: NIFTY
- Timeframe: Daily
- Sharp fall: 2% or more
- Entry: Next trading day's open
- Holding period: 5 trading days
- Exit: Close after the holding period
- Dataset: Local prototype sample

### 5. LEARN

The application summarizes what the results suggest and, importantly, what they do not prove.

For example, a 100% win rate in a tiny sample is not treated as proof of a reliable trading edge.

## Example Result

The prototype dataset produced:

- 4 qualifying events
- Average return: 2.39%
- Median return: 2.33%
- Win rate: 100%
- Best return: 3.35%
- Worst return: 1.55%

These results are only observations from the prototype dataset.

The sample is too small to establish a reliable statistical edge.

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API

The AI is used for natural-language interpretation and ambiguity detection.

### Backtesting

A deterministic JavaScript backtest engine processes the dataset and calculates returns.

## Project Structure

```text
algochowk-research/
├── client/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── App.jsx
│       └── App.css
│
└── server/
    ├── routes/
    ├── services/
    ├── utils/
    ├── data/
    └── server.js