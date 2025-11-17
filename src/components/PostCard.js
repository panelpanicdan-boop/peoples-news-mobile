// src/components/PostCard.js
// Premium post card: images + text-only + badges + skeleton + animations

import React, { useState, useEffect } from "react";

export default function PostCard({ post, onOpen, skeleton = false }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Inject shimmer keyframes once for skeleton
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("postcard-shimmer")) return;
    const style = document.createElement("style");
    style.id = "postcard-shimmer";
    style.innerHTML = `
      @keyframes shimmer {
        0% { background-position: -450px 0; }
        100% { background-position: 450px 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ------------- SKELETON STATE -------------
  if (skeleton) {
    return (
      <article style={styles.skeletonCard}>
        <div style={styles.skelMedia} />
        <div style={styles.skelLineWide} />
        <div style={styles.skelLineMid} />
        <div style={styles.skelLineShort} />
      </article>
    );
  }

  // ------------- NORMAL CARD -------------
  const isTextOnly = !post.img;
  const category = post.cat || "Update";
  const isLive = !!post.isLive;
  const isVerified = !!post.verifiedUser || !!post.verified;

  const colorByCategory = {
    Traffic: "#f97316",
    Accident: "#ef4444",
    Weather: "#3b82f6",
    Event: "#22c55e",
    Update: "#6366f1",
  };
  const catColor = colorByCategory[category] || "#6366f1";

  const timeAgo = formatTimeAgo(post.createdAt);
  const viewsLabel = formatViews(post.views ?? 0);
  const avatarInitials = (post.user || "?")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const clickable = !!post.img && typeof onOpen === "function";

  // base card style with hover/press/swipe animation
  const baseCard = {
    ...styles.cardBase,
    transform: `
      translateY(${pressed ? 2 : hovered ? -2 : 0}px)
      translateX(${swipeOffset}px)
      scale(${pressed ? 0.99 : 1})
    `,
    boxShadow: hovered
      ? "0 14px 32px rgba(15,23,42,0.35)"
      : "0 10px 24px rgba(15,23,42,0.22)",
  };

  const cardStyle = isTextOnly
    ? {
        ...baseCard,
        ...styles.textCard,
        borderLeft: `4px solid ${catColor}`,
      }
    : {
        ...baseCard,
        ...styles.mediaCard,
      };

  // Touch (swipe-like) handling
  function handleTouchStart(e) {
    const x = e.touches?.[0]?.clientX;
    if (x != null) setTouchStartX(x);
  }

  function handleTouchMove(e) {
    if (touchStartX == null) return;
    const x = e.touches?.[0]?.clientX;
    if (x == null) return;
    const delta = x - touchStartX;
    const limited = Math.max(-12, Math.min(12, delta)); // small swipe offset
    setSwipeOffset(limited);
  }

  function handleTouchEnd() {
    setSwipeOffset(0);
    setTouchStartX(null);
  }

  const handleClick = () => {
    if (clickable) onOpen(post);
  };

  return (
    <article
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* IMAGE POST */}
      {!isTextOnly && (
        <>
          <div style={styles.mediaWrapper}>
            <img src={post.img} alt="post" style={styles.media} />
            <div style={{ ...styles.catPill, backgroundColor: catColor }}>
              {category}
            </div>
            {isLive && <div style={styles.liveBadge}>LIVE</div>}
          </div>
          <div style={styles.body}>
            <HeaderRow
              user={post.user}
              avatarInitials={avatarInitials}
              isVerified={isVerified}
              location={post.location}
              timeAgo={timeAgo}
            />
            <div style={styles.text}>{post.text}</div>
            <FooterRow viewsLabel={viewsLabel} />
          </div>
        </>
      )}

      {/* TEXT-ONLY POST */}
      {isTextOnly && (
        <div style={styles.bodyTextOnly}>
          <HeaderRow
            user={post.user}
            avatarInitials={avatarInitials}
            isVerified={isVerified}
            location={post.location}
            timeAgo={timeAgo}
          />
          <div style={styles.textOnly}>{post.text}</div>
          <FooterRow viewsLabel={viewsLabel} />
        </div>
      )}
    </article>
  );
}

// -------- Sub-components --------

function HeaderRow({ user, avatarInitials, isVerified, location, timeAgo }) {
  return (
    <div style={styles.headerRow}>
      <div style={styles.userSection}>
        <div style={styles.avatar}>{avatarInitials}</div>
        <div>
          <div style={styles.userNameRow}>
            <span style={styles.userName}>{user}</span>
            {isVerified && <span style={styles.verifiedBadge}>✔</span>}
          </div>
          <div style={styles.metaLine}>
            {location && <span>{location} · </span>}
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterRow({ viewsLabel }) {
  return (
    <div style={styles.footerRow}>
      <span style={styles.views}>{viewsLabel}</span>
    </div>
  );
}

// -------- Utilities --------

function formatTimeAgo(createdAt) {
  if (!createdAt) return "Just now";
  const diffMs = Date.now() - createdAt;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

function formatViews(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";
  return num + " views";
}

const shimmerBg = {
  backgroundImage:
    "linear-gradient(90deg, #e5e7eb 0px, #f3f4f6 40px, #e5e7eb 80px)",
  backgroundSize: "450px 100%",
  animation: "shimmer 1.2s infinite",
};

const styles = {
  cardBase: {
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    background: "#0f172a",
    color: "#f9fafb",
    transition:
      "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
  },
  mediaCard: {},
  textCard: {
    borderLeftWidth: 4,
    borderLeftStyle: "solid",
  },
  mediaWrapper: {
    position: "relative",
  },
  media: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    display: "block",
  },
  catPill: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
  },
  liveBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "3px 8px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    color: "#fee2e2",
    background:
      "radial-gradient(circle at 30% 30%, #ef4444, #991b1b 80%, #450a0a)",
    boxShadow: "0 4px 12px rgba(239,68,68,0.6)",
  },
  body: {
    padding: 12,
  },
  bodyTextOnly: {
    padding: 12,
    background: "#020617",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 999,
    background:
      "radial-gradient(circle at 30% 30%, #38bdf8, #4f46e5 70%, #0f172a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 800,
    color: "#e5e7eb",
  },
  userNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontWeight: 800,
    fontSize: 14,
  },
  verifiedBadge: {
    fontSize: 11,
    color: "#38bdf8",
  },
  metaLine: {
    fontSize: 11,
    color: "#9ca3af",
  },
  text: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  textOnly: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  footerRow: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  views: {
    fontWeight: 500,
  },

  // Skeleton styles
  skeletonCard: {
    borderRadius: 18,
    marginBottom: 18,
    padding: 12,
    background: "#e5e7eb",
    boxShadow: "0 8px 20px rgba(148,163,184,0.6)",
  },
  skelMedia: {
    height: 180,
    borderRadius: 14,
    marginBottom: 10,
    ...shimmerBg,
  },
  skelLineWide: {
    height: 12,
    borderRadius: 999,
    marginBottom: 8,
    ...shimmerBg,
  },
  skelLineMid: {
    height: 12,
    width: "70%",
    borderRadius: 999,
    marginBottom: 8,
    ...shimmerBg,
  },
  skelLineShort: {
    height: 12,
    width: "40%",
    borderRadius: 999,
    ...shimmerBg,
  },
};
