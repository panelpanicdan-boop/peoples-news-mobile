// src/tabs/FeedTab.js — FULLY UPDATED FOR MODAL VIEWER
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
        {posts.map((p) => (
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
        ))}
      </div>
    </section>
  );
}

const styles = {
  page: {
    paddingBottom: 30,
  },
  toggleRow: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  modeBtn: {
    padding: "8px 16px",
    background: "#ddd",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  modeActive: {
    padding: "8px 16px",
    background: "#0077ff",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
  },
  card: {
    background: "white",
    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: 240,
    objectFit: "cover",
  },
  cardBody: {
    padding: 12,
  },
  user: {
    fontWeight: 700,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  stats: {
    fontSize: 12,
    color: "#777",
  },
};
