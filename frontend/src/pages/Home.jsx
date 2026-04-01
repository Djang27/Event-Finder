import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    navigate("/results", { state: { query } });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-2">EventNear</h1>
      <p className="text-gray-400 text-lg mb-8">
        Describe your ideal night. We'll find it.
      </p>
      <div className="w-full max-w-xl">
        <input
          className="w-full bg-gray-800 text-white rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. something chill and cheap this weekend..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Searching..." : "Find Events"}
        </button>
      </div>
    </div>
  );
}