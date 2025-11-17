// PREMIUM FEEDTAB.JS — OVERLAY AD REMOVED, PREMIUM UI, SMOOTH EFFECTS
// Drop-in replacement for your current FeedTab.js

import React from "react";
import AdCard from "../components/AdCard";

export default function FeedTab({ posts, feedMode, setFeedMode, setModalPost }) {
  return (
    <section style={styles.page}>
      {/* FEED MODE SWITCH */}
      <div style={styles.toggleRow}>
        <button
          style={feedMode === "following" ? styles.modeActive : styles.modeBtn}
          onClick={() => setFeedMode("following")}
        >
          Following
        </button>
        <button
          style={feedMode === "interested" ? styles.modeActive : styles.modeBtn}
          onClick={() => setFeedMode("interested")}
        >
          Interested
        </button>
      </div>

      {/* FEED LIST */}
      <div>
        {posts.map((p) =>
          p.ad ? (
            <AdCard key={p.id} ad={p} />
          ) : (
            <div
              key={p.id}
              style={styles.card}
              onClick={() => setModalPost(p)}
            >
              <img src={p.img} alt="post" style={styles.img} />
              <div style={styles.cardBody}>
                <div style={styles.user}>{p.user}</div>
                <div style={styles.text}>{p.text}</div>
                <div style={styles.stats}>Views: {p.views ?? 0}</div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

const styles = {
  page: {
    paddingBottom: 40,
    paddingTop: 10,
  },

  // --- FEED MODE SWITCH ---
  toggleRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  modeBtn: {
    padding: "8px 18px",
    background: "#e4e7eb",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.25s",
  },
  modeActive: {
    padding: "8px 18px",
    background: "linear-gradient(135deg,#0077ff,#00c2ff)",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
    transition: "0.25s",
  },

  // --- POST CARD ---
  card: {
    background: "white",
    borderRadius: 18,
    marginBottom: 22,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  img: {
    width: "100%",
    height: 260,
    objectFit: "cover",
  },

  cardBody: {
    padding: 14,
  },

  user: {
    fontWeight: 800,
    marginBottom: 6,
    fontSize: 15,
  },

  text: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 1.4,
  },

  stats: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 500,
  },
};
