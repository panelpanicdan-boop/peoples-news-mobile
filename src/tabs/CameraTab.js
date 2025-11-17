// src/tabs/CameraTab.js — StackBlitz‑compatible mock camera
// This version is 100% web-compatible (no React Native / Expo APIs)
// Users can "take" a fake photo, see a preview, and save it to the feed.

import React, { useState } from "react";

export default function CameraTab({ posts, setPosts }) {
  const [preview, setPreview] = useState(null);
  const [flash, setFlash] = useState(false);

  // Fake capture using a placeholder image
  function takePhoto() {
    setFlash(true);
    setTimeout(() => setFlash(false), 120);

    const img = `https://picsum.photos/seed/cam${Date.now()}/600/800`;
    setPreview(img);
  }

  function savePhoto() {
    if (!preview) return alert("Take a photo first.");

    const newPost = {
      id: "cam_" + Date.now(),
      user: "You",
      text: "Captured via camera",
      img: preview,
      views: 0,
    };

    setPosts([newPost, ...posts]);
    alert("Photo saved to your feed (mock)");
    setPreview(null);
  }

  return (
    <section style={styles.page}>
      {/* Flash overlay */}
      {flash && <div style={styles.flash}></div>}

      {/* Camera preview frame */}
      <div style={styles.frame}>
        <div style={styles.fakeView}>Camera Preview</div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        {/* Preview thumbnail */}
        <div style={styles.thumbBox}>
          {preview ? (
            <img src={preview} alt="preview" style={styles.thumb} />
          ) : (
            <div style={styles.thumbEmpty}>No photo</div>
          )}
        </div>

        {/* Shutter button */}
        <div style={styles.shutterOuter} onClick={takePhoto}>
          <div style={styles.shutterInner}></div>
        </div>

        {/* Save button */}
        <button style={styles.saveBtn} onClick={savePhoto}>
          Save
        </button>
      </div>
    </section>
  );
}

const styles = {
  page: { paddingBottom: 120, position: "relative" },

  frame: {
    width: "100%",
    height: "70vh",
    borderRadius: 18,
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  },
  fakeView: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 20,
    userSelect: "none",
  },

  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },

  thumbBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
    background: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
  },
  thumb: { width: "100%", height: "100%", objectFit: "cover" },
  thumbEmpty: { color: "#555" },

  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "white",
    border: "6px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },
  shutterInner: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "#e33",
  },

  saveBtn: {
    padding: "10px 16px",
    background: "linear-gradient(135deg,#4facfe,#00f2fe)",
    border: "none",
    borderRadius: 10,
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  flash: {
    position: "fixed",
    inset: 0,
    background: "rgba(255,255,255,0.9)",
    zIndex: 9999,
  },
};
