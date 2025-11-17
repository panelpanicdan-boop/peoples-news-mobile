// src/components/AdCard.js
import React from "react";

export default function AdCard({ ad }) {
  return (
    <div style={styles.card}>
      <img src={ad.img} alt="ad" style={styles.img} />
      <div style={styles.body}>
        <div style={styles.brand}>{ad.brand}</div>
        <div style={styles.text}>{ad.text}</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  },
  img: {
    width: "100%",
    height: 180,
    objectFit: "cover",
  },
  body: {
    padding: 12,
  },
  brand: {
    fontWeight: 900,
    fontSize: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#444",
  },
};
