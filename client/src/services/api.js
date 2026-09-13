const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

export async function analyzeQuestion(question) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to analyze question."
    );
  }

  return data;
}

export async function runBacktest({
  sharpFallPercent,
  holdingDays,
}) {
  const response = await fetch(`${API_BASE_URL}/api/backtest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sharpFallPercent,
      holdingDays,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to run experiment."
    );
  }

  return data;
}