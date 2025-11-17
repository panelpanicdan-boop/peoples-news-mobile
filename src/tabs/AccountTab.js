// src/tabs/AccountTab.js — FULLY UPDATED WITH MODAL VIEWER + MODERN UI
import React from "react";

export default function AccountTab({ user, posts, setModalPost }) {
  // Filter user's own posts
  const userPosts = posts.filter((p) => p.user === "You");

  // Top 3 most viewed
  const top3 = [...userPosts]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 3);

  return (
    <section style={styles.page}>
      {/* PROFILE HEADER */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}></div>
        <div style={styles.info}>
          <h2 style={styles.username}>{user.name}</h2>
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

      {/* TOP 3 FEATURED */}
      <h3 style={styles.sectionTitle}>Top 3 Most Viewed</h3>
      <div style={styles.topRow}>
        {top3.map((p) => (
          <div key={p.id} style={styles.topItem}>
            <img
              src={p.img}
              alt="top"
              style={styles.topImg}
              onClick={() => setModalPost(p)}
            />
            <div style={styles.overlay}>{p.views ?? 0} views</div>
          </div>
        ))}
      </div>

      {/* ALL POSTS GRID */}
      <h3 style={styles.sectionTitle}>All Uploads</h3>
      <div style={styles.grid}>
        {userPosts.map((p) => (
          <img
            key={p.id}
            src={p.img}
            style={styles.gridImg}
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
    borderRadius: 999,
    background: "#ccc",
  },
  info: {
    flex: 1,
  },
  username: {
    margin: 0,
    fontSize: 20,
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
    textAlign: "center",
    fontSize: 13,
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
    position: "relative",
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  topImg: {
    width: "100%",
    height: 130,
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "6px 8px",
    fontSize: 12,
    background: "rgba(0,0,0,0.5)",
    color: "white",
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
    objectFit: "cover",
    borderRadius: 10,
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  },
};
