export default function EventCard({ event }) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-indigo-500 transition">
      {event.image && (
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        {event.isHiddenGem && (
          <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
            💎 Hidden Gem
          </span>
        )}

        <h3 className="text-white font-bold text-lg leading-tight mb-1">
          {event.name}
        </h3>

        <p className="text-gray-400 text-sm mb-1">
          📅 {event.date} {event.time && `at ${event.time.slice(0, 5)}`}
        </p>

        {event.venue && (
          <p className="text-gray-400 text-sm mb-1">📍 {event.venue}</p>
        )}

        <p className="text-gray-400 text-sm mb-3">
          🎟️ {event.price ? `From $${event.price}` : "Price TBD"}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Gem score: {event.gemScore}/100
          </span>
          
            <a href={event.url}
            target="_blank"
            rel="noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
}