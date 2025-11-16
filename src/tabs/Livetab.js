// src/tabs/LiveTab.js
// Modern, clean Live tab for People's News
// Expects props: user, isLive, handleGoLive, stopLive
// This version has a polished modern UI with gradients, glass card, and badges.

import React from "react";

export default function LiveTab({ user, isLive, handleGoLive, stopLive }) {
  const canGoLive = () => {
    const ageDays = (Date.now() - user.joinedAt) / (1000 * 60 * 60 * 24);
    if (!user.verified) return false;
    if (ageDays < 7) return false;
    return true;
  };

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>Live Reporting</h2>

      <div style={styles.statusCard}>
        <div style={styles.liveHeaderRow}>
          <div style={styles.liveStatusText}>
            {isLive ? "You are LIVE" : "Go Live"}
          </div>
          <div style={isLive ? styles.liveBadge : styles.offBadge}>
            {isLive ? "LIVE" : "OFF"}
          </div>
        </div>

        {!isLive && (
          <p style={styles.description}>
            Broadcast breaking news directly to People’s News. Verified users with
            accounts older than 7 days can stream instantly.
          </p>
        )}

        {isLive && (
          <p style={styles.descriptionLive}>Your live stream is currently active.</p>
        )}

        {!isLive ? (
          <button
            style={canGoLive() ? styles.goLiveBtn : styles.disabledBtn}
            onClick={canGoLive() ? handleGoLive : undefined}
          >
            {user.verified
              ? "Start Live Broadcast"
              : "Verify Account to Go Live"}
          </button>
        ) : (
          <button style={styles.endLiveBtn} onClick={stopLive}>
            End Live
          </button>
        )}
      </div>

      <h3 style={styles.subHeader}>Currently Live</h3>
      <div style={styles.liveGrid}>
        {MOCK_LIVE.map((name) => (
          <div key={name} style={styles.liveCard}>
            <div style={styles.liveAvatar}></div>
            <div style={styles.liveName}>{name}</div>
            <div style={styles.liveMiniBadge}>LIVE</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Mock other live streamers
const MOCK_LIVE = ["ReporterA", "SkyCam 4", "NJ Weather Watch", "Studio Live"];

// Styles – more modern, rounded, smooth gradients and shadows
const styles = {
  page: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 16,
  },

  statusCard: {
    padding: 20,
    background: "rgba(255,255,255,0.7)",
    borderRadius: 16,
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    backdropFilter: "blur(10px)",
    marginBottom: 30,
  },

  liveHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  liveStatusText: {
    fontSize: 22,
    fontWeight: 700,
  },

  liveBadge: {
    padding: "6px 12px",
    background: "linear-gradient(135deg,#ff3b3b,#ff7b7b)",
    borderRadius: 12,
    color: "white",
    fontWeight: 700,
    fontSize: 12,
  },

  offBadge: {
    padding: "6px 12px",
    background: "rgba(0,0,0,0.07)",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 12,
    color: "#444",
  },

  description: {
    marginTop: 12,
    fontSize: 14,
    color: "#555",
    lineHeight: 1.5,
  },

  descriptionLive: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: 600,
    color: "#d60000",
  },

  goLiveBtn: {
    marginTop: 16,
    width: "100%",
    padding: "12px 16px",
    background: "linear-gradient(135deg,#ff5f6d,#ffc371)",
    border: "none",
    borderRadius: 12,
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(255,95,109,0.3)",
  },

  disabledBtn: {
    marginTop: 16,
    width: "100%",
    padding: "12px 16px",
    background: "#ccc",
    border: "none",
    borderRadius: 12,
    color: "#555",
    fontWeight: 600,
    cursor: "not-allowed",
    fontSize: 16,
  },

  endLiveBtn: {
    marginTop: 16,
    width: "100%",
    padding: "12px 16px",
    background: "#222",
    border: "none",
    borderRadius: 12,
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
  },

  subHeader: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
  },

  liveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 16,
  },

  liveCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 14,
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    position: "relative",
  },

  liveAvatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    background: "linear-gradient(135deg,#e2e2e2,#bfbfbf)",
    margin: "0 auto 8px",
  },

  liveName: {
    fontWeight: 700,
    marginBottom: 6,
  },

  liveMiniBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: "4px 8px",
    fontSize: 10,
    fontWeight: 700,
    borderRadius: 10,
    background: "linear-gradient(135deg,#ff3b3b,#ff7b7b)",
    color: "white",
  },
};
