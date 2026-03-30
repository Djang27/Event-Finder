const axios = require("axios");

const TM_API_KEY = process.env.TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

async function fetchEvents({ city, startDate, endDate, category }) {
  const params = {
    apikey: TM_API_KEY,
    city,
    startDateTime: startDate,
    endDateTime: endDate,
    classificationName: category,
    size: 20,
  };

  const response = await axios.get(`${BASE_URL}/events.json`, { params });
  const events = response.data._embedded?.events || [];

  return events.map((e) => ({
    id: `tm-${e.id}`,
    source: "ticketmaster",
    name: e.name,
    date: e.dates?.start?.localDate,
    time: e.dates?.start?.localTime,
    venue: e.venues?.[0]?.name,
    city: e.venues?.[0]?.city?.name,
    lat: e.venues?.[0]?.location?.latitude,
    lng: e.venues?.[0]?.location?.longitude,
    price: e.priceRanges?.[0]?.min || null,
    url: e.url,
    image: e.images?.[0]?.url,
    promoter: e.promoter?.name || null,
  }));
}

module.exports = { fetchEvents };