import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ParticleField } from "@/components/ui/ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Three.js Sphere Component
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const wireframe2Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
      const pulse = 1 + Math.sin(Date.now() * 0.001) * 0.025;
      meshRef.current.scale.setScalar(pulse);
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.003;
      wireframeRef.current.rotation.x += 0.001;
    }
    if (wireframe2Ref.current) {
      wireframe2Ref.current.rotation.y -= 0.001;
      wireframe2Ref.current.rotation.z += 0.0008;
    }
    if (groupRef.current) {
      mouse.current.cx += (mouse.current.tx - mouse.current.cx) * 0.05;
      mouse.current.cy += (mouse.current.ty - mouse.current.cy) * 0.05;
      groupRef.current.position.x = mouse.current.cx;
      groupRef.current.position.y = -mouse.current.cy;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshPhongMaterial
          color={0x2D1B69}
          shininess={30}
          transparent
          opacity={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[2.22, 64, 64]} />
        <meshBasicMaterial
          color={0x7C3AED}
          transparent
          opacity={0.18}
          wireframe={true}
        />
      </mesh>

      {/* Outer wireframe ring */}
      <mesh ref={wireframe2Ref}>
        <sphereGeometry args={[2.8, 24, 24]} />
        <meshBasicMaterial
          color={0xA855F7}
          transparent
          opacity={0.06}
          wireframe={true}
        />
      </mesh>

      {/* Lights */}
      <ambientLight color={0xffffff} intensity={0.25} />
      <pointLight position={[5, 5, 5]} color={0x7C3AED} intensity={6} distance={20} />
      <pointLight position={[-5, -3, 3]} color={0xEC4899} intensity={3} distance={15} />
      <pointLight position={[0, 6, 0]} color={0x06B6D4} intensity={2} distance={12} />
    </group>
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

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const headlineEl = document.getElementById('hero-headline');
    const subEl = document.getElementById('hero-sub');
    const ctaEl = document.getElementById('hero-ctas');

    if (!heroSection || !headlineEl) return;

    gsap.to(headlineEl, {
      scale: 1.08,
      opacity: 0,
      y: -40,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    });

    if (subEl) {
      gsap.to(subEl, {
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '60% top',
          scrub: 0.8,
        }
      });
    }

    if (ctaEl) {
      gsap.to(ctaEl, {
        opacity: 0,
        y: -15,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '40% top',
          scrub: 0.6,
        }
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="hero-section" className="relative flex items-center justify-center overflow-hidden" style={{ background: "#060608", minHeight: "140vh" }}>
      {/* Three.js Canvas - positioned behind text */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-0" style={{ height: "100vh" }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Sphere />
        </Canvas>
      </div>

      {/* Particle field overlay */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "100vh", zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center" style={{ position: "absolute", top: "50vh", left: "50%", transform: "translate(-50%, -50%)", width: "100%" }}>
        {/* Top tag */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            Digital Agency · Tokyo, Japan
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} id="hero-headline" className="mb-8">
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
        <p id="hero-sub" className="subheadline font-sans font-normal text-lg text-white/40 max-w-lg mx-auto mb-12">
          Not a template shop. Not a disappearing freelancer.
        </p>

        {/* CTAs */}
        <div id="hero-ctas" className="ctas flex flex-col sm:flex-row gap-4 justify-center mb-16 items-center">
          <MagneticButton href="/contact" variant="primary">Start a Project →</MagneticButton>
          <MagneticButton href="/work" variant="secondary">See our work</MagneticButton>
        </div>

      </div>

      {/* Scroll Indicator (viewport-bottom) */}
      <div className="scroll-indicator absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10" style={{ top: "calc(100vh - 80px)" }}>
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
    </section>
  );
}
