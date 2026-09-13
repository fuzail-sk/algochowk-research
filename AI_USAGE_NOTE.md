# AI Usage Note

## Where AI Was Used

Google Gemini was used as a natural-language research assistant.

Its main responsibility was to interpret the user's market question and identify ambiguity or missing parameters.

For example, given:

> "Does buying NIFTY after a sharp fall work?"

the AI identified that the definition of "sharp fall", timeframe, entry timing, holding period, and exit condition were unspecified.

## Where AI Was Not Used

The AI was intentionally not used to calculate backtest results.

After the user confirmed the experiment assumptions, deterministic JavaScript code performed:

- Signal detection
- Entry and exit selection
- Return calculation
- Average return
- Median return
- Win rate
- Best and worst return

This separation was a deliberate design decision to make numerical results reproducible.

## Human Decisions

The product workflow and assumptions were explicitly reviewed before testing.

The prototype also includes human-designed limitations around:

- Small sample size
- Transaction costs
- Slippage
- Data quality
- Look-ahead bias
- Overfitting
- Statistical significance

AI output was therefore treated as an interpretation aid rather than an authoritative financial conclusion.

## AI Limitation

During development, AI API rate limits were encountered.

The application was designed so that the deterministic backtest remains independent of the AI layer. This reinforced the architectural decision to keep language interpretation and numerical computation separate.