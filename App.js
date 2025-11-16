// COMPLETE NEW APP.JS — PRODUCTION-QUALITY STRUCTURE
// This file replaces your old App.js entirely.
// It connects all modernized tabs, bottom navigation, header, live counter,
// dark mode, feed/upload/camera/live/account/settings flows.

import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUpload,
  FaUser,
  FaCamera,
  FaBroadcastTower,
} from "react-icons/fa";

// IMPORT ALL MODERN TABS
import FeedTab from "./tabs/FeedTab";
import UploadTab from "./tabs/UploadTab";
import CameraTab from "./tabs/CameraTab";
import LiveTab from "./tabs/LiveTab";
import AccountTab from "./tabs/AccountTab";
import SettingsTab from "./tabs/SettingsTab";

// MOCK FEED POSTS
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
    text: "Two-car accident on Rt. 10, expect delays.",
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

  useEffect((
