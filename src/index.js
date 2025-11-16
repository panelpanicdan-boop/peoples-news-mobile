import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Standard React 18 entry point
// StackBlitz + GitHub compatible

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
