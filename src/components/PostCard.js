// src/components/PostCard.js
// Premium post card supporting image posts + text-only posts (option B)

import React from "react";

export default function PostCard({ post, onOpen }) {
  const isTextOnly = !post.img; // text-only if no image
  const category = post.cat || "Update";

  const colorByCategory = {
    Traffic: "#f97316",
    Accident: "#ef4444",
    Weather: "#3b82f6",
    Event: "#22c55e",
    Update: "#6366f1",
  };

  const catColor = colorByCategory[category] || "#6366f1";

  const clickable = !!post.img && typeof onOpen === "function";

  const cardStyle = isTextOnly
    ? {
        ...styles.cardBase,
        ...styles.textCard,
        borderLeft: `4px solid ${catColor}`,
      }
    : {
        ...styles.cardBase,
        ...styles.mediaCard,
      };

  return (
    <article
      style={cardStyle}
      onClick={clickable ? () => onOpen(post) : undefined}
    >
      {/* IMAGE POST */}
      {!isTextOnly && (
        <>
          <div style={styles.mediaWrapper}>
            <img src={post.img} alt="post" style={styles.media} />
            <div style={{ ...styles.catPill, backgroundColor: catColor }}>
              {category}
            </div>
          </div>
          <div style={styles.body}>
            <div style={styles.userRow}>
              <span style={styles.userName}>{post.user}</span>
            </div>
            <div style={styles.text}>{post.text}</div>
            <div style={styles.footerRow}>
              <span style={styles.views}>Views: {post.views ?? 0}</span>
            </div>
          </div>
        </>
      )}

      {/* TEXT-ONLY POST */}
      {isTextOnly && (
        <div style={styles.bodyTextOnly}>
          <div style={styles.userRow}>
            <span style={styles.userName}>{post.user}</span>
            <span style={{ ...styles.catChip, borderColor: catColor, color: catColor }}>
              {category}
            </span>
          </div>
          <div style={styles.textOnly}>{post.text}</div>
          <div style={styles.footerRow}>
            <span style={styles.views}>Views: {post.views ?? 0}</span>
          </div>
        </div>
      )}
    </article>
  );
}

const styles = {
  cardBase: {
    borderRadius: 18,
    marginBottom: 18,
    boxShadow: "0 10px 24px rgba(15,23,42,0.18)",
    overflow: "hidden",
    background: "#ffffff",
    cursor: "pointer",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  mediaCard: {
    // same base, just reserved in case we want variations later
  },
  textCard: {
    padding: 0,
  },
  mediaWrapper: {
    position: "relative",
  },
  media: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    display: "block",
  },
  catPill: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
  },
  body: {
    padding: 12,
  },
  bodyTextOnly: {
    padding: 12,
  },
  userRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontWeight: 800,
    fontSize: 14,
  },
  catChip: {
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
  },
  text: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  textOnly: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  footerRow: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  views: {
    fontWeight: 500,
  },
};
