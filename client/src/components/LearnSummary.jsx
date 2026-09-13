function LearnSummary({ experiment, results, onBack }) {
  const totalTrades = results.summary.totalTrades;
  const winRate = results.summary.winRate;

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

        <button className="new-question" onClick={onBack}>
          New question
        </button>
      </header>

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">LEARN</p>

          <h1>
            What did the
            <br />
            <span>experiment teach us?</span>
          </h1>

          <p className="description">
            The numbers show what happened in the prototype
            sample. They do not prove that the same result will
            happen in the future.
          </p>
        </section>

        <section className="question-card">
          <div className="section-heading">
            <div>
              <h2>Research takeaway</h2>

              <p>
                Based on the confirmed experiment and its
                deterministic backtest results.
              </p>
            </div>

            <span className="suggested-badge">
              Learned
            </span>
          </div>

          <div className="define-note">
            <span>✓</span>

            <p>
              In this prototype sample, all {totalTrades} qualifying
              events produced positive returns over the selected
              {` ${experiment.holdingPeriod}`} holding period, giving
              a {winRate}% observed win rate.
            </p>
          </div>

          <div className="field-grid">
            <div className="field">
              <span>Observed average return</span>
              <strong>
                {results.summary.averageReturn}%
              </strong>
            </div>

            <div className="field">
              <span>Observed median return</span>
              <strong>
                {results.summary.medianReturn}%
              </strong>
            </div>

            <div className="field">
              <span>Number of events</span>
              <strong>
                {results.summary.totalTrades}
              </strong>
            </div>

            <div className="field">
              <span>Observed win rate</span>
              <strong>
                {results.summary.winRate}%
              </strong>
            </div>
          </div>
        </section>

        <section className="question-card">
          <h2>What this does NOT tell us</h2>

          <div className="define-note">
            <span>!</span>

            <p>
              The sample is too small to conclude that buying NIFTY
              after a sharp fall has a reliable trading edge.
              A larger historical dataset would be needed to test
              whether the effect is statistically meaningful and
              robust across different market conditions.
            </p>
          </div>

          <div className="define-note">
            <span>!</span>

            <p>
              This prototype does not include transaction costs,
              taxes, slippage, or a production-grade market-data
              pipeline. These factors can reduce actual trading
              returns.
            </p>
          </div>

          <div className="define-note">
            <span>!</span>

            <p>
              The result should therefore be treated as an
              observation from the prototype dataset, not as
              investment advice or a prediction of future
              performance.
            </p>
          </div>

          <div className="card-footer">
            <span className="hint">
              The next useful step would be testing the same
              hypothesis on a larger, clean historical dataset.
            </span>

            <button
              className="analyze-button"
              onClick={onBack}
            >
              Back to results
              <span>←</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LearnSummary;