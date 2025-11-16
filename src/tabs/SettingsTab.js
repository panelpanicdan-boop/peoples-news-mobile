// src/tabs/SettingsTab.js
// Modern, polished Settings tab for People's News
// Includes:
// • Monetization application
// • ID + address verification flow
// • Lifetime stats (earnings, views, uploads)
// • Light/Dark mode toggle
// • Live eligibility panel
// Very modern UI with glass cards, gradients, and clean typography.

import React, { useState } from "react";

export default function SettingsTab({
  darkMode,
  setDarkMode,
  user,
  setUser,
  isLive,
  handleGoLive,
  stopLive,
}) {
  const [isMonetized, setIsMonetized] = useState(false);
  const [stats] = useState({
    earnings: 152.75,
    views: 12840,
    uploads: 42,
  });

  function verifyIdentity() {
    setUser({ ...user, verified: true });
    alert("Identity verified (mock)");
  }

  function verifyAddress() {
    alert("Address verified (mock)");
  }

  const accountAgeDays = Math.floor(
    (Date.now() - user.joinedAt) / (1000 * 60 * 60 * 24)
  );

  const canGoLive = user.verified && accountAgeDays >= 7;

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>Settings</h2>

      {/* ---- Monetization Card ---- */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Monetization</h3>

        {!isMonetized ? (
          <button style={styles.applyBtn} onClick={() => setIsMonetized(true)}>
            Apply for Monetization
          </button>
        ) : (
          <div style={styles.sectionColumn}>
            <button style={styles.actionBtn} onClick={verifyIdentity}>
              Verify Identity
            </button>
            <button style={styles.actionBtn} onClick={verifyAddress}>
              Verify Address
            </button>
            <button style={styles.statsBtn}>
              Lifetime Earnings: ${stats.earnings}
            </button>
            <button style={styles.statsBtn}>
              Total Views: {stats.views.toLocaleString()}
            </button>
            <button style={styles.statsBtn}>Total Uploads: {stats.uploads}</button>
          </div>
        )}
      </div>

      {/* ---- Appearance ---- */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Appearance</h3>
        <button style={styles.themeToggle} onClick={() => setDarkMode(!darkMode)}>
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* ---- Live Controls ---- */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Live Access</h3>

        <div style={styles.liveInfoRow}>
          <span style={styles.liveLabel}>Account Age:</span>
          <span style={styles.liveValue}>{accountAgeDays} days</span>
        </div>

        <div style={styles.liveInfoRow}>
          <span style={styles.liveLabel}>Verified:</span>
          <span style={styles.liveValue}>{user.verified ? "Yes" : "No"}</span>
        </div>

        {!isLive ? (
          <button
            style={canGoLive ? styles.goLiveBtn : styles.disabledBtn}
            onClick={canGoLive ? handleGoLive : undefined}
          >
            {canGoLive
              ? "Start Live Broadcast"
              : "Verify + Wait 7 Days to Go Live"}
          </button>
        ) : (
          <button style={styles.endLiveBtn} onClick={stopLive}>
            End Live
          </button>
        )}
      </div>
    </section>
  );
}

// ------------------ Styles ------------------
const styles = {
  page: {
    paddingBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 18,
  },

  card: {
    background: "rgba(255,255,255,0.75)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 26,
    boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
    backdropFilter: "blur(10px)",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 14,
  },

  /* ---- Buttons ---- */
  applyBtn: {
    width: "100%",
    padding: "12px 16px",
    background: "linear-gradient(135deg,#4facfe,#00f2fe)",
    borderRadius: 12,
    border: "none",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
  },

  actionBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
    cursor: "pointer",
    fontWeight: 600,
  },

  statsBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    background: "#f7f7f7",
    border: "none",
    textAlign: "left",
    fontWeight: 600,
    cursor: "pointer",
  },

  themeToggle: {
    padding: "10px 14px",
    borderRadius: 12,
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  },

  /* ---- Layout helpers ---- */
  sectionColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  liveInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 14,
  },

  liveLabel: {
    color: "#555",
  },

  liveValue: {
    fontWeight: 700,
  },

  /* ---- Live Buttons ---- */
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
    borderRadius: 12,
    color: "#555",
    fontWeight: 600,
    cursor: "not-allowed",
  },

  endLiveBtn: {
    marginTop: 16,
    width: "100%",
    padding: "12px 16px",
    background: "#111",
    borderRadius: 12,
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
  },
};
