const axios = require("axios");

const EB_API_KEY = process.env.EVENTBRITE_API_KEY;
const BASE_URL = "https://www.eventbriteapi.com/v3";

async function fetchEvents({ city, startDate, endDate }) {
  const params = {
    "location.address": city,
    "start_date.range_start": startDate,
    "start_date.range_end": endDate,
    expand: "venue,ticket_classes",
    token: EB_API_KEY,
  };

  const response = await axios.get(`${BASE_URL}/events/search/`, { params });
  const events = response.data.events || [];

  return events.map((e) => ({
    id: `eb-${e.id}`,
    source: "eventbrite",
    name: e.name?.text,
    date: e.start?.local?.split("T")[0],
    time: e.start?.local?.split("T")[1],
    venue: e.venue?.name,
    city: e.venue?.address?.city,
    lat: e.venue?.latitude,
    lng: e.venue?.longitude,
    price: e.ticket_classes?.[0]?.cost?.major_value || 0,
    url: e.url,
    image: e.logo?.url,
    promoter: null,
  }));
}

module.exports = { fetchEvents };