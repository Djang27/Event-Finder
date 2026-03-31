const BASE_URL = "http://localhost:8000";

export async function searchEvents(query) {
  const res = await fetch(`${BASE_URL}/ai/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
}