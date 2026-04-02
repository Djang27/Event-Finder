import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchEvents } from "../lib/api";
import EventCard from "../components/EventCard";
import MapView from "../components/MapView";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) { navigate("/"); return; }
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

  const gemCount = events.filter((e) => e.isHiddenGem).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1"
        >
          ← EventNear
        </button>
        {!loading && (
          <span className="text-gray-500 text-sm">
            {events.length} events · {gemCount} hidden gems
          </span>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Query display */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-1">You searched for</p>
          <h2 className="text-2xl font-bold">"{query}"</h2>
          {filters && !loading && (
            <div className="flex flex-wrap gap-2 mt-3">
              {filters.city && (
                <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                  📍 {filters.city}
                </span>
              )}
              {filters.mood && (
                <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                  ✨ {filters.mood}
                </span>
              )}
              {filters.maxPrice && (
                <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                  💰 Under ${filters.maxPrice}
                </span>
              )}
              {filters.preferHiddenGems && (
                <span className="bg-indigo-900 text-indigo-300 text-xs px-3 py-1 rounded-full">
                  💎 Hidden gems mode
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Finding the best events for you...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-32">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition"
            >
              Try again
            </button>
          </div>
        )}

        {/* Map */}
        {!loading && !error && events.length > 0 && (
          <div className="mb-8">
            <MapView events={events} />
          </div>
        )}

        {/* Event grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-400 mb-4">No events found for that search.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition"
            >
              Try a different search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}