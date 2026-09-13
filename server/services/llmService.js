const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResearchQuestion(question) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",

    system_instruction: `
You are a research assistant for a financial research prototype.

Your job is to interpret a user's natural-language trading research question.

Do not invent important missing parameters.

Identify:
- instrument
- timeframe
- entry condition
- entry timing
- exit condition
- holding period
- test period
- filters
- research question
- missing information

If an important parameter is missing, put it in missingInformation.

The user question will be provided as the input.
`,

    input: question,

    response_format: {
      type: "text",
      mime_type: "application/json",

      schema: {
        type: "object",

        properties: {
          instrument: {
            type: "string",
          },

          timeframe: {
            type: "string",
          },

          entryCondition: {
            type: "string",
          },

          entryTiming: {
            type: "string",
          },

          exitCondition: {
            type: "string",
          },

          holdingPeriod: {
            type: "string",
          },

          testPeriod: {
            type: "string",
          },

          filters: {
            type: "array",
            items: {
              type: "string",
            },
          },

          researchQuestion: {
            type: "string",
          },

          missingInformation: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },

        required: [
          "instrument",
          "timeframe",
          "entryCondition",
          "entryTiming",
          "exitCondition",
          "holdingPeriod",
          "testPeriod",
          "filters",
          "researchQuestion",
          "missingInformation",
        ],
      },
    },
  });

 const result = JSON.parse(interaction.output_text);

return {
  ...result,
  filters: Array.isArray(result.filters) ? result.filters : [],
  missingInformation: Array.isArray(result.missingInformation)
    ? result.missingInformation
    : [],
};
}

module.exports = {
  analyzeResearchQuestion,
};