// src/App.js — Bold Premium Version with Ticker + Modal Viewer

import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUpload,
  FaUser,
  FaCamera,
  FaBroadcastTower,
  FaCog,
} from "react-icons/fa";

import FeedTab from "./tabs/FeedTab";
import UploadTab from "./tabs/UploadTab";
import CameraTab from "./tabs/CameraTab";
import LiveTab from "./tabs/LiveTab";
import AccountTab from "./tabs/AccountTab";
import SettingsTab from "./tabs/SettingsTab";
import ModalViewer from "./components/ModalViewer";

// Inject ticker keyframes once
const globalStyles = `
@keyframes tickerScroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-130%); }
}
`;
if (typeof document !== "undefined" && !document.getElementById("ticker-styles")) {
  const styleTag = document.createElement("style");
  styleTag.id = "ticker-styles";
  styleTag.innerHTML = globalStyles;
  document.head.appendChild(styleTag);
}

// Mock posts (including Beep Boop ad INSIDE the feed only)
const MOCK_POSTS = [
  {
    id: "p1",
    user: "Alex",
    cat: "Event",
    text: "Street festival on Main — lots of people!",
    img: "https://placekitten.com/400/300",
    views: 120,
  },
  {
    id: "p2",
    user: "Maria",
    cat: "Accident",
    text: "Two-car accident on Rt. 10. Expect delays.",
    img: "https://placebear.com/400/300",
    views: 500,
  },
  {
    id: "ad1",
    ad: true,
    brand: "Beep Boop",
    img: "https://picsum.photos/seed/ad1/600/240",
    text: "Beep Boop — delivering joy to your door.",
  },
  {
    id: "p3",
    user: "Jordan",
    cat: "Weather",
    text: "Sudden hailstorm downtown!",
    img: "https://picsum.photos/seed/wx1/400/300",
    views: 78,
  },
];

export default function App() {
  const [tab, setTab] = useState("feed");
  const [feedMode, setFeedMode] = useState("interested");
  const [darkMode, setDarkMode] = useState(false);

  const [user, setUser] = useState(() => ({
    id: "demo_user",
    name: "DemoUser",
    bio: "Local reporter. Coffee lover.",
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
    verified: false,
    followers: 120,
    following: 56,
    uploads: [],
  }));

  const [posts, setPosts] = useState(MOCK_POSTS);

  const [isLive, setIsLive] = useState(false);
  const [usersLive, setUsersLive] = useState(42);

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  const [modalPost, setModalPost] = useState(null);

  const [showTicker, setShowTicker] = useState(true);
  const [tickerText, setTickerText] = useState(
    "AAPL +2.3% | TSLA +1.2% | BREAKING: New eyewitness uploads in your area | Beep Boop: Sponsored segment | System: All services operational."
  );

  // Hide/show bottom nav on scroll
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y > lastScrollY.current + 12) setShowNav(false);
      else if (y < lastScrollY.current - 12) setShowNav(true);
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Random live user fluctuation
  useEffect(() => {
    const t = setInterval(() => {
      setUsersLive((v) => Math.max(1, v + Math.floor(Math.random() * 7 - 3)));
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // Dark mode styling
  useEffect(() => {
    document.body.style.background = darkMode
      ? "radial-gradient(circle at top, #111827 0, #020617 40%, #000 100%)"
      : "#f3f4f6";
    document.body.style.color = darkMode ? "#e5e7eb" : "#111827";
  }, [darkMode]);

  function handleGoLive() {
    const ageDays = (Date.now() - user.joinedAt) / (1000 * 60 * 60 * 24);
    if (!user.verified) return alert("Verify your identity to go live.");
    if (ageDays < 7)
      return alert("Your account must be at least 7 days old to go live.");
    setIsLive(true);
    setUsersLive((v) => v + 1);
    alert("You are now LIVE (mock)");
  }

  function stopLive() {
    setIsLive(false);
    setUsersLive((v) => Math.max(1, v - 1));
    alert("Live ended (mock)");
  }

  return (
    <div style={darkMode ? styles.appDark : styles.app}>
      <Header
        usersLive={usersLive}
        showTicker={showTicker}
        tickerText={tickerText}
      />

      <main style={styles.container}>
        {tab === "feed" && (
          <FeedTab
            posts={posts}
            feedMode={feedMode}
            setFeedMode={setFeedMode}
            setModalPost={setModalPost}
          />
        )}

        {tab === "upload" && <UploadTab posts={posts} setPosts={setPosts} />}

        {tab === "camera" && <CameraTab posts={posts} setPosts={setPosts} />}

        {tab === "live" && (
          <LiveTab
            user={user}
            isLive={isLive}
            handleGoLive={handleGoLive}
            stopLive={stopLive}
          />
        )}

        {tab === "account" && (
          <AccountTab
            user={user}
            setUser={setUser}
            posts={posts}
            setModalPost={setModalPost}
          />
        )}

        {tab === "settings" && (
          <SettingsTab
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            user={user}
            setUser={setUser}
            isLive={isLive}
            handleGoLive={handleGoLive}
            stopLive={stopLive}
            showTicker={showTicker}
            setShowTicker={setShowTicker}
            tickerText={tickerText}
            setTickerText={setTickerText}
          />
        )}

        {/* Spacer so content doesn't hide behind nav */}
        <div style={{ height: 120 }} />
      </main>

      {/* Modal viewer for posts */}
      {modalPost && (
        <ModalViewer post={modalPost} onClose={() => setModalPost(null)} />
      )}

      <BottomNav tab={tab} setTab={setTab} showNav={showNav} />
    </div>
  );
}

// HEADER WITH TICKER
function Header({ usersLive, showTicker, tickerText }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerTop}>
        <div style={styles.logo}>People&apos;s News</div>
        <div style={styles.liveBadge}>
          <span style={{ marginRight: 6, fontSize: 11 }}>LIVE USERS</span>
          <span>{usersLive}</span>
        </div>
      </div>

      {showTicker && (
        <div style={styles.tickerShell}>
          <div style={styles.tickerTrack}>
            <span style={styles.tickerText}>{tickerText}</span>
          </div>
        </div>
      )}
    </header>
  );
}

// BOTTOM NAVIGATION
function BottomNav({ tab, setTab, showNav }) {
  return (
    <nav
      style={{
        ...styles.bottomNav,
        transform: showNav ? "translateY(0)" : "translateY(200%)",
        opacity: showNav ? 1 : 0,
      }}
    >
      <button
        style={tab === "feed" ? styles.navBtnActive : styles.navBtn}
        onClick={() => setTab("feed")}
      >
        <FaHome size={20} />
        <span style={styles.navLabel}>Feed</span>
      </button>

      <button
        style={tab === "upload" ? styles.navBtnActive : styles.navBtn}
        onClick={() => setTab("upload")}
      >
        <FaUpload size={20} />
        <span style={styles.navLabel}>Upload</span>
      </button>

      <button
        style={styles.liveFab}
        onClick={() => setTab("live")}
        aria-label="Go Live"
      >
        <FaBroadcastTower size={24} />
      </button>

      <button
        style={tab === "camera" ? styles.navBtnActive : styles.navBtn}
        onClick={() => setTab("camera")}
      >
        <FaCamera size={20} />
        <span style={styles.navLabel}>Camera</span>
      </button>

      <button
        style={tab === "account" ? styles.navBtnActive : styles.navBtn}
        onClick={() => setTab("account")}
      >
        <FaUser size={20} />
        <span style={styles.navLabel}>Account</span>
      </button>

      <button
        style={tab === "settings" ? styles.navBtnActive : styles.navBtn}
        onClick={() => setTab("settings")}
      >
        <FaCog size={20} />
        <span style={styles.navLabel}>Settings</span>
      </button>
    </nav>
  );
}

// STYLES
const styles = {
  app: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    minHeight: "100vh",
    background: "#f3f4f6",
    color: "#111827",
  },
  appDark: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #111827 0, #020617 40%, #000 100%)",
    color: "#e5e7eb",
  },
  container: {
    padding: "12px 16px 0",
    maxWidth: 960,
    margin: "0 auto",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    padding: "10px 16px 8px",
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.98), rgba(236,72,153,0.98))",
    color: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  logo: {
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: 0.5,
  },
  liveBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(15,23,42,0.75)",
    fontSize: 12,
    fontWeight: 700,
    gap: 2,
  },
  tickerShell: {
    height: 26,
    borderRadius: 999,
    overflow: "hidden",
    background: "rgba(15,23,42,0.65)",
    border: "1px solid rgba(148,163,184,0.4)",
  },
  tickerTrack: {
    whiteSpace: "nowrap",
    animation: "tickerScroll 18s linear infinite",
    display: "inline-block",
  },
  tickerText: {
    display: "inline-block",
    padding: "4px 16px",
    fontSize: 12,
    color: "#e5e7eb",
  },
  bottomNav: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 86,
    padding: "8px 16px",
    background: "rgba(15,23,42,0.96)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 -10px 25px rgba(0,0,0,0.5)",
    transition: "transform 0.25s ease, opacity 0.25s ease",
    zIndex: 100,
  },
  navBtn: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#9ca3af",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    fontSize: 11,
    cursor: "pointer",
  },
  navBtnActive: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    fontSize: 11,
    cursor: "pointer",
  },
  navLabel: {
    marginTop: 2,
  },
  liveFab: {
    width: 66,
    height: 66,
    borderRadius: 999,
    border: "3px solid #f97316",
    background: "linear-gradient(135deg,#ef4444,#f97316)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(239,68,68,0.6)",
    cursor: "pointer",
    transform: "translateY(-14px)",
  },
};
