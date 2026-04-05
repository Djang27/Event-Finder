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
  "keyword": null,
  "maxPrice": null,
  "preferHiddenGems": false,
  "mood": "",
  "startDate": null,
  "endDate": null
}

Rules:
- city: default to "Los Angeles" if not specified. If the user mentions a specific sports team or artist, set city to null so the search is nationwide. If the user mentions a city explicitly (e.g. "in New York", "in Chicago"), use that city.
- category: one of "music", "sports", "arts", "food", "comedy", or null
- keyword: ONLY use this for specific genres, sports teams, or artist names (e.g. "jazz", "Lakers", "Kendrick Lamar"). Do NOT set keyword for generic terms like "live music", "concerts", "shows", or "events" — leave it null and let category handle those.
- maxPrice: a number or null if not specified
- preferHiddenGems: true if user mentions words like "hidden", "local", "underground", "small", "indie"
- mood: a short description of the vibe the user wants
- startDate/endDate: ONLY set these if the user explicitly mentions a time like "tonight", "this weekend", "next week", "Friday", "tomorrow". If no time is mentioned, set both to null. For "this weekend" set startDate to today and endDate to at least 3 days from now at 23:59:59Z. For "tonight" use today only. For "this week" or "next week" use the next 7 days. Format: "YYYY-MM-DDT00:00:00Z". Today is ${new Date().toISOString().split("T")[0]}.
User query: "${userQuery}"`
      }
    ]
  });

  const raw = message.content[0].text;
  return JSON.parse(raw);
}

module.exports = { parseUserQuery };