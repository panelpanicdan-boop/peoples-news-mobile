// src/tabs/FeedTab.js — Premium feed using PostCard (image + text posts)

import React from "react";
import AdCard from "../components/AdCard";
import PostCard from "../components/PostCard";

const MOCK_TEXT_POSTS = [
  {
    id: "t1",
    user: "NJ Traffic Bot",
    cat: "Traffic",
    text: "Heavy congestion on I-280 Eastbound near Exit 12. Expect 20–25 min delays.",
    views: 842,
    type: "text",
  },
  {
    id: "t2",
    user: "Route 10 Watch",
    cat: "Traffic",
    text: "Disabled vehicle on Rt. 10 Westbound shoulder after Ridgedale Ave. Use caution.",
    views: 391,
    type: "text",
  },
];

export default function FeedTab({
  posts,
  feedMode,
  setFeedMode,
  setModalPost,
}) {
  // Combine mock text posts with real posts
  const combined = [...MOCK_TEXT_POSTS, ...posts];

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
        {combined.map((p) =>
          p.ad ? (
            <AdCard key={p.id} ad={p} />
          ) : (
            <PostCard
              key={p.id}
              post={p}
              onOpen={p.img ? () => setModalPost(p) : undefined}
            />
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
  toggleRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  modeBtn: {
    padding: "8px 18px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
  },
  modeActive: {
    padding: "8px 18px",
    background: "linear-gradient(135deg,#2563eb,#ec4899)",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
  },
};
