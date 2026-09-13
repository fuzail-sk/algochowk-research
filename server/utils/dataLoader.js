const fs = require("fs");
const path = require("path");

function loadNiftyData() {
  const filePath = path.join(
    __dirname,
    "../data/nifty_daily.csv"
  );

  const csv = fs.readFileSync(filePath, "utf8");

  const lines = csv
    .trim()
    .split(/\r?\n/);

  const headers = lines[0]
    .replace(/^\uFEFF/, "")
    .split(",")
    .map((header) => header.trim().toLowerCase());

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.trim();
    });

    return {
      date: row.date,
      open: Number(row.open),
      high: Number(row.high),
      low: Number(row.low),
      close: Number(row.close),
    };
  });
}

module.exports = {
  loadNiftyData,
};