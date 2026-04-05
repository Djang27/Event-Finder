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
- city: default to "Los Angeles" if not specified
- category: one of "music", "sports", "arts", "food", "comedy", or null
- keyword: a specific search term to pass to the event API, e.g. "basketball", "jazz", "comedy show". Use this for specific genres, sports, or artists.
- maxPrice: a number or null if not specified
- preferHiddenGems: true if user mentions words like "hidden", "local", "underground", "small", "indie"
- mood: a short description of the vibe the user wants
- startDate/endDate: ONLY set these if the user explicitly mentions a time like "tonight", "this weekend", "next week", "Friday", "tomorrow". If no time is mentioned, set both to null. Format: "YYYY-MM-DDT00:00:00Z". Today is ${new Date().toISOString().split("T")[0]}.

User query: "${userQuery}"`
      }
    ]
  });

  const raw = message.content[0].text;
  return JSON.parse(raw);
}

module.exports = { parseUserQuery };