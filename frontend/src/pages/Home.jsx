import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    navigate("/results", { state: { query } });
  }

  const suggestions = [
    "live music this week",
    "NBA games this week",
    "something chill and free this weekend",
    "comedy shows this week",
    "hidden local art shows",
    "outdoor concerts under $30",
    "jazz in a small venue",
    "something fun on Friday night",
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="mb-2 text-indigo-400 text-sm font-semibold tracking-widest uppercase">
          Los Angeles
        </div>
        <h1 className="text-6xl font-extrabold mb-3 tracking-tight">
          Event<span className="text-indigo-400">Near</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 text-center max-w-md">
          Describe your ideal night in plain English. We'll find the perfect event.
        </p>

        <div className="w-full max-w-2xl">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition"
              placeholder="e.g. something chill and cheap this weekend..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition text-lg"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-full transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 text-sm">
        Powered by Claude AI · Ticketmaster
      </p>
    </div>
  );
}