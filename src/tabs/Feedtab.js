// src/tabs/FeedTab.js
// Clean modular Feed tab for People's News
// This file replaces the inline Feed component in App.js
// It expects props: feedItems, feedMode, setFeedMode

import React from "react";

export default function FeedTab({ feedItems, feedMode, setFeedMode, PostCard, AdCard }) {
  const outlineBtnBase = {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "transparent",
    cursor: "pointer",
  };

  return (
    <section>
      <div style={styles.feedHeader}>
        <div>
          <button
            style={{
              ...outlineBtnBase,
              marginRight: 8,
              borderColor: feedMode === "following" ? "#007bff" : "rgba(0,0,0,0.12)",
            }}
            onClick={() => setFeedMode("following")}
          >
            Following
          </button>

          <button
            style={{
              ...outlineBtnBase,
              borderColor: feedMode === "interested" ? "#007bff" : "rgba(0,0,0,0.12)",
            }}
            onClick={() => setFeedMode("interested")}
          >
            Interested
          </button>
        </div>

        <div style={{ fontSize: 13 }}>
          {feedItems.filter((f) => !f.ad).length} posts
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {feedItems.map((item) => (
          item.ad ? (
            <AdCard key={item.id} ad={item} />
          ) : (
            <PostCard key={item.id} post={item} />
          )
        ))}
      </div>
    </section>
  );
}

// Local styles for this tab (kept minimal so App.js styles still apply)
const styles = {
  feedHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
