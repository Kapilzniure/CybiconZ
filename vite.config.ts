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
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":    ["react", "react-dom", "react-router-dom"],
          "vendor-framer":   ["framer-motion"],
          "vendor-gsap":     ["gsap"],
          "vendor-three":    ["three", "@react-three/fiber"],
          "vendor-spline":   ["@splinetool/react-spline"],
          "vendor-tanstack": ["@tanstack/react-query"],
          "vendor-lenis":    ["@studio-freight/lenis"],
        },
      },
    },
  },
}));
