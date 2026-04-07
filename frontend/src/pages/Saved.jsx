import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Saved() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }

    async function fetchSaved() {
      const { data } = await supabase
        .from("saved_events")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setEvents(data || []);
      setLoading(false);
    }
    fetchSaved();
  }, [user]);

  async function unsave(eventId) {
    await supabase
      .from("saved_events")
      .delete()
      .eq("user_id", user.id)
      .eq("event_id", eventId);
    setEvents(events.filter((e) => e.event_id !== eventId));
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6">Saved Events</h2>

        {loading && (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-400 mb-4">No saved events yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition"
            >
              Find Events
            </button>
          </div>
        )}

        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.event_name}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  {event.is_hidden_gem && (
                    <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2 w-fit">
                      💎 Hidden Gem
                    </span>
                  )}
                  <h3 className="text-white font-bold text-base leading-snug mb-3 line-clamp-2">
                    {event.event_name}
                  </h3>
                  <div className="space-y-1.5 mb-4 flex-1">
                    <p className="text-gray-400 text-sm">
                      📅 {event.event_date}{event.event_time && ` · ${event.event_time.slice(0, 5)}`}
                    </p>
                    {event.venue && (
                      <p className="text-gray-400 text-sm truncate">
                        📍 {event.venue}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 block text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
                    >
                      View Details
                    </a>
                    <button
                      onClick={() => unsave(event.event_id)}
                      className="px-3 py-2.5 rounded-xl text-sm transition border bg-gray-800 border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}