function runBacktest(data, config = {}) {
  const sharpFallPercent = Number(
    config.sharpFallPercent ?? 2
  );

  const holdingDays = Number(
    config.holdingDays ?? 5
  );

  const trades = [];

  for (let i = 1; i < data.length; i++) {
    const signalDay = data[i];
    const previousDay = data[i - 1];

    // Measure the daily fall from previous close
    // to the current close.
    const dailyFall =
      ((signalDay.close - previousDay.close) /
        previousDay.close) *
      100;

    // Only continue when the market fell by
    // the configured threshold.
    if (dailyFall > -sharpFallPercent) {
      continue;
    }

    const entryIndex = i + 1;
    const exitIndex = entryIndex + holdingDays - 1;

    if (exitIndex >= data.length) {
      continue;
    }

    const entryDay = data[entryIndex];
    const exitDay = data[exitIndex];

    const entryPrice = Number(entryDay.open);
    const exitPrice = Number(exitDay.close);

    if (
      !Number.isFinite(entryPrice) ||
      !Number.isFinite(exitPrice) ||
      entryPrice <= 0
    ) {
      continue;
    }

    const returnPercent =
      ((exitPrice - entryPrice) /
        entryPrice) *
      100;

    trades.push({
      signalDate: signalDay.date,
      entryDate: entryDay.date,
      exitDate: exitDay.date,
      entryPrice,
      exitPrice,
      returnPercent: Number(
        returnPercent.toFixed(2)
      ),
    });
  }

  const returns = trades.map(
    (trade) => trade.returnPercent
  );

  if (returns.length === 0) {
    return {
      trades: [],
      summary: {
        totalTrades: 0,
        averageReturn: 0,
        medianReturn: 0,
        winRate: 0,
        bestReturn: 0,
        worstReturn: 0,
      },
    };
  }

  const sortedReturns = [...returns].sort(
    (a, b) => a - b
  );

  const averageReturn =
    returns.reduce(
      (sum, value) => sum + value,
      0
    ) / returns.length;

  const middle = Math.floor(
    sortedReturns.length / 2
  );

  const medianReturn =
    sortedReturns.length % 2 === 0
      ? (
          sortedReturns[middle - 1] +
          sortedReturns[middle]
        ) / 2
      : sortedReturns[middle];

  const winningTrades = returns.filter(
    (value) => value > 0
  ).length;

  return {
    trades,

    summary: {
      totalTrades: trades.length,

      averageReturn: Number(
        averageReturn.toFixed(2)
      ),

      medianReturn: Number(
        medianReturn.toFixed(2)
      ),

      winRate: Number(
        (
          (winningTrades / returns.length) *
          100
        ).toFixed(2)
      ),

      bestReturn: sortedReturns[
        sortedReturns.length - 1
      ],

      worstReturn: sortedReturns[0],
    },
  };
}

module.exports = {
  runBacktest,
};