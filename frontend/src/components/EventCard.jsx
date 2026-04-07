import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function EventCard({ event }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function checkSaved() {
      const { data } = await supabase
        .from("saved_events")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_id", event.id)
        .single();
      if (data) setSaved(true);
    }
    checkSaved();
  }, [user, event.id]);

  async function toggleSave() {
    if (!user) return;
    setSaving(true);
    if (saved) {
      await supabase
        .from("saved_events")
        .delete()
        .eq("user_id", user.id)
        .eq("event_id", event.id);
      setSaved(false);
    } else {
      await supabase.from("saved_events").insert({
        user_id: user.id,
        event_id: event.id,
        event_name: event.name,
        event_date: event.date,
        event_time: event.time,
        venue: event.venue,
        image: event.image,
        url: event.url,
        gem_score: event.gemScore,
        is_hidden_gem: event.isHiddenGem,
      });
      setSaved(true);
    }
    setSaving(false);
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-950 transition-all duration-200 flex flex-col">
      <div className="relative">
        {event.image ? (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-44 object-cover"
          />
        ) : (
          <div className="w-full h-44 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600 text-sm">No image</span>
          </div>
        )}

        {event.isHiddenGem && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            💎 Hidden Gem
          </span>
        )}

        <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-gray-300 text-xs px-2.5 py-1 rounded-full">
          {event.gemScore}/100
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base leading-snug mb-3 line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-1.5 mb-4 flex-1">
          <p className="text-gray-400 text-sm">
            📅 {event.date}{event.time && ` · ${event.time.slice(0, 5)}`}
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
          {user && (
            <button
              onClick={toggleSave}
              disabled={saving}
              className={`px-3 py-2.5 rounded-xl text-sm transition border ${
                saved
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-white"
              }`}
            >
              {saved ? "★" : "☆"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}