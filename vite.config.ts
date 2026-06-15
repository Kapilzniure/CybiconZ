import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Serve .m4a files with the correct MIME type so Chrome can decode them
    {
      name: "audio-mime",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.toLowerCase() ?? "";
          if (url.endsWith(".m4a") || url.endsWith(".mp4")) {
            res.setHeader("Content-Type", "audio/mp4");
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.toLowerCase() ?? "";
          if (url.endsWith(".m4a") || url.endsWith(".mp4")) {
            res.setHeader("Content-Type", "audio/mp4");
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Force all packages (including @splinetool/runtime) to share the same
      // three.js instance and eliminate the "Multiple instances" warning.
      "three": path.resolve(__dirname, "node_modules/three"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "three",
      "@react-three/fiber",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  build: {
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router-dom") || id.includes("react-dom") || id.includes("react/")) return "vendor-react";
          if (id.includes("framer-motion")) return "vendor-framer";
          if (id.includes("gsap")) return "vendor-gsap";
          if (id.includes("three") || id.includes("@react-three")) return "vendor-three";
          if (id.includes("@splinetool")) return "vendor-spline";
          if (id.includes("@tanstack")) return "vendor-tanstack";
          if (id.includes("@studio-freight/lenis")) return "vendor-lenis";
        },
      },
    },
  },
}));
