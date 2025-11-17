// COMPLETE UPDATED APP.JS (COPY + PASTE THIS DIRECTLY INTO src/App.js)
// Includes setTab passed into AccountTab + all tabs wired correctly

import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUpload,
  FaUser,
  FaCamera,
  FaBroadcastTower,
} from "react-icons/fa";

// IMPORT ALL TABS
import FeedTab from "./tabs/FeedTab";
import UploadTab from "./tabs/UploadTab";
import CameraTab from "./tabs/CameraTab";
import LiveTab from "./tabs/LiveTab";
import AccountTab from "./tabs/AccountTab";
import SettingsTab from "./tabs/SettingsTab";

// MODAL VIEWER
import ModalViewer from "./components/ModalViewer";

// MOCK POSTS
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
  const [posts, setPosts] = useState(MOCK_POSTS);

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

  const [isLive, setIsLive] = useState(false);
  const [usersLive, setUsersLive] = useState(42);
  const [modalPost, setModalPost] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  // Hide bottom nav when scrolling
  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      if (y > lastScrollY.current + 12) setShowNav(false);
      else if (y < lastScrollY.current - 12) setShowNav(true);
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Random live counter fluctuation
  useEffect(() => {
    const t = setInterval(() => {
      setUsersLive((v) => Math.max(1, v + Math.floor(Math.random() * 7 - 3)));
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // Dark mode styling
  useEffect(() => {
    document.body.style.background = darkMode ? "#060c12" : "#f2f4f7";
    document.body.style.color = darkMode ? "#e6eef8" : "#111";
  }, [darkMode]);

  function handleGoLive() {
    const ageDays = (Date.now() - user.joinedAt) / (1000 * 60 * 60 * 24);
    if (!user.verified) return alert("Verify identity to go live.");
    if (ageDays < 7) return alert("Account must be at least 7 days old.");
    setIsLive(true);
    setUsersLive((v) => v + 1);
    alert("You're now LIVE (mock)");
  }

  function stopLive() {
    setIsLive(false);
    setUsersLive((v) => Math.max(1, v - 1));
    alert("Live ended (mock)");
  }

  return (
    <div style={darkMode ? styles.appDark : styles.app}>
      <Header usersLive={usersLive} />

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
            setTab={setTab} // ⭐ IMPORTANT
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
          />
        )}

        {/* Spacer for bottom nav */}
        <div style={{ height: 120 }}></div>
      </main>

      {/* MODAL VIEWER */}
      {modalPost && (
        <ModalViewer post={modalPost} onClose={() => setModalPost(null)} />
      )}

      <BottomNav tab={tab} setTab={setTab} showNav={showNav} />
    </div>
  );
}

function Header({ usersLive }) {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>People's News</div>
      <div style={styles.liveCounter}>{usersLive} live</div>
    </header>
  );
}

function BottomNav({ tab, setTab, showNav }) {
  return (
    <nav
      style={{
        ...styles.bottomNav,
        transform: showNav ? "translateY(0)" : "translateY(200%)",
        opacity: showNav ? 1 : 0,
      }}
    >
      <div style={styles.navBtn} onClick={() => setTab("feed")}>
        <FaHome size={20} />
        <div style={styles.navLabel}>Feed</div>
      </div>

      <div style={styles.navBtn} onClick={() => setTab("upload")}>
        <FaUpload size={20} />
        <div style={styles.navLabel}>Upload</div>
      </div>

      <div style={styles.liveBtn} onClick={() => setTab("live")}>
        <FaBroadcastTower size={22} color="#fff" />
      </div>

      <div style={styles.navBtn} onClick={() => setTab("camera")}>
        <FaCamera size={20} />
        <div style={styles.navLabel}>Camera</div>
      </div>

      <div style={styles.navBtn} onClick={() => setTab("account")}>
        <FaUser size={20} />
        <div style={styles.navLabel}>Account</div>
      </div>
    </nav>
  );
}

// STYLES (complete — do not truncate)
const styles = {
  app: {
    fontFamily: "Inter, Arial, sans-serif",
    minHeight: "100vh",
    background: "#f2f4f7",
    color: "#111",
  },
  appDark: {
    fontFamily: "Inter, Arial, sans-serif",
    minHeight: "100vh",
    background: "#060c12",
    color: "#e6eef8",
  },
  container: {
    padding: "16px",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 18px",
    background: "rgba(255,255,255,0.65)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  logo: {
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: 0.5,
  },
  liveCounter: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0077ff",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "#ffffff",
    borderTop: "1px solid rgba(0,0,0,0.1)",
    transition: "0.3s ease",
    zIndex: 100,
  },
  navBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 12,
  },
  navLabel: {
    marginTop: 3,
  },
  liveBtn: {
    width: 65,
    height: 65,
    background: "linear-gradient(135deg,#ff5f6d,#ffc371)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  },
};

export default App;
