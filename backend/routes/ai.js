const express = require("express");
const router = express.Router();
const { parseUserQuery } = require("../services/claude");
const tm = require("../services/ticketmaster");
const { scoreEvents } = require("../services/gemScorer");

router.post("/search", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Step 1: Ask Claude to parse the query into filters
    const filters = await parseUserQuery(query);

    // Step 2: Fetch real events
    const events = await tm.fetchEvents({
      city: filters.city,
      startDate: filters.startDate,
      endDate: filters.endDate,
      category: filters.category,
    });

    // Step 3: Score and sort events by hidden gem score
    const scoredEvents = scoreEvents(events);

    res.json({
      filters,
      count: scoredEvents.length,
      events: scoredEvents,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "AI search failed" });
  }
});

module.exports = router;