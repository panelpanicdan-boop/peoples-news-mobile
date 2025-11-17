// src/tabs/UploadTab.js — Modern uploader for People’s News

import React, { useState } from "react";

export default function UploadTab({ posts, setPosts }) {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Event");
  const [dragging, setDragging] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImg(reader.result);
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImg(reader.result);
    reader.readAsDataURL(file);
  }

  function handleUpload() {
    if (!img) return alert("Please upload or drop a photo.");
    if (!title.trim()) return alert("Please enter a title.");

    const newPost = {
      id: "up_" + Date.now(),
      user: "You",
      cat: category,
      text: title + (desc ? " — " + desc : ""),
      img,
      views: 0,
    };

    setPosts([newPost, ...posts]);

    alert("Upload complete! (mock)");

    setImg(null);
    setTitle("");
    setDesc("");
    setCategory("Event");
  }

  return (
    <section style={styles.page}>
      <h2 style={styles.title}>Upload Report</h2>

      {/* CATEGORY SELECTOR */}
      <div style={styles.card}>
        <label style={styles.label}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option>Event</option>
          <option>Accident</option>
          <option>Traffic</option>
          <option>Weather</option>
          <option>Police</option>
          <option>Fire</option>
          <option>Emergency</option>
          <option>Entertainment</option>
          <option>Local News</option>
          <option>Community</option>
        </select>
      </div>

      {/* TITLE */}
      <div style={styles.card}>
        <label style={styles.label}>Title</label>
        <input
          style={styles.input}
          placeholder="Short headline for your report"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* DESCRIPTION */}
      <div style={styles.card}>
        <label style={styles.label}>Description (optional)</label>
        <textarea
          style={styles.textarea}
          placeholder="Describe what happened..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      {/* UPLOAD AREA */}
      <div
        style={{
          ...styles.drop,
          borderColor: dragging ? "#4facfe" : "#aaa",
          background: dragging ? "rgba(79,172,254,0.1)" : "#fafafa",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {img ? (
          <img src={img} style={styles.preview} alt="preview" />
        ) : (
          <div style={styles.dropText}>
            Drag & drop a photo here<br />or click to choose a file
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          style={styles.fileInput}
          onChange={handleFileChange}
        />
      </div>

      {/* UPLOAD BUTTON */}
      <button style={styles.uploadBtn} onClick={handleUpload}>
        Upload Report
      </button>
    </section>
  );
}

const styles = {
  page: {
    paddingBottom: 150,
  },

  title: {
    fontSize: 22,
    fontWeight: 900,
    marginBottom: 20,
  },

  card: {
    background: "white",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  label: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
    display: "block",
  },

  select: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },

  textarea: {
    width: "100%",
    minHeight: 80,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    resize: "vertical",
  },

  drop: {
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    border: "2px dashed #aaa",
    borderRadius: 16,
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
  },

  dropText: {
    color: "#666",
    fontSize: 14,
    padding: 30,
  },

  preview: {
    width: "100%",
    maxHeight: 300,
    objectFit: "cover",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  fileInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
  },

  uploadBtn: {
    width: "100%",
    padding: 14,
    marginTop: 10,
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    color: "white",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
};
