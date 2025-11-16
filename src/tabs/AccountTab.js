// src/tabs/AccountTab.js — Modern, aesthetic, interactive profile
import React, { useMemo, useState } from "react";

export default function AccountTab({ user, setUser, posts }) {
  // If user has no posts, fill with mock content so it still looks alive
  const mockExtras = [
    {
      id: "m1",
      img: "https://picsum.photos/seed/ac1/400/300",
      views: 1200,
      isVideo: true,
    },
    {
      id: "m2",
      img: "https://picsum.photos/seed/ac2/400/300",
      views: 980,
      isVideo: false,
    },
    {
      id: "m3",
      img: "https://picsum.photos/seed/ac3/400/300",
      views: 760,
      isVideo: true,
    },
    {
      id: "m4",
      img: "https://picsum.photos/seed/ac4/400/300",
      views: 420,
      isVideo: false,
    },
    {
      id: "m5",
      img: "https://picsum.photos/seed/ac5/400/300",
      views: 333,
      isVideo: true,
    },
  ];

  const userPostsRaw = posts.filter(
    (p) => p.user === "You" || (user.uploads && user.uploads.includes(p.id))
  );

  const userPosts =
    userPostsRaw.length === 0
      ? mockExtras
      : userPostsRaw.map((p, i) => ({
          ...p,
          isVideo: i % 3 === 0, // just for demo, pretend some are videos
        }));

  // Top 3 most-viewed posts (auto-updating)
  const top3 = useMemo(() => {
    return [...userPosts]
      .filter((p) => typeof p.views === "number")
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  }, [userPosts]);

  // Modal for enlarged post
  const [selectedPost, setSelectedPost] = useState(null);

  function openPost(post) {
    if (!post || !post.img) return;
    setSelectedPost(post);
  }

  function closeModal() {
    setSelectedPost(null);
  }

  // Simple profile editing (name + bio)
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio || "");

  function saveProfile() {
    setUser({
      ...user,
      name: editName,
      bio: editBio,
    });
    setEditing(false);
  }

  return (
    <section style={styles.page}>
      {/* Profile header */}
      <div style={styles.profileCard}>
        <div style={styles.profileRow}>
          <div style={styles.avatar}></div>

          <div style={{ flex: 1, marginLeft: 18 }}>
            <div style={styles.usernameRow}>
              {!editing ? (
                <>
                  <h2 style={styles.username}>{user.name}</h2>
                  {user.verified && (
                    <div style={styles.verifyBadge}>✔ Verified</div>
                  )}
                </>
              ) : (
                <input
                  style={styles.usernameInput}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              )}
            </div>

            {!editing ? (
              <div style={styles.bio}>{user.bio}</div>
            ) : (
              <textarea
                style={styles.bioInput}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
              />
            )}

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

            <div style={styles.profileButtons}>
              {!editing ? (
                <button
                  style={styles.editBtn}
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={styles.saveBtn} onClick={saveProfile}>
                    Save
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => {
                      setEditing(false);
                      setEditName(user.name);
                      setEditBio(user.bio || "");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Highlight circles (like IG stories, but news themed) */}
      <div style={styles.highlightsRow}>
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} style={styles.highlightItem}>
            <div style={styles.highlightCircle}></div>
            <div style={styles.highlightLabel}>{h.label}</div>
          </div>
        ))}
      </div>

      {/* Top 3 grid */}
      <h3 style={styles.sectionTitle}>Top 3 Most Viewed</h3>
      <div style={styles.top3Grid}>
        {top3.map((p) => (
          <div key={p.id} style={styles.top3Item} onClick={() => openPost(p)}>
            <img src={p.img} alt="top" style={styles.top3Image} />
            <div style={styles.top3Overlay}>
              {p.views ?? 0} views {p.isVideo ? "· Video" : ""}
            </div>
          </div>
        ))}
        {top3.length === 0 && (
          <div style={{ color: "#777", fontSize: 14 }}>No uploads yet.</div>
        )}
      </div>

      {/* All uploads grid */}
      <h3 style={styles.sectionTitle}>All Uploads</h3>
      <div style={styles.uploadGrid}>
        {userPosts.length === 0 && (
          <div style={{ color: "#777", fontSize: 14 }}>No uploads yet.</div>
        )}

        {userPosts.map((p) => (
          <div
            key={p.id}
            style={styles.uploadItem}
            onClick={() => openPost(p)}
          >
            <img src={p.img} alt="upload" style={styles.uploadImage} />
            {p.isVideo && <div style={styles.playBadge}>▶</div>}
          </div>
        ))}
      </div>

      {/* Modal viewer */}
      {selectedPost && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalMediaWrapper}>
              <img
                src={selectedPost.img}
                alt="enlarged"
                style={styles.modalImage}
              />
            </div>
            <div style={styles.modalMeta}>
              <div style={{ fontWeight: 700 }}>
                {selectedPost.views ?? 0} views{" "}
                {selectedPost.isVideo ? "· Video" : ""}
              </div>
              <div style={{ fontSize: 13, color: "#ccc", marginTop: 4 }}>
                Tap outside to close
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Static highlight data
const HIGHLIGHTS = [
  { label: "Traffic" },
  { label: "Weather" },
  { label: "Local Events" },
  { label: "Emergencies" },
];

// ------------------- Styles -------------------
const styles = {
  page: { paddingBottom: 30 },

  profileCard: {
    background: "#fff",
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
    boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
    backdropFilter: "blur(10px)",
  },

  profileRow: { display: "flex", alignItems: "center" },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    background: "linear-gradient(135deg,#e3e3e3,#c7c7c7)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  },

  usernameRow: { display: "flex", alignItems: "center", gap: 10 },

  username: { margin: 0, fontSize: 24, fontWeight: 900 },

  usernameInput: {
    fontSize: 20,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.25)",
  },

  verifyBadge: {
    padding: "4px 10px",
    background: "linear-gradient(135deg,#4facfe,#00f2fe)",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
  },

  bio: { marginTop: 6, fontSize: 14, color: "#444" },

  bioInput: {
    width: "100%",
    minHeight: 50,
    marginTop: 6,
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.2)",
    padding: 8,
    resize: "vertical",
  },

  statsRow: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 260,
  },

  statBox: { textAlign: "center", fontSize: 13, color: "#444" },

  profileButtons: {
    marginTop: 16,
  },

  editBtn: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },

  saveBtn: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg,#4facfe,#00f2fe)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },

  cancelBtn: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "none",
    background: "#eee",
    cursor: "pointer",
    fontWeight: 600,
  },

  // Highlights
  highlightsRow: {
    display: "flex",
    gap: 18,
    marginBottom: 26,
    overflowX: "auto",
    paddingBottom: 6,
  },

  highlightItem: { textAlign: "center", minWidth: 70 },

  highlightCircle: {
    width: 56,
    height: 56,
    borderRadius: 999,
    background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    margin: "0 auto 6px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
  },

  highlightLabel: { fontSize: 11, color: "#444" },

  // Sections
  sectionTitle: { fontSize: 18, fontWeight: 700, marginBottom: 12 },

  // Top 3
  top3Grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginBottom: 26,
  },

  top3Item: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 10px 28px rgba(0,0,0,0.20)",
    cursor: "pointer",
  },

  top3Image: { width: "100%", height: "100%", objectFit: "cover" },

  top3Overlay: {
    position: "absolute",
    bottom: 6,
    left: 6,
    padding: "4px 8px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.55)",
    color: "white",
    fontSize: 12,
    fontWeight: 800,
  },

  // All uploads
  uploadGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },

  uploadItem: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },

  uploadImage: { width: "100%", height: "100%", objectFit: "cover" },

  playBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.65)",
    color: "white",
    fontSize: 12,
    fontWeight: 800,
  },

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
  },

  modalContent: {
    maxWidth: "90vw",
    maxHeight: "90vh",
    borderRadius: 18,
    background: "rgba(10,10,10,0.9)",
    boxShadow: "0 0 40px rgba(255,255,255,0.25)",
    overflow: "hidden",
  },

  modalMediaWrapper: {
    maxHeight: "80vh",
  },

  modalImage: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "80vh",
    objectFit: "contain",
  },

  modalMeta: {
    padding: 12,
    borderTop: "1px solid rgba(255,255,255,0.1)",
    fontSize: 14,
    color: "#f5f5f5",
  },
};
