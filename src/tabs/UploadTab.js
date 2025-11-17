// src/tabs/UploadTab.js
// Clean modular Upload tab for People's News
// Expects props: setPosts, posts
// Handles local mock uploads only (no backend yet)

import React, { useState } from "react";

export default function UploadTab({ setPosts, posts }) {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile({ url: URL.createObjectURL(f), type: f.type, name: f.name });
  }

  function submit() {
    if (!desc && !file) return alert("Please add a description or media.");

    const id = "p_" + Math.random().toString(36).slice(2, 8);
    const newPost = {
      id,
      user: "You",
      cat: "Other",
      text: desc || "(no description)",
      img: file?.url || null,
      views: 0,
    };

    setPosts([newPost, ...posts]);
    setDesc("");
    setFile(null);
    alert("Uploaded to moderation (mock)");
  }

  return (
    <section style={styles.page}>
      <h2>Upload</h2>

      <div style={styles.card}>
        <label style={styles.label}>Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={styles.textArea}
          placeholder="Describe what happened..."
        />

        <div style={{ marginTop: 10 }}>
          <input type="file" accept="image/*,video/*" onChange={handleFile} />
        </div>

        {file && (
          <div style={{ marginTop: 10 }}>
            {file.type?.startsWith("video") ? (
              <video src={file.url} controls style={{ width: "100%" }} />
            ) : (
              <img src={file.url} alt="preview" style={{ width: "100%" }} />
            )}
          </div>
        )}

        <button style={styles.button} onClick={submit}>
          Submit
        </button>
      </div>
    </section>
  );
}

// Local styles
const styles = {
  page: {
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  label: {
    fontWeight: 700,
  },
  textArea: {
    width: "100%",
    minHeight: 80,
    resize: "vertical",
    padding: 8,
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.2)",
    marginTop: 6,
  },
  button: {
    marginTop: 14,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600,
  },
};
