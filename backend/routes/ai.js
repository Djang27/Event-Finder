const express = require("express");
const router = express.Router();
const { parseUserQuery } = require("../services/claude");
const tm = require("../services/ticketmaster");

router.post("/search", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Step 1: Ask Claude to parse the query into filters
    const filters = await parseUserQuery(query);
    
    // Step 2: Use those filters to fetch real events
    const events = await tm.fetchEvents({
      city: filters.city,
      startDate: filters.startDate,
      endDate: filters.endDate,
      category: filters.category,
    });

    res.json({
      filters,          // send back so frontend can show what Claude understood
      count: events.length,
      events,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "AI search failed" });
  }
});

module.exports = router;