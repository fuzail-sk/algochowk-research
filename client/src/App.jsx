import { useState } from "react";
import "./App.css";
import {
  analyzeQuestion,
  runBacktest,
} from "./services/api";
import ClarificationForm from "./components/ClarificationForm";
import LearnSummary from "./components/LearnSummary";

function App() {
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [experiment, setExperiment] = useState(null);
  const [results, setResults] = useState(null);
  const [learnMode, setLearnMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [runningTest, setRunningTest] = useState(false);

  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!question.trim()) {
      setError("Please enter a research question.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await analyzeQuestion(question);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleContinue(experimentData) {
    setExperiment(experimentData);
  }

  async function handleRunExperiment() {
    setRunningTest(true);
    setError("");

    try {
      const result = await runBacktest({
        sharpFallPercent: Number(
          experiment.assumptions.sharpFall.replace("%", "")
        ),
        holdingDays: Number(
          experiment.assumptions.holdingPeriod.split(" ")[0]
        ),
      });

      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setRunningTest(false);
    }
  }

 function handleNewQuestion() {
  setQuestion("");
  setAnalysis(null);
  setExperiment(null);
  setResults(null);
  setLearnMode(false);
  setError("");
}
if (learnMode && results) {
  return (
    <LearnSummary
      experiment={experiment}
      results={results}
      onBack={() => setLearnMode(false)}
    />
  );
}

  // TEST / RESULTS
  if (results) {
    return (
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">A</div>

            <div>
              <h2>AlgoChowk Research</h2>
              <span>AI-powered market research</span>
            </div>
          </div>

          <button
            className="new-question"
            onClick={handleNewQuestion}
          >
            New question
          </button>
        </header>

        <main className="main-content">
          <section className="hero">
            <p className="eyebrow">TEST</p>

            <h1>
              The experiment
              <br />
              <span>has been completed.</span>
            </h1>

            <p className="description">
              The deterministic backtest engine tested the
              confirmed assumptions against the prototype dataset.
            </p>
          </section>

          <section className="question-card">
            <div className="section-heading">
              <div>
                <h2>Backtest results</h2>

                <p>
                  NIFTY · Daily · {experiment.holdingPeriod}
                </p>
              </div>

              <span className="suggested-badge">
                Tested
              </span>
            </div>

            <div className="field-grid">
              <div className="field">
                <span>Qualifying events</span>
                <strong>
                  {results.summary.totalTrades}
                </strong>
              </div>

              <div className="field">
                <span>Average return</span>
                <strong>
                  {results.summary.averageReturn}%
                </strong>
              </div>

              <div className="field">
                <span>Median return</span>
                <strong>
                  {results.summary.medianReturn}%
                </strong>
              </div>

              <div className="field">
                <span>Win rate</span>
                <strong>
                  {results.summary.winRate}%
                </strong>
              </div>

              <div className="field">
                <span>Best return</span>
                <strong>
                  {results.summary.bestReturn}%
                </strong>
              </div>

              <div className="field">
                <span>Worst return</span>
                <strong>
                  {results.summary.worstReturn}%
                </strong>
              </div>
            </div>

            <div className="define-note">
              <span>i</span>

              <p>
                These results come from the deterministic
                backtest engine. They are historical observations
                from the prototype dataset, not a prediction of
                future performance.
              </p>
            </div>
          </section>

          <section className="question-card">
            <h2>Individual trades</h2>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "16px",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>
                      Signal
                    </th>

                    <th style={tableHeaderStyle}>
                      Entry
                    </th>

                    <th style={tableHeaderStyle}>
                      Exit
                    </th>

                    <th style={tableHeaderStyle}>
                      Entry price
                    </th>

                    <th style={tableHeaderStyle}>
                      Exit price
                    </th>

                    <th style={tableHeaderStyle}>
                      Return
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.trades.map(
                    (trade, index) => (
                      <tr key={index}>
                        <td style={tableCellStyle}>
                          {trade.signalDate}
                        </td>

                        <td style={tableCellStyle}>
                          {trade.entryDate}
                        </td>

                        <td style={tableCellStyle}>
                          {trade.exitDate}
                        </td>

                        <td style={tableCellStyle}>
                          {trade.entryPrice}
                        </td>

                        <td style={tableCellStyle}>
                          {trade.exitPrice}
                        </td>

                        <td style={tableCellStyle}>
                          {trade.returnPercent}%
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="card-footer">
              <span className="hint">
                Data source: {results.dataSource}
              </span>

              <div style={{ display: "flex", gap: "10px" }}>
  <button
    className="analyze-button"
    onClick={() => setResults(null)}
  >
    Back to definition
    <span>←</span>
  </button>

  <button
    className="analyze-button"
    onClick={() => setLearnMode(true)}
  >
    What did we learn?
    <span>→</span>
  </button>
</div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // DEFINE
  if (experiment) {
    return (
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">A</div>

            <div>
              <h2>AlgoChowk Research</h2>
              <span>AI-powered market research</span>
            </div>
          </div>

          <button
            className="new-question"
            onClick={handleNewQuestion}
          >
            New question
          </button>
        </header>

        <main className="main-content">
          <section className="hero">
            <p className="eyebrow">DEFINE</p>

            <h1>
              Your experiment is
              <br />
              <span>ready to review.</span>
            </h1>

            <p className="description">
              Your question has been converted into a structured
              experiment using the assumptions you selected.
            </p>
          </section>

          <section className="question-card">
            <div className="section-heading">
              <div>
                <h2>Experiment definition</h2>

                <p>
                  These assumptions will be used for the
                  historical test.
                </p>
              </div>

              <span className="suggested-badge">
                Confirmed
              </span>
            </div>

            <div className="field-grid">
              <div className="field">
                <span>Instrument</span>
                <strong>
                  {experiment.instrument}
                </strong>
              </div>

              <div className="field">
                <span>Timeframe</span>
                <strong>
                  {experiment.timeframe}
                </strong>
              </div>

              <div className="field">
                <span>Entry condition</span>
                <strong>
                  {experiment.entryCondition}
                </strong>
              </div>

              <div className="field">
                <span>Entry timing</span>
                <strong>
                  {experiment.entryTiming}
                </strong>
              </div>

              <div className="field">
                <span>Holding period</span>
                <strong>
                  {experiment.holdingPeriod}
                </strong>
              </div>

              <div className="field">
                <span>Exit condition</span>
                <strong>
                  {experiment.exitCondition}
                </strong>
              </div>

              <div className="field">
                <span>Historical period</span>
                <strong>
                  {experiment.testPeriod}
                </strong>
              </div>
            </div>

            <div className="define-note">
              <span>i</span>

              <p>
                The backtest engine will calculate the numerical
                results from the dataset. The AI does not
                calculate the results.
              </p>
            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <div className="card-footer">
              <span className="hint">
                Review the assumptions before running the test.
              </span>

              <button
                className="analyze-button"
                onClick={handleRunExperiment}
                disabled={runningTest}
              >
                {runningTest
                  ? "Running test..."
                  : "Run experiment"}

                {!runningTest && <span>→</span>}
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // CLARIFY
  if (analysis) {
    return (
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">A</div>

            <div>
              <h2>AlgoChowk Research</h2>
              <span>AI-powered market research</span>
            </div>
          </div>

          <button
            className="new-question"
            onClick={handleNewQuestion}
          >
            New question
          </button>
        </header>

        <main className="main-content">
          <ClarificationForm
            analysis={analysis}
            onContinue={handleContinue}
          />
        </main>
      </div>
    );
  }

  // ASK
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <h2>AlgoChowk Research</h2>
            <span>AI-powered market research</span>
          </div>
        </div>

        <button
          className="new-question"
          onClick={handleNewQuestion}
        >
          New question
        </button>
      </header>

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">
            RESEARCH ASSISTANT
          </p>

          <h1>
            Turn a market question
            <br />
            <span>into a testable experiment.</span>
          </h1>

          <p className="description">
            Ask a question about the market in plain English.
            We'll help you clarify the assumptions and turn it
            into a structured research experiment.
          </p>
        </section>

        <section className="question-card">
          <label htmlFor="research-question">
            What do you want to investigate?
          </label>

          <textarea
            id="research-question"
            placeholder="e.g. Does buying NIFTY after a sharp fall work?"
            rows="5"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="card-footer">
            <span className="hint">
              Ask a research question in your own words.
            </span>

            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading
                ? "Analyzing..."
                : "Analyze question"}

              {!loading && <span>→</span>}
            </button>
          </div>
        </section>

        <section className="examples">
          <p>Try an example</p>

          <button
            onClick={() =>
              setQuestion(
                "Does buying NIFTY after a 2% fall have an edge?"
              )
            }
          >
            Does buying NIFTY after a 2% fall have an edge?
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Does the effect change during high volatility?"
              )
            }
          >
            Does the effect change during high volatility?
          </button>
        </section>
      </main>
    </div>
  );
}

const tableHeaderStyle = {
  textAlign: "left",
  padding: "12px 8px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "13px",
  color: "#64748b",
};

const tableCellStyle = {
  padding: "14px 8px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "14px",
};

export default App;