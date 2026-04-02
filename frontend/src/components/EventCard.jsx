export default function EventCard({ event }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-950 transition-all duration-200 flex flex-col">
      {/* Image */}
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

        {/* Gem badge overlaid on image */}
        {event.isHiddenGem && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            💎 Hidden Gem
          </span>
        )}

        {/* Gem score overlaid on image */}
        <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-gray-300 text-xs px-2.5 py-1 rounded-full">
          {event.gemScore}/100
        </span>
      </div>

      {/* Content */}
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
          <p className="text-gray-400 text-sm">
            🎟️ {event.price ? `From $${event.price}` : "Price TBD"}
          </p>
        </div>

          <a
          href={event.url}
          target="_blank"
          rel="noreferrer"
          className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
        >
          Get Tickets
        </a>
      </div>
    </div>
  );
}