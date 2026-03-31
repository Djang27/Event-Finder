function scoreEvent(event) {
  let score = 0;

  // Free or cheap ticket
  if (event.price === null || event.price === 0) score += 15;
  else if (event.price < 15) score += 25;
  else if (event.price < 30) score += 10;

  // Not a major national promoter
  const bigPromoters = [
    "live nation",
    "nba regular season",
    "nfl",
    "mlb",
    "nhl",
    "mls",
    "aeg",
    "anschutz",
  ];
  const promoter = (event.promoter || "").toLowerCase();
  const isBigPromoter = bigPromoters.some((p) => promoter.includes(p));
  if (!isBigPromoter) score += 20;

  // Came from Eventbrite (more community-driven) vs Ticketmaster
  if (event.source === "eventbrite") score += 10;

  // No promoter at all — likely self-promoted / grassroots
  if (!event.promoter) score += 15;

  // Name contains indie/community signals
  const indieKeywords = [
    "benefit",
    "presents",
    "anniversary",
    "tour",
    "showcase",
    "open mic",
    "pop-up",
    "popup",
    "community",
    "local",
    "indie",
    "underground",
  ];
  const name = (event.name || "").toLowerCase();
  const hasIndieKeyword = indieKeywords.some((k) => name.includes(k));
  if (hasIndieKeyword) score += 15;

  // Cap score at 100
  score = Math.min(score, 100);

  return {
    ...event,
    gemScore: score,
    isHiddenGem: score >= 40,
  };
}

function scoreEvents(events) {
  return events
    .map(scoreEvent)
    .sort((a, b) => b.gemScore - a.gemScore);
}

module.exports = { scoreEvents };