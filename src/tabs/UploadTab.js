// src/tabs/UploadTab.js — Upload photo OR text-only posts

import React, { useState } from "react";

export default function UploadTab({ posts, setPosts }) {
  const [mode, setMode] = useState("photo"); // "photo" or "text"
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile({
      url: URL.createObjectURL(f),
      type: f.type,
      name: f.name,
    });
  }

  function submit() {
    if (!desc && mode === "text") {
      return alert("Please enter some text for your update.");
    }

    // TEXT-ONLY MODE
    if (mode === "text") {
      const newPost = {
        id: "txt_" + Date.now(),
        user: "You",
        cat: "Update",
        text: desc || "(no description)",
        views: 0,
        type: "text",
      };
      setPosts([newPost, ...posts]);
      setDesc("");
      alert("Text update posted (mock)");
      return;
    }

    // PHOTO MODE
    if (mode === "photo") {
      if (!file) return alert("Please select an image to upload.");

      const newPost = {
        id: "img_" + Date.now(),
        user: "You",
        cat: "Event",
        text: desc || "(no description)",
        img: file.url,
        views: 0,
      };
      setPosts([newPost, ...posts]);
      setDesc("");
      setFile(null);
      alert("Photo uploaded (mock)");
      return;
    }
  }

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>Upload</h2>

      {/* MODE TOGGLE */}
      <div style={styles.modeRow}>
        <button
          style={mode === "photo" ? styles.modeActive : styles.modeBtn}
          onClick={() => setMode("photo")}
        >
          Photo
        </button>
        <button
          style={mode === "text" ? styles.modeActive : styles.modeBtn}
          onClick={() => setMode("text")}
        >
          Text only
        </button>
      </div>

      <div style={styles.card}>
        <label style={styles.label}>Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={
            mode === "text"
              ? "Type your traffic, weather, or local news update..."
              : "Describe what happened..."
          }
          style={styles.textArea}
        />

        {mode === "photo" && (
          <>
            <div style={{ marginTop: 10 }}>
              <input type="file" accept="image/*" onChange={handleFile} />
            </div>

            {file && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={file.url}
                  alt="preview"
                  style={{ width: "100%", borderRadius: 10 }}
                />
              </div>
            )}
          </>
        )}

        <button style={styles.submitBtn} onClick={submit}>
          Post
        </button>
      </div>
    </section>
  );
}

const styles = {
  page: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 14,
  },
  modeRow: {
    display: "flex",
    gap: 10,
    marginBottom: 14,
  },
  modeBtn: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    cursor: "pointer",
    fontWeight: 600,
  },
  modeActive: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#ec4899)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
  },
  card: {
    padding: 16,
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 24px rgba(15,23,42,0.16)",
  },
  label: {
    fontWeight: 700,
    fontSize: 14,
  },
  textArea: {
    width: "100%",
    minHeight: 80,
    marginTop: 6,
    padding: 8,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    resize: "vertical",
    fontFamily: "inherit",
    fontSize: 14,
  },
  submitBtn: {
    marginTop: 14,
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
};
