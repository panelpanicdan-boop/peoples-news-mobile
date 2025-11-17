// src/tabs/SettingsTab.js
// Settings: dark mode, ticker, mock monetization, live controls

import React from "react";

export default function SettingsTab({
  darkMode,
  setDarkMode,
  user,
  setUser,
  isLive,
  handleGoLive,
  stopLive,
  showTicker,
  setShowTicker,
  tickerMode,
  setTickerMode,
  tickerText,
  setTickerText,
}) {
  const monetized = user.verified; // simple flag

  function toggleVerified() {
    setUser({ ...user, verified: !user.verified });
  }

  function onModeChange(e) {
    const value = e.target.value;
    setTickerMode(value);
  }

  const isCustom = tickerMode === "custom";

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>Settings</h2>

      {/* Appearance */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Appearance</h3>
        <label style={styles.row}>
          <span>Dark mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </label>
      </div>

      {/* Ticker settings */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Ticker</h3>

        <label style={styles.row}>
          <span>Show ticker</span>
          <input
            type="checkbox"
            checked={showTicker}
            onChange={(e) => setShowTicker(e.target.checked)}
          />
        </label>

        <div style={{ marginTop: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Ticker source</label>
          <select
            value={tickerMode}
            onChange={onModeChange}
            style={styles.select}
          >
            <option value="stocks">Stocks</option>
            <option value="breaking">Breaking News</option>
            <option value="weather">Weather Alerts</option>
            <option value="traffic">Traffic Updates</option>
            <option value="local">Local Alerts</option>
            <option value="all">All Combined</option>
            <option value="custom">Custom Text</option>
          </select>
        </div>

        {isCustom && (
          <div style={{ marginTop: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Custom ticker text</label>
            <textarea
              value={tickerText}
              onChange={(e) => setTickerText(e.target.value)}
              placeholder="Enter your own ticker text..."
              style={styles.textArea}
            />
          </div>
        )}

        {!isCustom && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
              Preview:
            </div>
            <div style={styles.previewBox}>{tickerText}</div>
          </div>
        )}
      </div>

      {/* Monetization + verification */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Monetization (mock)</h3>

        <p style={styles.desc}>
          Verified reporters can earn from their uploads. This section is a mock of how
          ID verification and stats could look.
        </p>

        <button style={styles.primaryBtn} onClick={toggleVerified}>
          {monetized ? "Disable verification (mock)" : "Start verification (mock)"}
        </button>

        {monetized && (
          <div style={{ marginTop: 12 }}>
            <div style={styles.statsRow}>
              <span>Lifetime earnings</span>
              <strong>$1,240.50</strong>
            </div>
            <div style={styles.statsRow}>
              <span>Total views</span>
              <strong>84,320</strong>
            </div>
            <div style={styles.statsRow}>
              <span>Paid clips</span>
              <strong>32</strong>
            </div>
          </div>
        )}
      </div>

      {/* Live controls */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Live controls</h3>
        <p style={styles.desc}>
          Only verified users with an account age over 7 days can go live. This is a mock
          of how the toggle might behave.
        </p>
        {!isLive ? (
          <button style={styles.primaryBtn} onClick={handleGoLive}>
            Go live (mock)
          </button>
        ) : (
          <button style={styles.dangerBtn} onClick={stopLive}>
            Stop live (mock)
          </button>
        )}
      </div>

      {/* Account actions */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Account</h3>
        <p style={styles.desc}>These actions are mock-only in this prototype.</p>
        <div style={styles.rowButtons}>
          <button style={styles.secondaryBtn}>Change password (mock)</button>
          <button style={styles.secondaryBtn}>Sign out (mock)</button>
        </div>
        <button style={styles.dangerOutlineBtn}>Delete account (mock)</button>
      </div>
    </section>
  );
}

const styles = {
  page: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 14,
  },
  card: {
    padding: 14,
    marginBottom: 14,
    borderRadius: 14,
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(15,23,42,0.16)",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 8,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    marginTop: 4,
  },
  select: {
    width: "100%",
    marginTop: 4,
    padding: "6px 8px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },
  textArea: {
    width: "100%",
    marginTop: 4,
    minHeight: 60,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 13,
    resize: "vertical",
    fontFamily: "inherit",
  },
  previewBox: {
    padding: 8,
    borderRadius: 8,
    background: "#f3f4f6",
    fontSize: 12,
  },
  desc: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  primaryBtn: {
    marginTop: 4,
    padding: "8px 12px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#ec4899)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    fontSize: 13,
    cursor: "pointer",
  },
  dangerBtn: {
    marginTop: 4,
    padding: "8px 12px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  dangerOutlineBtn: {
    marginTop: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid #b91c1c",
    background: "transparent",
    color: "#b91c1c",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    marginTop: 4,
  },
  rowButtons: {
    display: "flex",
    gap: 8,
    marginTop: 6,
    marginBottom: 6,
    flexWrap: "wrap",
  },
};
