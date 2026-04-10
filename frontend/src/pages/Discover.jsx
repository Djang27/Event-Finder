import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchEvents } from "../lib/api";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

export default function Discover() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGems() {
      try {
        const data = await searchEvents("local music arts comedy this week");
        // Filter out sports and show top scoring events
        const gems = (data.events || [])
          .filter((e) => e.gemScore >= 35)
          .filter((e) => !e.name.match(/vs\.|Lakers|Dodgers|Kings|Angels|Clippers|Galaxy|LAFC/i))
            .sort((a, b) => b.gemScore - a.gemScore);
        setEvents(gems);
      } catch (err) {
        setError("Couldn't load events. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchGems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Discover</h2>
              <p className="text-gray-400 mt-1">
                Hidden gems happening in Los Angeles this week
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Search instead
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Finding hidden gems near you...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-32">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition"
            >
              Go back
            </button>
          </div>
        )}

        {/* No gems */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-32">
            <p className="text-4xl mb-4">💎</p>
            <p className="text-white font-semibold text-lg mb-2">No hidden gems found today</p>
            <p className="text-gray-400 mb-6">Check back later or try searching for something specific.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition"
            >
              Search events
            </button>
          </div>
        )}

        {/* Gem grid */}
        {!loading && !error && events.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-4">
              {events.length} hidden gems found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}