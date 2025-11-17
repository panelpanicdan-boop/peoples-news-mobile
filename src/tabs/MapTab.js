// src/tabs/MapTab.js
// Dark map showing where posts were created

import React, { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const fallbackCenter = [40.7357, -74.1724]; // Newark-ish default

const colorByCategory = {
  Traffic: "#f97316",
  Accident: "#ef4444",
  Weather: "#3b82f6",
  Event: "#22c55e",
  Update: "#6366f1",
};

export default function MapTab({ posts, setModalPost }) {
  const geoPosts = posts.filter((p) => typeof p.lat === "number" && typeof p.lng === "number");

  const center = useMemo(() => {
    if (!geoPosts.length) return fallbackCenter;
    const first = geoPosts[0];
    return [first.lat, first.lng];
  }, [geoPosts]);

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>Live Map</h2>
      <div style={styles.mapWrapper}>
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: "100%", width: "100%", borderRadius: 18 }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap contributors'
          />

          {geoPosts.map((p) => {
            const color = colorByCategory[p.cat || "Update"] || "#6366f1";
            return (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lng]}
                radius={10}
                color={color}
                weight={2}
                fillColor={color}
                fillOpacity={0.7}
                eventHandlers={{
                  click: () => {
                    if (p.img && typeof setModalPost === "function") {
                      setModalPost(p);
                    }
                  },
                }}
              >
                <Popup>
                  <div style={{ maxWidth: 220 }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.cat || "Update"}</div>
                    {p.img && (
                      <img
                        src={p.img}
                        alt="post"
                        style={{ width: "100%", borderRadius: 8, marginBottom: 6 }}
                      />
                    )}
                    <div style={{ fontSize: 13, marginBottom: 4 }}>{p.text}</div>
                    {p.location && (
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.location}</div>
                    )}
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>
                      {p.views ?? 0} views
                    </div>
                    {p.img && (
                      <button
                        style={styles.popupBtn}
                        onClick={() => setModalPost && setModalPost(p)}
                      >
                        View Post
                      </button>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
      <p style={styles.hint}>
        Pins show where posts were reported. Tap a pin to see details. Imagine you’re on a highway:
        open this map and tap pins along your route to see why traffic is stopped.
      </p>
    </section>
  );
}

const styles = {
  page: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 10,
  },
  mapWrapper: {
    height: "60vh",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 14px 32px rgba(15,23,42,0.45)",
    marginBottom: 10,
  },
  hint: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 6,
  },
  popupBtn: {
    marginTop: 6,
    padding: "6px 10px",
    fontSize: 12,
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#ec4899)",
    color: "#fff",
    cursor: "pointer",
  },
};
