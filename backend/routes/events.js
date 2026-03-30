const express = require("express");
const router = express.Router();
const tm = require("../services/ticketmaster");

router.get("/search", async (req, res) => {
  const { city, startDate, endDate, category } = req.query;

  try {
    const events = await tm.fetchEvents({ city, startDate, endDate, category });
    res.json({ count: events.length, events });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = router;