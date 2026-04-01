import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchEvents } from "../lib/api";
import EventCard from "../components/EventCard";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }

    async function fetchResults() {
      try {
        const data = await searchEvents(query);
        setEvents(data.events || []);
        setFilters(data.filters || null);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-white text-sm mb-4 inline-block transition"
        >
          Back to search
        </button>
        <h2 className="text-3xl font-bold">Results</h2>
        {filters && (
          <p className="text-gray-400 mt-1">
            Showing events in {filters.city}
            {filters.mood && ` · ${filters.mood}`}
            {filters.maxPrice && ` · under $${filters.maxPrice}`}
          </p>
        )}
      </div>

      {loading && (
        <div className="text-center text-gray-400 mt-20 text-lg">
          Finding events for you...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 mt-20">{error}</div>
      )}

      {!loading && !error && (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No events found. Try a different search!
        </div>
      )}
    </div>
  );
}