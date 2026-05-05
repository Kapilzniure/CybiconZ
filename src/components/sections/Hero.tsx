import { motion } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";

function Knot() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 200, 20]} />
      <meshPhongMaterial color="#6D28D9" specular="#A78BFA" shininess={25} transparent opacity={0.9} />
    </mesh>
  );
}

function AnimatedKnot() {
  return (
    <group>
      <Knot />
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 4, 3]} color="#7C3AED" intensity={2} distance={10} />
      <pointLight position={[-3, -2, 2]} color="#EC4899" intensity={1.5} distance={8} />
      <Suspense fallback={null}>
        <RotatingKnot />
      </Suspense>
    </Canvas>
  );
}

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function RotatingKnot() {
  const ref = useRef<THREE.Mesh>(null!);
  const target = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    target.current.x = state.mouse.y * 0.2;
    target.current.y = state.mouse.x * 0.3;
    if (ref.current) {
      ref.current.rotation.y += 0.004;
      ref.current.rotation.x += 0.001;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, target.current.x, 0.04);
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.2, 0.35, 200, 20]} />
      <meshPhongMaterial color="#6D28D9" specular="#A78BFA" shininess={25} transparent opacity={0.9} />
    </mesh>
  );
}

const lineVariants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[700px] h-[100vh] overflow-hidden bg-brand-base">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.15)", filter: "blur(120px)" }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(236,72,153,0.08)", filter: "blur(100px)" }} />

      <div className="container relative h-full grid lg:grid-cols-[55%_45%] gap-8 items-center pt-12 pb-20">
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 border"
            style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-dot" />
            <span className="text-emerald text-xs font-mono">Available for new projects</span>
          </motion.div>

          <h1 className="font-display font-extrabold mt-6 leading-[0.92]" style={{ letterSpacing: "-0.04em" }}>
            <motion.div custom={0} initial="hidden" animate="show" variants={lineVariants} className="text-ink" style={{ fontSize: "clamp(56px, 8vw, 108px)" }}>CybiconZ</motion.div>
            <motion.div custom={1} initial="hidden" animate="show" variants={lineVariants} className="text-gradient" style={{ fontSize: "clamp(56px, 8vw, 108px)" }}>Builds.</motion.div>
            <motion.div custom={2} initial="hidden" animate="show" variants={lineVariants} className="text-ink/85" style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>Digital Products.</motion.div>
          </h1>

          <p className="mt-6 text-[17px] italic text-white/50 border-l-[3px] border-violet pl-4 max-w-md">
            Not a template shop. Not a disappearing freelancer.
          </p>
          <p className="mt-4 text-base text-ink-muted max-w-md leading-relaxed">
            We design and build websites, e-commerce systems, and applications for businesses that need them to actually work — and stay working.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/contact" className="bg-accent-gradient text-white font-bold text-[15px] px-8 py-4 rounded-xl shadow-glow-purple hover:opacity-95 transition">Start a Project →</Link>
            <Link to="/work" className="border border-white/10 bg-white/[0.03] text-ink font-semibold text-[15px] px-8 py-4 rounded-xl hover:bg-white/[0.06] transition">See Our Work</Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-3 max-w-lg">
            {[
              { n: "2+", l: "Projects Completed" },
              { n: "100%", l: "Delivery Rate" },
              { n: "1 day", l: "Response Time" },
            ].map((s, i) => (
              <div key={s.l} className={`px-4 ${i > 0 ? "border-l border-white/[0.08]" : ""}`}>
                <div className="font-display font-extrabold text-[28px] text-ink leading-none">{s.n}</div>
                <div className="font-mono text-[11px] uppercase text-ink-muted mt-2 tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative h-[500px] lg:h-full hidden md:block">
          <Scene />

          {/* Floating cards */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 -translate-x-8 left-0 w-56 p-4 rounded-2xl backdrop-blur-md"
            style={{ background: "rgba(13,14,24,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">LwangBlack Coffee</div>
            <div className="text-ink text-sm font-semibold mt-1">Global E-Commerce</div>
            <div className="mt-3 h-16 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=70)" }} />
          </motion.div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-0 translate-x-6 -translate-y-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: "rgba(13,14,24,0.9)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-dot" />
            <span className="text-emerald text-xs font-mono">Available</span>
          </motion.div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.8, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 translate-x-10 p-4 rounded-xl"
            style={{ background: "rgba(13,14,24,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-mono text-[10px] text-ink-muted uppercase tracking-wider mb-2">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Node.js", "TypeScript"].map(t => (
                <span key={t} className="text-[11px] text-ink px-2 py-0.5 rounded-full" style={{ background: "transparent", border: "1px solid", borderImage: "linear-gradient(135deg, #7C3AED, #EC4899) 1" }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
