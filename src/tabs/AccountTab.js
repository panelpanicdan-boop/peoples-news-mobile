// src/tabs/AccountTab.js
// Modern Instagram‑style profile tab for People’s News
// Features:
// • Hero profile header (avatar, name, bio, badges)
// • Modern follower / following buttons
// • Dynamic "Top 3 Most Viewed" carousel grid (auto-updated)
// • Clean upload grid for all posts
// • Smooth styling + pro card layout

import React, { useMemo } from "react";

export default function AccountTab({ user, posts }) {
  // Filter posts that belong to this user
  const userPosts = posts.filter(
    (p) => p.user === "You" || (user.uploads && user.uploads.includes(p.id))
  );

  // Get top 3 most‑viewed posts (auto‑updating)
  const top3 = useMemo(() => {
    return [...userPosts]
      .filter((p) => p.views !== undefined)
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  }, [userPosts]);

  return (
    <section style={styles.page}>
      {/* ---- Profile Header ---- */}
      <div style={styles.profileCard}>
        <div style={styles.profileRow}>
          <div style={styles.avatar}></div>

          <div style={{ flex: 1, marginLeft: 18 }}>
            <div style={styles.usernameRow}>
              <h2 style={styles.username}>{user.name}</h2>
              {user.verified && <div style={styles.verifyBadge}>✔ Verified</div>}
            </div>

            <div style={styles.bio}>{user.bio}</div>

            <div style={styles.statsRow}>
              <div style={styles.statBox}>
                <strong>{userPosts.length}</strong>
                <span>Posts</span>
              </div>
              <div style={styles.statBox}>
                <strong>{user.followers}</strong>
                <span>Followers</span>
              </div>
              <div style={styles.statBox}>
                <strong>{user.following}</strong>
                <span>Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Top 3 section ---- */}
      <h3 style={styles.sectionTitle}>Top 3 Most Viewed</h3>
      <div style={styles.top3Grid}>
        {top3.map((p) => (
          <div key={p.id} style={styles.top3Item}>
            {p.img ? (
              <img src={p.img} alt="top" style={styles.top3Image} />
            ) : (
              <div style={styles.noMedia}>No media</div>
            )}
            <div style={styles.top3Overlay}>{p.views} views</div>
          </div>
        ))}
        {top3.length === 0 && (
          <div style={{ color: "#777", fontSize: 14 }}>No uploads yet.</div>
        )}
      </div>

      {/* ---- All uploads grid ---- */}
      <h3 style={styles.sectionTitle}>All Uploads</h3>
      <div style={styles.uploadGrid}>
        {userPosts.length === 0 && (
          <div style={{ color: "#777", fontSize: 14 }}>No uploads yet.</div>
        )}

        {userPosts.map((p) => (
          <div key={p.id} style={styles.uploadItem}>
            {p.img ? (
              <img src={p.img} alt="upload" style={styles.uploadImage} />
            ) : (
              <div style={styles.noMedia}>No media</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ------------------- Styles -------------------
const styles = {
  page: {
    paddingBottom: 30,
  },

  /* ---- Profile Card ---- */
  profileCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: 28,
  },

  profileRow: {
    display: "flex",
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 999,
    background: "linear-gradient(135deg,#d9d9d9,#bfbfbf)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  usernameRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  username: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
  },

  verifyBadge: {
    padding: "4px 10px",
    background: "linear-gradient(135deg,#4facfe,#00f2fe)",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
  },

  bio: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },

  statsRow: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 260,
  },

  statBox: {
    textAlign: "center",
    fontSize: 13,
    color: "#444",
  },

  /* ---- Top 3 Grid ---- */
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
  },

  top3Grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginBottom: 28,
  },

  top3Item: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
  },

  top3Image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  top3Overlay: {
    position: "absolute",
    bottom: 6,
    left: 6,
    padding: "4px 8px",
    borderRadius: 8,
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },

  noMedia: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
    color: "#777",
    fontSize: 13,
    padding: 10,
  },

  /* ---- All uploads grid ---- */
  uploadGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
  },

  uploadItem: {
    borderRadius: 10,
    overflow: "hidden",
    background: "#fafafa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },

  uploadImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
