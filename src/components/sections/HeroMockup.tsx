import { motion } from "framer-motion";

function BrowserChrome() {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 shrink-0"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-1.5 shrink-0">
        {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((color) => (
          <div key={color} className="w-2 h-2 rounded-full" style={{ background: color }} />
        ))}
      </div>
      <div
        className="flex-1 mx-3 px-3 py-1 rounded-md text-center overflow-hidden text-ellipsis whitespace-nowrap"
        style={{
          background: "rgba(255,255,255,0.05)",
          fontFamily: '"DM Mono", ui-monospace, monospace',
          fontSize: 11,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        cybiconz.com/work/lwangblack
      </div>
    </div>
  );
}

function MockSiteContent() {
  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A0408 0%, #1A0808 100%)" }}
    >
      {/* Fake nav bar */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{
          background: "rgba(0,0,0,0.5)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="h-2 rounded-full"
          style={{ width: 56, background: "rgba(255,255,255,0.18)" }}
        />
        <div className="flex gap-3">
          {([24, 20, 28] as const).map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{ width: w, background: "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
      </div>

      {/* Hero image placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3 py-4">
        <div
          className="w-full rounded-lg shrink-0"
          style={{
            height: 76,
            background:
              "linear-gradient(135deg, rgba(120,40,20,0.55) 0%, rgba(60,10,10,0.85) 100%)",
          }}
        />

        <div className="text-center">
          <p
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 22 }}
          >
            LwangBlack Coffee
          </p>
          <p
            className="font-mono mt-0.5"
            style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}
          >
            E-Commerce · In Development
          </p>
        </div>

        {/* Product card placeholders */}
        <div className="flex gap-2 w-full mt-2">
          {[0, 1].map((n) => (
            <div
              key={n}
              className="flex-1 rounded-lg"
              style={{
                height: 52,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroMockup() {
  return (
    <div className="relative" style={{ width: 480, maxWidth: "100%" }}>

      {/* Browser window — continuous float at 6s */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        className="relative flex flex-col overflow-hidden"
        style={{
          aspectRatio: "16 / 10",
          background: "#0A0A14",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <BrowserChrome />
        <MockSiteContent />
      </motion.div>

      {/* Floating metric card 1 — top-right corner, 5s float */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        className="absolute flex flex-col gap-1 rounded-xl"
        style={{
          top: -20,
          right: -20,
          width: 120,
          padding: "10px 12px",
          background: "rgba(10,10,20,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(57,255,20,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: "#39FF14", boxShadow: "0 0 6px rgba(57,255,20,0.8)" }}
          />
          <span
            className="font-display font-bold text-white leading-none"
            style={{ fontSize: 22 }}
          >
            100%
          </span>
        </div>
        <span
          className="font-mono tracking-wider"
          style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}
        >
          DELIVERY RATE
        </span>
      </motion.div>

      {/* Floating metric card 2 — bottom-left, 7s float, opposite phase */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        className="absolute flex flex-col gap-0.5 rounded-xl"
        style={{
          bottom: 20,
          left: -30,
          width: 160,
          padding: "10px 12px",
          background: "rgba(10,10,20,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(0,196,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
        }}
      >
        <span
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: 13 }}
        >
          Live since 2024
        </span>
        <span
          className="font-mono tracking-wider"
          style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}
        >
          LwangBlack Coffee
        </span>
      </motion.div>
    </div>
  );
}
