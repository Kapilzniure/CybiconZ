import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2000;

// All per-instance data baked once at module load (stable across re-renders)
const BASE_POSITIONS = new Float32Array(COUNT * 3);
const SPEEDS         = new Float32Array(COUNT);
const PHASES         = new Float32Array(COUNT);
const INSTANCE_COLORS: THREE.Color[] = [];

const C_WHITE = new THREE.Color(0xffffff);
const C_CYAN  = new THREE.Color(0x00c4ff);
const C_GREEN = new THREE.Color(0x39ff14);

for (let i = 0; i < COUNT; i++) {
  BASE_POSITIONS[i * 3]     = (Math.random() - 0.5) * 16; // X: −8 … +8
  BASE_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 8;  // Y: −4 … +4
  BASE_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 16; // Z: −8 … +8
  SPEEDS[i] = 0.3 + Math.random() * 0.7;
  PHASES[i] = Math.random() * Math.PI * 2;
  const r = Math.random();
  INSTANCE_COLORS.push(
    r < 0.7 ? C_WHITE.clone() : r < 0.9 ? C_CYAN.clone() : C_GREEN.clone()
  );
}

// ─── DataField ────────────────────────────────────────────────────────────────

function DataField() {
  const meshRef  = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const matrix   = useMemo(() => new THREE.Matrix4(), []);
  const { camera } = useThree();

  // Track mouse (normalised −0.5 … +0.5)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x:  e.clientX / window.innerWidth  - 0.5,
        y:  e.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Initialise instance colors + positions (runs once after mesh mounts)
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < COUNT; i++) {
      mesh.setColorAt(i, INSTANCE_COLORS[i]);
      matrix.setPosition(
        BASE_POSITIONS[i * 3],
        BASE_POSITIONS[i * 3 + 1],
        BASE_POSITIONS[i * 3 + 2],
      );
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [matrix]);

  useFrame((state) => {
    const mesh  = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    const t = state.clock.elapsedTime;
    const m = mouseRef.current;

    // Slow world rotation
    group.rotation.y += 0.0008;

    // Camera parallax — lerp toward mouse
    camera.position.x += ( m.x *  1.5 - camera.position.x) * 0.04;
    camera.position.y += (-m.y *  0.8 - camera.position.y) * 0.04;

    // Bob each data point on its own sine wave
    for (let i = 0; i < COUNT; i++) {
      matrix.setPosition(
        BASE_POSITIONS[i * 3],
        BASE_POSITIONS[i * 3 + 1] + Math.sin(t * SPEEDS[i] + PHASES[i]) * 0.08,
        BASE_POSITIONS[i * 3 + 2],
      );
      mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.012, 5, 4]} />
        <meshBasicMaterial vertexColors />
      </instancedMesh>
    </group>
  );
}

// ─── HeroCanvas (exported) ────────────────────────────────────────────────────

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      style={{ display: "block" }}
    >
      <color attach="background" args={["#000000"]} />
      <DataField />
    </Canvas>
  );
}
