import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon bug in Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function gemIcon(isHiddenGem) {
  return L.divIcon({
    className: "",
    html: `<div style="
      background: ${isHiddenGem ? "#6366f1" : "#4b5563"};
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export default function MapView({ events }) {
  const eventsWithLocation = events.filter((e) => e.lat && e.lng);

  if (eventsWithLocation.length === 0) return null;

  const center = [
    parseFloat(eventsWithLocation[0].lat),
    parseFloat(eventsWithLocation[0].lng),
  ];

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden mb-8">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {eventsWithLocation.map((event) => (
          <Marker
            key={event.id}
            position={[parseFloat(event.lat), parseFloat(event.lng)]}
            icon={gemIcon(event.isHiddenGem)}
          >
            <Popup>
              <div style={{ minWidth: "150px" }}>
                <strong>{event.name}</strong>
                <br />
                {event.date} {event.time?.slice(0, 5)}
                <br />
                {event.venue}
                <br />
                {event.isHiddenGem && (
                  <span style={{ color: "#6366f1" }}>💎 Hidden Gem</span>
                )}
                <br />
                <a href={event.url} target="_blank" rel="noreferrer">
                  Get Tickets
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}