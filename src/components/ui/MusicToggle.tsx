import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/hooks/useMusic";

const ECG_W = 20;
const ECG_H = 10;

// One period of the ECG spike — identical copies are placed side-by-side for seamless loop
function EcgPath() {
  return (
    <svg
      width={ECG_W}
      height={ECG_H}
      viewBox={`0 0 ${ECG_W} ${ECG_H}`}
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M 0 5 L 5 5 L 6.5 1.5 L 8 8.5 L 9.5 5 L 20 5"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth={1.3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Running ECG — two copies animated from x=0 to x=-ECG_W (seamless loop)
function RunningEcg() {
  return (
    <motion.div
      style={{ display: "flex", width: ECG_W * 2 }}
      animate={{ x: [0, -ECG_W] }}
      transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
    >
      <EcgPath />
      <EcgPath />
    </motion.div>
  );
}

// Static dash shown when paused
function StaticDash() {
  return (
    <svg width={ECG_W} height={ECG_H} viewBox={`0 0 ${ECG_W} ${ECG_H}`} style={{ display: "block" }}>
      <line
        x1="4" y1="5" x2="16" y2="5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface MusicToggleProps {
  size?: number;
}

export function MusicToggle({ size = 34 }: MusicToggleProps) {
  const { playing, toggle } = useMusic();

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${playing ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)"}`,
        background: playing ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
        transition: "border-color 0.3s ease, background 0.3s ease",
        flexShrink: 0,
      }}
    >
      {/* Clipping window — inner ECG / dash lives here */}
      <div
        style={{
          width: ECG_W,
          height: ECG_H,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {playing ? (
            <motion.div
              key="ecg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RunningEcg />
            </motion.div>
          ) : (
            <motion.div
              key="dash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StaticDash />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
