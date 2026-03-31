const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic();

async function parseUserQuery(userQuery) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a helpful assistant for an event finder app.
        
Convert the following user query into structured search filters.
Return ONLY a valid JSON object with no other text, no explanation, no markdown.

Use this exact format:
{
  "city": "Los Angeles",
  "category": null,
  "maxPrice": null,
  "preferHiddenGems": false,
  "mood": "",
  "startDate": "YYYY-MM-DDT00:00:00Z",
  "endDate": "YYYY-MM-DDT00:00:00Z"
}

Rules:
- city: default to "Los Angeles" if not specified
- category: one of "music", "sports", "arts", "food", "comedy", or null
- maxPrice: a number or null if not specified
- preferHiddenGems: true if user mentions words like "hidden", "local", "underground", "small", "indie"
- mood: a short description of the vibe the user wants
- startDate/endDate: infer from words like "this weekend", "tonight", "next week". Today is ${new Date().toISOString().split("T")[0]}. Default to the next 7 days if not specified.

User query: "${userQuery}"`
      }
    ]
  });

  const raw = message.content[0].text;
  return JSON.parse(raw);
}

module.exports = { parseUserQuery };