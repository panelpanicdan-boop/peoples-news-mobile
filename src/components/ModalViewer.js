// src/components/ModalViewer.js
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function ModalViewer({ post, onClose }) {
  if (!post) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>
          <FaTimes size={22} />
        </button>

        {/* IMAGE / VIDEO */}
        <img src={post.img} alt="post" style={styles.media} />

        {/* INFO PANEL */}
        <div style={styles.info}>
          {post.user && (
            <div style={styles.user}>
              <strong>{post.user}</strong>
            </div>
          )}
          <div style={styles.text}>{post.text}</div>

          <div style={styles.stats}>
            <span>Views: {post.views ?? 0}</span>
            {post.cat && <span>Category: {post.cat}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    animation: "fadeIn 0.25s ease",
  },
  modal: {
    width: "92%",
    maxWidth: 500,
    maxHeight: "90vh",
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "#fff",
    borderRadius: "50%",
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
  },
  media: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  info: {
    padding: 16,
  },
  user: {
    marginBottom: 6,
    fontSize: 15,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  stats: {
    fontSize: 12,
    color: "#666",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
  },
};
