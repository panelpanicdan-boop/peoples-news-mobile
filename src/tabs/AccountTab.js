// src/tabs/AccountTab.js — Modern with mock photos + modal viewer + settings button

import React from "react";
import { FaCog } from "react-icons/fa";

export default function AccountTab({ user, posts, setModalPost, setTab }) {
  // Mock fallback posts (shown if user has no uploads)
  const mockDefaults = [
    { id: "m1", user: "You", img: "https://picsum.photos/seed/mock1/500", views: 23 },
    { id: "m2", user: "You", img: "https://picsum.photos/seed/mock2/500", views: 67 },
    { id: "m3", user: "You", img: "https://picsum.photos/seed/mock3/500", views: 12 },
    { id: "m4", user: "You", img: "https://picsum.photos/seed/mock4/500", views: 89 },
    { id: "m5", user: "You", img: "https://picsum.photos/seed/mock5/500", views: 15 },
    { id: "m6", user: "You", img: "https://picsum.photos/seed/mock6/500", views: 45 }
  ];

  // User's real posts
  const userPosts = posts.filter((p) => p.user === "You");

  // If no posts, use mock content
  const displayPosts = userPosts.length > 0 ? userPosts : mockDefaults;

  // Top 3 most viewed
  const top3 = [...displayPosts]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 3);

  return (
    <section style={styles.page}>
      
      {/* SETTINGS ICON (TOP RIGHT) */}
      <div style={styles.settingsIcon} onClick={() => setTab("settings")}>
        <FaCog size={22} />
      </div>

      {/* PROFILE HEADER */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}></div>

        <div style={styles.info}>
          <h2 style={styles.username}>{user.name}</h2>
          <div style={styles.bio}>{user.bio}</div>

          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <strong>{displayPosts.length}</strong>
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

      {/* TOP 3 MOST VIEWED */}
      <h3 style={styles.sectionTitle}>Top 3 Most Viewed</h3>
      <div style={styles.topRow}>
        {top3.map((p) => (
          <div key={p.id} style={styles.topItem}>
            <img
              src={p.img}
              style={styles.topImg}
              alt=""
              onClick={() => setModalPost(p)}
            />
            <div style={styles.overlay}>{p.views ?? 0} views</div>
          </div>
        ))}
      </div>

      {/* ALL POSTS GRID */}
      <h3 style={styles.sectionTitle}>All Uploads</h3>
      <div style={styles.grid}>
        {displayPosts.map((p) => (
          <img
            key={p.id}
            src={p.img}
            style={styles.gridImg}
            alt=""
            onClick={() => setModalPost(p)}
          />
        ))}
      </div>

    </section>
  );
}



const styles = {
  page: {
    paddingBottom: 30,
    position: "relative",
  },

  settingsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    background: "white",
    borderRadius: "50%",
    boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
    zIndex: 20,
  },

  profileCard: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    display: "flex",
    gap: 16,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#ccc",
  },

  info: {
    flex: 1,
  },

  username: {
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
  },

  bio: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
  },

  statsRow: {
    display: "flex",
    gap: 20,
  },

  statBox: {
    fontSize: 13,
    textAlign: "center",
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 700,
  },

  topRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },

  topItem: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 4px 15px rgba(0,0,0,0.22)",
    cursor: "pointer",
  },

  topImg: {
    width: "100%",
    height: 140,
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "6px 8px",
    background: "rgba(0,0,0,0.55)",
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 6,
  },

  gridImg: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    objectFit: "cover",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    cursor: "pointer",
  },
};
