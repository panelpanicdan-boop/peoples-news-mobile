// src/App.js
// Full mock People’s News web app for StackBlitz / CRA
// Uses only React + react-icons (no extra imports)

import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUpload,
  FaUser,
  FaCog,
  FaCamera,
  FaBroadcastTower,
} from "react-icons/fa";

// MOCK DATA
const MOCK_POSTS = [
  {
    id: "a1",
    user: "Alex",
    cat: "Event",
    text: "Street fair on Main — lots of people!",
    img: "https://placekitten.com/400/300",
    views: 120,
  },
  {
    id: "a2",
    user: "Maria",
    cat: "Accident",
    text: "Two-car collision on Rt. 10",
    img: "https://placebear.com/400/300",
    views: 500,
  },
  {
    id: "ad1",
    ad: true,
    brand: "Beep Boop",
    img: "https://placekitten.com/600/200",
    text: "Beep Boop — delivering joy to your door.",
  },
  {
    id: "a3",
    user: "Jordan",
    cat: "Weather",
    text: "Hailstorm downtown!",
    img: "https://picsum.photos/seed/1/400/300",
    views: 78,
  },
  {
    id: "a4",
    user: "Sofia",
    cat: "Police",
    text: "Road closed near 5th Ave.",
    img: "https://picsum.photos/seed/2/400/300",
    views: 320,
  },
  {
    id: "ad2",
    ad: true,
    brand: "Beep Boop",
    img: "https://picsum.photos/seed/beep/600/200",
    text: "Beep Boop — local deals, big smiles.",
  },
  {
    id: "a5",
    user: "Chris",
    cat: "Event",
    text: "Charity run today",
    img: "https://placekitten.com/401/300",
    views: 44,
  },
];

// base outline button
const outlineBtnBase = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "transparent",
  cursor: "pointer",
};

export default function App() {
  const [tab, setTab] = useState("feed");
  const [feedMode, setFeedMode] = useState("interested");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(() => ({
    id: "user_demo",
    name: "DemoUser",
    bio: "Local reporter. Coffee lover.",
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    verified: false,
    balance: 12.5,
    uploads: ["a1", "a3"],
    followers: 120,
    following: 58,
  }));
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [usersLive, setUsersLive] = useState(42);
  const [isLive, setIsLive] = useState(false);
  const [showNav, setShowNav] = useState(true);

  // scroll hide/show bottom nav
  const lastScrollY = useRef(0);
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (y > lastScrollY.current + 10) setShowNav(false);
      else if (y < lastScrollY.current - 10) setShowNav(true);
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fake live users changing
  useEffect(() => {
    const t = setInterval(
      () =>
        setUsersLive((v) =>
          Math.max(1, v + Math.floor(Math.random() * 7 - 3))
        ),
      8000
    );
    return () => clearInterval(t);
  }, []);

  // dark mode body background
  useEffect(() => {
    document.body.style.background = darkMode ? "#07101a" : "#f2f4f7";
    document.body.style.color = darkMode ? "#e6eef8" : "#111";
  }, [darkMode]);

  // go live logic
  function handleGoLive() {
    const ageDays = (Date.now() - user.joinedAt) / (1000 * 60 * 60 * 24);
    if (!user.verified)
      return alert("Account must be verified to go live (mock).");
    if (ageDays < 7)
      return alert("Account must be at least 7 days old to go live (mock).");
    setIsLive(true);
    setUsersLive((v) => v + 1);
    alert("You are now live (mock).");
  }
  function stopLive() {
    setIsLive(false);
    setUsersLive((v) => Math.max(0, v - 1));
    alert("Live ended (mock).");
  }

  // swipe navigation (optional, mobile)
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  function onTouchStart(e) {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  }
  function onTouchMove(e) {
    if (touchStartX.current == null) return;
    const x = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  }
  function onTouchEnd() {
    const dx = touchDeltaX.current;
    const threshold = 60;
    if (dx > threshold) {
      // swipe right (previous tab)
      if (tab === "upload") setTab("feed");
      else if (tab === "camera") setTab("upload");
      else if (tab === "live") setTab("camera");
      else if (tab === "account") setTab("live");
      else if (tab === "settings") setTab("account");
    } else if (dx < -threshold) {
      // swipe left (next tab)
      if (tab === "feed") setTab("upload");
      else if (tab === "upload") setTab("camera");
      else if (tab === "camera") setTab("live");
      else if (tab === "live") setTab("account");
      else if (tab === "account") setTab("settings");
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  // feed items logic
  const feedItems = posts.filter((p, i) =>
    p.ad ? true : feedMode === "following" ? i % 2 === 0 : true
  );

  return (
    <div
      style={darkMode ? styles.appDark : styles.app}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* small CSS for animations */}
      <style>{`
        .card-animate { animation: cardIn 360ms ease both; }
        @keyframes cardIn {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .img-zoom { transition: transform 300ms ease; }
        .img-zoom:hover { transform: scale(1.03); }
        .nav-fade {
          transition: transform 260ms cubic-bezier(.2,.9,.2,1),
                      opacity 200ms ease;
        }
      `}</style>

      <Header usersLive={usersLive} />

      <main style={styles.container}>
        {tab === "feed" && (
          <Feed
            feedItems={feedItems}
            feedMode={feedMode}
            setFeedMode={setFeedMode}
          />
        )}
        {tab === "upload" && <Upload setPosts={setPosts} posts={posts} />}
        {tab === "camera" && <Camera setPosts={setPosts} posts={posts} />}
        {tab === "live" && (
          <LiveTab
            user={user}
            isLive={isLive}
            handleGoLive={handleGoLive}
            stopLive={stopLive}
          />
        )}
        {tab === "account" && (
          <Account user={user} posts={posts} setUser={setUser} />
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

        {/* spacer so content doesn't sit under nav */}
        <div style={{ height: 110 }} />
      </main>

      {/* bottom nav */}
      <nav
        className="nav-fade"
        style={{
          ...styles.bottomNav,
          transform: showNav ? "translateY(0)" : "translateY(120%)",
          opacity: showNav ? 1 : 0,
        }}
      >
        <div style={styles.smallBtn} onClick={() => setTab("feed")}>
          <FaHome size={20} />
          <div style={styles.navLabel}>Feed</div>
        </div>

        <div style={styles.smallBtn} onClick={() => setTab("upload")}>
          <FaUpload size={20} />
          <div style={styles.navLabel}>Upload</div>
        </div>

        {/* Center live button */}
        <div style={styles.centerLive} onClick={() => setTab("live")}>
          <div style={styles.liveIconWrap}>
            <FaBroadcastTower size={20} color="#fff" />
          </div>
        </div>

        <div style={styles.smallBtn} onClick={() => setTab("camera")}>
          <FaCamera size={20} />
          <div style={styles.navLabel}>Camera</div>
        </div>

        <div style={styles.smallBtn} onClick={() => setTab("account")}>
          <FaUser size={20} />
          <div style={styles.navLabel}>Account</div>
        </div>
      </nav>

      {/* Raised footer card */}
      <footer style={styles.footer}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>People&apos;s News — Mock</div>
        <div style={{ fontSize: 12, color: "#666" }}>Sponsored by Beep Boop</div>
      </footer>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function Header({ usersLive }) {
  return (
    <header style={styles.header}>
      <div style={{ fontWeight: 800, fontSize: 20 }}>People&apos;s News</div>
      <div
        style={{ fontSize: 13, color: "#0077cc", fontWeight: 600 }}
      >{`${usersLive} current users live`}</div>
    </header>
  );
}

function Feed({ feedItems, feedMode, setFeedMode }) {
  return (
    <section>
      <div style={styles.feedHeader}>
        <div>
          <button
            style={{
              ...outlineBtnBase,
              marginRight: 8,
              borderColor:
                feedMode === "following"
                  ? "#007bff"
                  : "rgba(0,0,0,0.12)",
            }}
            onClick={() => setFeedMode("following")}
          >
            Following
          </button>
          <button
            style={{
              ...outlineBtnBase,
              borderColor:
                feedMode === "interested"
                  ? "#007bff"
                  : "rgba(0,0,0,0.12)",
            }}
            onClick={() => setFeedMode("interested")}
          >
            Interested
          </button>
        </div>
        <div style={{ fontSize: 13 }}>
          {feedItems.filter((f) => !f.ad).length} posts
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {feedItems.map((p) =>
          p.ad ? <AdCard key={p.id} ad={p} /> : <PostCard key={p.id} post={p} />
        )}
      </div>
    </section>
  );
}

function PostCard({ post }) {
  return (
    <article className="card-animate" style={styles.postCard}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700 }}>{post.user}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{post.cat}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700 }}>
            ${Math.max(5, Math.round(post.views / 10))}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>est payout</div>
        </div>
      </div>

      <p style={{ marginTop: 8 }}>{post.text}</p>
      {post.img && (
        <img
          className="img-zoom"
          src={post.img}
          alt="post"
          style={{ width: "100%", borderRadius: 8 }}
        />
      )}

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button style={styles.outlineBtnSmall}>View</button>
        <button style={styles.outlineBtnSmall}>Share</button>
        <button style={styles.outlineBtnSmall}>Report</button>
      </div>
    </article>
  );
}

function AdCard({ ad }) {
  return (
    <article
      className="card-animate"
      style={{ ...styles.postCard, border: "2px solid #f0c" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700 }}>{ad.brand} (Sponsored)</div>
          <div style={{ fontSize: 12, color: "#666" }}>Sponsored</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 13, color: "#666" }}>
          Ad
        </div>
      </div>
      <p style={{ marginTop: 8 }}>{ad.text}</p>
      {ad.img && (
        <img src={ad.img} alt="ad" style={{ width: "100%", borderRadius: 8 }} />
      )}
      <div style={{ marginTop: 8 }}>
        <button style={styles.outlineBtnSmall}>Learn More</button>
      </div>
    </article>
  );
}

function Upload({ setPosts, posts }) {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile({ url: URL.createObjectURL(f), type: f.type, name: f.name });
  }

  function submit() {
    const id = "p_" + Math.random().toString(36).slice(2, 6);
    const newPost = {
      id,
      user: "You",
      cat: "Other",
      text: desc || "(no description)",
      img: file?.url,
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
      <div style={styles.settingCard}>
        <label style={{ fontWeight: 700 }}>Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ width: "100%", minHeight: 80 }}
        />
        <div style={{ marginTop: 8 }}>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFile}
          />
        </div>
        {file && (
          <div style={{ marginTop: 8 }}>
            <img
              src={file.url}
              alt="preview"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
        <div style={{ marginTop: 10 }}>
          <button style={styles.outlineBtn} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}

function Camera({ setPosts, posts }) {
  const [file, setFile] = useState(null);

  function handleCapture(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile({ url: URL.createObjectURL(f), type: f.type, name: f.name });
  }

  function send() {
    const id = "p_" + Math.random().toString(36).slice(2, 6);
    const newPost = {
      id,
      user: "You",
      cat: "Other",
      text: "Camera upload",
      img: file?.url,
      views: 0,
    };
    setPosts([newPost, ...posts]);
    setFile(null);
    alert("Camera upload submitted (mock)");
  }

  return (
    <section style={styles.page}>
      <h2>Camera</h2>
      <div style={styles.settingCard}>
        <input
          type="file"
          accept="image/*,video/*"
          capture="environment"
          onChange={handleCapture}
        />
        {file &&
          (file.type?.startsWith("video") ? (
            <video src={file.url} controls style={{ width: "100%" }} />
          ) : (
            <img src={file.url} alt="cap" style={{ width: "100%" }} />
          ))}
        <div style={{ marginTop: 10 }}>
          <button style={styles.outlineBtn} onClick={send}>
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

function Account({ user, posts }) {
  const userPosts = posts.filter(
    (p) => p.user === "You" || (user.uploads && user.uploads.includes(p.id))
  );

  return (
    <section style={styles.page}>
      <div style={styles.accountHeader}>
        <div style={styles.profilePic}></div>
        <div style={{ marginLeft: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: "#666" }}>{user.bio}</div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button style={styles.outlineBtnSmall}>
              {user.followers} Followers
            </button>
            <button style={styles.outlineBtnSmall}>
              {user.following} Following
            </button>
            <button style={styles.outlineBtnSmall}>Messages</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>Your uploads</h3>
        <div style={styles.grid}>
          {userPosts.length === 0 && (
            <div style={ui.card}>No uploads yet.</div>
          )}
          {userPosts.map((p) => (
            <div key={p.id} style={styles.gridItem}>
              {p.img ? (
                <img src={p.img} alt="u" style={{ width: "100%" }} />
              ) : (
                <div style={{ padding: 20, textAlign: "center" }}>No media</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SettingsTab({
  darkMode,
  setDarkMode,
  user,
  setUser,
  isLive,
  handleGoLive,
  stopLive,
}) {
  const [isMonetized, setIsMonetized] = useState(false);
  const [stats] = useState({
    earnings: 152.75,
    views: 12840,
    uploads: 42,
  });

  function verifyIdentity() {
    setUser({ ...user, verified: true });
    alert("Identity verified (mock)");
  }

  function verifyAddress() {
    alert("Address verified (mock)");
  }

  return (
    <section style={styles.page}>
      <h2>Settings</h2>

      <div style={styles.settingCard}>
        <h3>Monetization</h3>
        {!isMonetized ? (
          <button
            style={styles.outlineBtn}
            onClick={() => setIsMonetized(true)}
          >
            Apply for Monetization
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button style={styles.outlineBtn} onClick={verifyIdentity}>
              Verify Identity
            </button>
            <button style={styles.outlineBtn} onClick={verifyAddress}>
              Verify Address
            </button>
            <button style={styles.outlineBtn}>
              Lifetime Earnings: ${stats.earnings}
            </button>
            <button style={styles.outlineBtn}>
              Total Views: {stats.views.toLocaleString()}
            </button>
            <button style={styles.outlineBtn}>
              Total Uploads: {stats.uploads}
            </button>
          </div>
        )}
      </div>

      <div style={styles.settingCard}>
        <h3>Appearance</h3>
        <button
          style={styles.outlineBtn}
          onClick={() => setDarkMode(!darkMode)}
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div style={styles.settingCard}>
        <h3>Live</h3>
        {!isLive ? (
          <button style={styles.outlineBtn} onClick={handleGoLive}>
            Go Live (if verified & account age ≥ 7d)
          </button>
        ) : (
          <button style={styles.outlineBtn} onClick={stopLive}>
            End Live
          </button>
        )}
      </div>
    </section>
  );
}

function LiveTab({ isLive, handleGoLive, stopLive }) {
  return (
    <section style={styles.page}>
      <h2>Live</h2>
      <p>
        Live reporting — only available to verified users & accounts older than
        7 days (mock).
      </p>
      {!isLive ? (
        <div>
          <button style={styles.outlineBtn} onClick={handleGoLive}>
            Start Live (mock)
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 8 }}>You are live now (mock).</div>
          <button style={styles.outlineBtn} onClick={stopLive}>
            End Live
          </button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Currently Live (mock)</h3>
        <div style={styles.gridSmall}>
          <div style={styles.liveCard}>ReporterA</div>
          <div style={styles.liveCard}>ReporterB</div>
          <div style={styles.liveCard}>StudioCam</div>
        </div>
      </div>
    </section>
  );
}

// Simple card helper used in Account
const ui = {
  card: {
    padding: 12,
    marginBottom: 12,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};

// styles object
const styles = {
  app: {
    fontFamily: "Inter, Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f2f4f7",
    color: "#111",
  },
  appDark: {
    fontFamily: "Inter, Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#07101a",
    color: "#e6eef8",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    background: "transparent",
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(4px)",
  },
  container: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
    paddingBottom: 140,
    maxWidth: 980,
    margin: "0 auto",
  },
  feedHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postCard: {
    padding: 14,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
    marginBottom: 12,
    transition: "transform 220ms ease, box-shadow 220ms ease",
  },
  outlineBtnSmall: {
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "transparent",
    cursor: "pointer",
  },
  outlineBtn: outlineBtnBase,
  page: { paddingBottom: 20 },
  bottomNav: {
    position: "fixed",
    left: 12,
    right: 12,
    bottom: 16,
    height: 68,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 12px 40px rgba(2,6,23,0.12)",
    backdropFilter: "blur(8px)",
    zIndex: 9999,
  },
  smallBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    color: "#111",
    cursor: "pointer",
    background: "transparent",
    border: "none",
  },
  navLabel: { fontSize: 11 },
  centerLive: {
    width: 66,
    height: 66,
    borderRadius: 999,
    marginTop: -36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  liveIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 999,
    background: "linear-gradient(135deg,#ff5f6d,#ffc371)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(255,95,109,0.18)",
  },
  footer: {
    position: "fixed",
    left: 16,
    right: 16,
    bottom: 96,
    padding: 12,
    textAlign: "center",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 12px 30px rgba(2,6,23,0.06)",
    borderRadius: 12,
    zIndex: 900,
  },
  settingCard: {
    padding: 14,
    background: "#fff",
    borderRadius: 10,
    marginBottom: 12,
  },
  accountHeader: {
    display: "flex",
    alignItems: "center",
    padding: 12,
    background: "#fff",
    borderRadius: 10,
  },
  profilePic: {
    width: 86,
    height: 86,
    borderRadius: 999,
    background: "linear-gradient(135deg,#ececec,#cfcfcf)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginTop: 8,
  },
  gridItem: {
    background: "#f7f7f7",
    borderRadius: 8,
    overflow: "hidden",
  },
  gridSmall: {
    display: "flex",
    gap: 8,
  },
  liveCard: {
    padding: 12,
    background: "#111",
    color: "#fff",
    borderRadius: 8,
  },
};
