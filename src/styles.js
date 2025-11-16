// src/styles.js
// Centralized reusable style objects for People's News Web Prototype
// Imported by App.js but also reusable by future components

export const colors = {
  lightBg: "#f2f4f7",
  darkBg: "#07101a",
  textLight: "#e6eef8",
  textDark: "#111",
  cardBg: "#ffffff",
  accent: "#007bff",
  adBorder: "#f0c",
};

export const common = {
  outlineBtnBase: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "transparent",
    cursor: "pointer",
  },

  card: {
    padding: 12,
    marginBottom: 12,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};

export const layout = {
  container: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
    paddingBottom: 140,
    maxWidth: 980,
    margin: "0 auto",
  },

  page: { paddingBottom: 20 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginTop: 8,
  },

  gridItem: {
    background: "#f7f7f7",
    borderRadius: 8,
    overflow: "hidden",
  },
};

export const nav = {
  bottomNav: {
    position: "fixed",
    left: 12,
    right: 12,
    bottom: 16,
    height: 68,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 12px 40px rgba(2,6,23,0.12)",
    backdropFilter: "blur(8px)",
    zIndex: 9999,
  },
  smallBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    color: "#111",
    cursor: "pointer",
  },
  navLabel: { fontSize: 11 },
};

export const header = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    background: "transparent",
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(4px)",
  },
};

export const liveStyles = {
  liveCard: {
    padding: 12,
    background: "#111",
    color: "#fff",
    borderRadius: 8,
  },
  gridSmall: {
    display: "flex",
    gap: 8,
  },
};

export const profile = {
  accountHeader: {
    display: "flex",
    alignItems: "center",
    padding: 12,
    background: "#fff",
    borderRadius: 10,
  },
  profilePic: {
    width: 86,
    height:
