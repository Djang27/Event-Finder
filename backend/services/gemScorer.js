function scoreEvent(event) {
  let score = 50; // start neutral

  const promoter = (event.promoter || "").toLowerCase();
  const venue = (event.venue || "").toLowerCase();
  const name = (event.name || "").toLowerCase();

  // --- PENALTIES (subtract points) ---

  // Major national promoters
  const bigPromoters = [
    "live nation",
    "nba regular season",
    "nfl",
    "mlb",
    "nhl",
    "mls",
    "wnba",
    "aeg",
    "anschutz",
    "broadway",
    "promoted by venue",
  ];
  if (bigPromoters.some((p) => promoter.includes(p))) score -= 30;

  // Major venues
  const bigVenues = [
    "crypto.com",
    "sofi stadium",
    "dodger stadium",
    "hollywood bowl",
    "staples",
    "kia forum",
    "banc of california",
    "rose bowl",
  ];
  if (bigVenues.some((v) => venue.includes(v))) score -= 25;

  // Big touring acts
  const mainstreamKeywords = [
    "world tour",
    "stadium tour",
    "arena tour",
  ];
  if (mainstreamKeywords.some((k) => name.includes(k))) score -= 15;

  // --- BONUSES (add points) ---

  // No promoter at all — self-promoted / grassroots
  if (!event.promoter) score += 20;

  // Genuinely indie/community keywords in the name
  const indieKeywords = [
    "benefit",
    "showcase",
    "open mic",
    "pop-up",
    "popup",
    "community",
    "indie",
    "underground",
    "fundraiser",
    "presents:",
    "local",
    "diy",
    "zine",
    "art show",
    "gallery",
    "workshop",
  ];
  if (indieKeywords.some((k) => name.includes(k))) score += 20;

  // Small/independent venue signals
  const smallVenueKeywords = [
    "cafe",
    "bar",
    "lounge",
    "club",
    "theater",
    "theatre",
    "gallery",
    "studio",
    "space",
    "room",
    "hall",
    "lodge",
    "inn",
  ];
  if (smallVenueKeywords.some((v) => venue.includes(v))) score += 15;

  // KCRW, NPR, community radio presented events are always gems
  const communityPresenters = ["kcrw", "kpcc", "npr", "dublab"];
  if (communityPresenters.some((p) => name.includes(p))) score += 20;

  // Cap between 0 and 100
  score = Math.max(0, Math.min(score, 100));

  return {
    ...event,
    gemScore: score,
    isHiddenGem: score >= 55,
  };
}

function scoreEvents(events) {
  return events
    .map(scoreEvent)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

module.exports = { scoreEvents };