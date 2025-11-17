// COMPLETE APP.JS WITH MODAL VIEWER INTEGRATED
// Ready to paste directly into src/App.js

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

// IMPORT MODAL VIEWER
import ModalViewer from "./components/ModalViewer";

// MOCK FEED DATA
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
  // ACTIVE TAB
  const [tab, setTab] = useState("feed");

  // FEED MODE
  const [feedMode, setFeedMode] = useState("interested");

  // DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  // USER
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

  // POSTS
  const [posts, setPosts] = useState(MOCK_POSTS);

  // LIVE
  const [isLive, setIsLive] = useState(false);
  const [usersLive, setUsersLive] = useState(42);

  // MODAL VIEWER
  const [modalPost, setModalPost] = useState(null);

  // BOTTOM NAV
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const t = setInterval(() => {
      setUsersLive((v) => Math.max(1, v + Math.floor(Math.random() * 7 - 3)));
    }, 6000);
    return () => clearInterval(t);
  }, []);

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
    alert("You are now LIVE (mock)");
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

        {/* Spacer */}
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
      <div style={styles.navBtn} onClick={() => setTab("feed")}>        <FaHome size={20} />
        <div style={styles.navLabel}>Feed</div>
      </div>

      <div style={styles.navBtn} onClick={() => setTab("upload")}>        <FaUpload size={20} />
        <div style={styles.navLabel}>Upload</div>
      </div>

      <div style={styles.liveBtn} onClick={() => setTab("live")}>        <FaBroadcastTower size={22} color="#fff" />
      </div>

      <div style={styles.navBtn} onClick={() => setTab("camera")}>        <FaCamera size={20} />
        <div style={styles.navLabel}>Camera</div>
      </div>

      <div style={styles.navBtn} onClick={() => setTab("account")}>        <FaUser size={20} />
        <div style={styles.navLabel}>Account</div>
      </div>
    </nav>
  );
}

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
