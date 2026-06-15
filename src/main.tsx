import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/bricolage-grotesque/400.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/400-italic.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/dm-mono/400.css";
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Suppress known deprecation warnings that come from @react-three/fiber v8
// using THREE.Clock (deprecated in three@0.169) and the duplicate-instance
// check fired by @splinetool/runtime. Neither is actionable without a major
// version bump; remove these guards when upgrading r3f to v9.
const _warn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  const msg = typeof args[0] === "string" ? args[0] : "";
  if (
    msg.includes("Multiple instances of Three.js") ||
    msg.includes("THREE.Clock")
  ) return;
  _warn(...args);
};

createRoot(document.getElementById("root")!).render(<App />);
