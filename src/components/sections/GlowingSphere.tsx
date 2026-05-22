import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06 + mouse.current.x * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.06 + mouse.current.y * 0.08;
    }
  });

  const { positions, colors } = useMemo(() => {
    const segments = 96;
    const radius = 1;
    const posArr: number[] = [];
    const colArr: number[] = [];

    // Colors for three zones
    const pink   = new THREE.Color(0.95, 0.35, 0.65);
    const purple = new THREE.Color(0.38, 0.12, 0.75);
    const blue   = new THREE.Color(0.15, 0.25, 0.90);

    function getColor(nx: number, ny: number, nz: number) {
      // nx, ny, nz are normalized direction on sphere surface
      // pink: upper right (nx > 0, ny > 0)
      // blue: lower (ny < 0)
      // purple: left (nx < 0)
      const pinkWeight   = Math.max(0, nx) * Math.max(0, ny + 0.3);
      const blueWeight   = Math.max(0, -ny + 0.2);
      const purpleWeight = Math.max(0, -nx + 0.1);

      const total = pinkWeight + blueWeight + purpleWeight + 0.001;
      const r = (pink.r * pinkWeight + blue.r * blueWeight + purple.r * purpleWeight) / total;
      const g = (pink.g * pinkWeight + blue.g * blueWeight + purple.g * purpleWeight) / total;
      const b = (pink.b * pinkWeight + blue.b * blueWeight + purple.b * purpleWeight) / total;
      return [r, g, b];
    }

    // Latitude lines (horizontal rings)
    for (let lat = 0; lat <= segments; lat++) {
      const theta = (lat / segments) * Math.PI;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);
      const ringPoints = Math.max(4, Math.round(segments * sinT));

      for (let i = 0; i < ringPoints; i++) {
        const phi1 = (i / ringPoints) * Math.PI * 2;
        const phi2 = ((i + 1) / ringPoints) * Math.PI * 2;

        const x1 = radius * sinT * Math.cos(phi1);
        const y1 = radius * cosT;
        const z1 = radius * sinT * Math.sin(phi1);

        const x2 = radius * sinT * Math.cos(phi2);
        const y2 = radius * cosT;
        const z2 = radius * sinT * Math.sin(phi2);

        posArr.push(x1, y1, z1, x2, y2, z2);
        const c1 = getColor(x1, y1, z1);
        const c2 = getColor(x2, y2, z2);
        colArr.push(...c1, ...c2);
      }
    }

    // Longitude lines (vertical arcs)
    for (let lon = 0; lon < segments; lon++) {
      const phi = (lon / segments) * Math.PI * 2;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      for (let i = 0; i < segments; i++) {
        const theta1 = (i / segments) * Math.PI;
        const theta2 = ((i + 1) / segments) * Math.PI;

        const x1 = radius * Math.sin(theta1) * cosPhi;
        const y1 = radius * Math.cos(theta1);
        const z1 = radius * Math.sin(theta1) * sinPhi;

        const x2 = radius * Math.sin(theta2) * cosPhi;
        const y2 = radius * Math.cos(theta2);
        const z2 = radius * Math.sin(theta2) * sinPhi;

        posArr.push(x1, y1, z1, x2, y2, z2);
        const c1 = getColor(x1, y1, z1);
        const c2 = getColor(x2, y2, z2);
        colArr.push(...c1, ...c2);
      }
    }

    return {
      positions: new Float32Array(posArr),
      colors: new Float32Array(colArr),
    };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Soft white specular highlight as a sprite
  const highlightMat = useMemo(() => new THREE.SpriteMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.82}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {/* White highlight spot top-right */}
      <sprite
        material={highlightMat}
        position={[0.55, 0.55, 0.72]}
        scale={[0.9, 0.9, 1]}
      />
    </group>
  );
}

export default function GlowingSphere() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Outer atmospheric glow via CSS — no box, just radial */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 60% 42%, rgba(140,60,200,0.22) 0%, rgba(80,30,160,0.12) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <Canvas
        camera={{ position: [0, 0, 3.0], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        <WireframeSphere />
      </Canvas>
    </div>
  );
}
