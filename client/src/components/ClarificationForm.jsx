import { useState } from "react";

function ClarificationForm({ analysis, onContinue }) {
  const [sharpFall, setSharpFall] = useState("2%");
  const [timeframe, setTimeframe] = useState("Daily");
  const [entryTiming, setEntryTiming] = useState(
    "Next trading day's open"
  );
  const [holdingPeriod, setHoldingPeriod] = useState(
    "5 trading days"
  );
  const [exitCondition, setExitCondition] = useState(
    "Exit at the close after the holding period"
  );
  const [testPeriod, setTestPeriod] = useState("Prototype sample");

  function handleContinue() {
    const experiment = {
      ...analysis,

      entryCondition: `Daily decline of ${sharpFall} or more`,

      timeframe,
      entryTiming,
      holdingPeriod,
      exitCondition,
      testPeriod,

      assumptions: {
        sharpFall,
        timeframe,
        entryTiming,
        holdingPeriod,
        exitCondition,
        testPeriod,
      },
    };

    onContinue(experiment);
  }

  return (
    <div className="clarify-container">
      <div className="clarify-header">
        <p className="eyebrow">CLARIFY</p>

        <h1>Let's make the question testable.</h1>

        <p>
          Here's what I understood from your question. The
          suggestions below are assumptions you can change before
          we build the experiment.
        </p>
      </div>

      <div className="understood-card">
        <h2>What I understood</h2>

        <div className="field-grid">
          <div className="field">
            <span>Instrument</span>
            <strong>{analysis.instrument}</strong>
          </div>

          <div className="field">
            <span>Original entry condition</span>
            <strong>{analysis.entryCondition}</strong>
          </div>

          <div className="field">
            <span>Research question</span>
            <strong>{analysis.researchQuestion}</strong>
          </div>
        </div>
      </div>

      <div className="assumptions-card">
        <div className="section-heading">
          <div>
            <h2>Define the missing details</h2>

            <p>
              These are suggested starting points, not facts from
              your original question.
            </p>
          </div>

          <span className="suggested-badge">
            Suggested
          </span>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="sharp-fall">
              What counts as a sharp fall?
            </label>

            <input
              id="sharp-fall"
              type="text"
              value={sharpFall}
              onChange={(event) =>
                setSharpFall(event.target.value)
              }
              placeholder="e.g. 2%"
            />

            <small>
              Example: 2% or more decline in one trading day.
            </small>
          </div>

          <div className="form-field">
            <label htmlFor="timeframe">
              Timeframe
            </label>

            <select
              id="timeframe"
              value={timeframe}
              onChange={(event) =>
                setTimeframe(event.target.value)
              }
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Hourly</option>
              <option>15 minutes</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="entry-timing">
              Entry timing
            </label>

            <select
              id="entry-timing"
              value={entryTiming}
              onChange={(event) =>
                setEntryTiming(event.target.value)
              }
            >
              <option>Next trading day's open</option>
              <option>Close of the fall day</option>
              <option>Next trading day's close</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="holding-period">
              Holding period
            </label>

            <select
              id="holding-period"
              value={holdingPeriod}
              onChange={(event) =>
                setHoldingPeriod(event.target.value)
              }
            >
              <option>1 trading day</option>
              <option>3 trading days</option>
              <option>5 trading days</option>
              <option>10 trading days</option>
              <option>20 trading days</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="exit-condition">
              Exit condition
            </label>

            <select
              id="exit-condition"
              value={exitCondition}
              onChange={(event) =>
                setExitCondition(event.target.value)
              }
            >
              <option>
                Exit at the close after the holding period
              </option>

              <option>
                Exit when target profit is reached
              </option>

              <option>
                Exit when stop-loss is reached
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="test-period">
              Historical test period
            </label>

            <select
              id="test-period"
              value={testPeriod}
              onChange={(event) =>
                setTestPeriod(event.target.value)
              }
            >
           <option>Prototype sample</option>
            </select>
          </div>
        </div>
      </div>

      <div className="clarify-note">
        <span>i</span>

        <p>
          Changing these assumptions can change the result of the
          experiment. We'll show the final assumptions before
          running the test.
        </p>
      </div>

      <div className="clarify-actions">
        <button className="back-button">
          ← Back
        </button>

        <button
          className="continue-button"
          onClick={handleContinue}
        >
          Build experiment
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ClarificationForm;