import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import * as THREE from "three";

// Three.js Sphere Component
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.001;
      meshRef.current.rotation.x += delta * 0.0003;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.001;
      wireframeRef.current.rotation.x += delta * 0.0003;
    }
  });

  return (
    <>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial
          color={0x1a0a3e}
          shininess={15}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          color={0x7C3AED}
          transparent
          opacity={0.06}
          wireframe={true}
        />
      </mesh>

      {/* Lights */}
      <pointLight position={[10, 10, 10]} intensity={2} color={0x7C3AED} />
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for headline lines
    const lines = headlineRef.current?.children;
    if (lines) {
      gsap.set(lines, {
        clipPath: "inset(100% 0 0 0)",
        y: 20
      });

      gsap.to(lines, {
        clipPath: "inset(0% 0 0 0)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2
      });
    }

    // Subheadline fade in
    gsap.set(".subheadline", { opacity: 0, y: 10 });
    gsap.to(".subheadline", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.8,
      ease: "power2.out"
    });

    // CTAs fade in
    gsap.set(".ctas", { opacity: 0, y: 15 });
    gsap.to(".ctas", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 1.0,
      ease: "power2.out"
    });

    // Scroll indicator
    gsap.set(".scroll-indicator", { opacity: 0 });
    gsap.to(".scroll-indicator", {
      opacity: 1,
      duration: 0.6,
      delay: 1.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#060608" }}>
      {/* Three.js Canvas - positioned behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ width: "600px", height: "600px" }}
        >
          <Sphere />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Top tag */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            Digital Agency · Tokyo, Japan
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <div className="block font-display font-black text-white leading-none" style={{
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.9"
          }}>
            We build
          </div>
          <div className="block font-display font-black leading-none" style={{
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.9",
            WebkitTextStroke: "1.5px rgba(240,238,255,0.4)",
            WebkitTextFillColor: "transparent",
            color: "transparent"
          }}>
            digital products
          </div>
          <div className="block font-display font-black text-white leading-none" style={{
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.9"
          }}>
            that work.
          </div>
        </div>

        {/* Subheadline */}
        <p className="subheadline font-sans font-normal text-lg text-white/40 max-w-lg mx-auto mb-12">
          Not a template shop. Not a disappearing freelancer.
        </p>

        {/* CTAs */}
        <div className="ctas flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/contact"
            className="bg-[#7C3AED] text-white font-bold text-sm px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            Start a Project
          </Link>
          <Link
            to="/work"
            className="border border-white/15 text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/5 transition-colors"
          >
            See our work
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-white/20 uppercase tracking-wider">
            SCROLL
          </span>
          <motion.div
            className="w-px h-8 bg-white/10"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
}
