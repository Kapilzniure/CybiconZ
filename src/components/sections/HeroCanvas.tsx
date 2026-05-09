import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";

const PALETTE = [0x4f46e5, 0x818cf8, 0xec4899, 0x06b6d4];

type ShardData = {
  position: [number, number, number];
  rotation: [number, number, number];
  rotSpeed: [number, number, number];
  size: number;
  geom: "octa" | "tetra";
  floatAmp: number;
  floatSpeed: number;
  floatOffset: number;
  colorOffset: number;
};

function Shards() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const wireRefs = useRef<THREE.Mesh[]>([]);
  const baseY = useRef<number[]>([]);

  const shards = useMemo<ShardData[]>(() => {
    const arr: ShardData[] = [];
    for (let i = 0; i < 18; i++) {
      const y = Math.random() * 6 - 3;
      arr.push({
        position: [Math.random() * 8 - 4, y, Math.random() * 4 - 3],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        rotSpeed: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ],
        size: 0.08 + Math.random() * 0.27,
        geom: Math.random() > 0.5 ? "octa" : "tetra",
        floatAmp: 0.2 + Math.random() * 0.4,
        floatSpeed: 0.3 + Math.random() * 0.6,
        floatOffset: Math.random() * Math.PI * 2,
        colorOffset: Math.random() * Math.PI * 2,
      });
      baseY.current[i] = y;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    shards.forEach((s, i) => {
      const mesh = meshRefs.current[i];
      const wire = wireRefs.current[i];
      if (!mesh) return;
      mesh.rotation.x += s.rotSpeed[0];
      mesh.rotation.y += s.rotSpeed[1];
      mesh.rotation.z += s.rotSpeed[2];
      mesh.position.y = baseY.current[i] + Math.sin(t * s.floatSpeed + s.floatOffset) * s.floatAmp;

      // Color cycle
      const phase = (t * 0.15 + s.colorOffset) % (Math.PI * 2);
      const idx = Math.floor((phase / (Math.PI * 2)) * PALETTE.length);
      const nextIdx = (idx + 1) % PALETTE.length;
      const lerpT = ((phase / (Math.PI * 2)) * PALETTE.length) % 1;
      const c1 = new THREE.Color(PALETTE[idx]);
      const c2 = new THREE.Color(PALETTE[nextIdx]);
      c1.lerp(c2, lerpT);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.copy(c1);

      if (wire) {
        wire.rotation.copy(mesh.rotation);
        wire.position.copy(mesh.position);
        const wmat = wire.material as THREE.MeshBasicMaterial;
        wmat.color.copy(c1);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => {
        const Geom = s.geom === "octa" ? (
          <octahedronGeometry args={[s.size, 0]} />
        ) : (
          <tetrahedronGeometry args={[s.size, 0]} />
        );
        const GeomWire = s.geom === "octa" ? (
          <octahedronGeometry args={[s.size * 1.15, 0]} />
        ) : (
          <tetrahedronGeometry args={[s.size * 1.15, 0]} />
        );
        return (
          <group key={i}>
            <mesh
              ref={(el) => { if (el) meshRefs.current[i] = el; }}
              position={s.position}
              rotation={s.rotation}
            >
              {Geom}
              <meshStandardMaterial metalness={0.9} roughness={0.1} color={PALETTE[0]} />
            </mesh>
            <mesh
              ref={(el) => { if (el) wireRefs.current[i] = el; }}
              position={s.position}
              rotation={s.rotation}
            >
              {GeomWire}
              <meshBasicMaterial wireframe transparent opacity={0.15} color={PALETTE[0]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

const gridVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const gridFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform float uTime;
  uniform vec3 uColor;
  void main() {
    vec2 grid = abs(fract(vUv * 24.0 - 0.5) - 0.5) / fwidth(vUv * 24.0);
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);
    float dist = length(vWorldPos.xz);
    float pulse = 0.5 + 0.5 * sin(uTime * 0.8 - dist * 0.4);
    float falloff = smoothstep(10.0, 0.0, dist);
    float intensity = line * (0.15 + 0.5 * pulse * falloff);
    if (intensity < 0.005) discard;
    gl_FragColor = vec4(uColor, intensity);
  }
`;

function GridPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 24, 24]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0x4f46e5) },
        }}
      />
    </mesh>
  );
}

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const orbitLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.5) * 0.1;
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);
    if (glowRef.current) glowRef.current.scale.setScalar(pulse * 1.2);
    if (orbitLightRef.current) {
      orbitLightRef.current.position.x = Math.cos(t * 0.6) * 2.2;
      orbitLightRef.current.position.z = Math.sin(t * 0.6) * 2.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color={0x4f46e5} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color={0x4f46e5} transparent opacity={0.06} />
      </mesh>
      <pointLight color={0x4f46e5} intensity={8} distance={12} />
      <pointLight ref={orbitLightRef} color={0xec4899} intensity={3} distance={10} />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  const scroll = useRef(0);
  const orbit = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    const onScroll = () => { scroll.current = window.scrollY; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    const scrollProgress = Math.min(scroll.current / window.innerHeight, 1);
    mouse.current.cx += (mouse.current.tx - mouse.current.cx) * 0.04;
    mouse.current.cy += (mouse.current.ty - mouse.current.cy) * 0.04;

    orbit.current += 0.0003;
    const baseZ = 7 + scrollProgress * 3;
    const ox = Math.sin(orbit.current) * 0.4;

    camera.position.x = mouse.current.cx + ox;
    camera.position.y = 1.5 - mouse.current.cy + scrollProgress * 0.3;
    camera.position.z = baseZ;
    camera.lookAt(0, -scrollProgress * 0.8, 0);
  });

  return null;
}

function SceneFog() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x060608, 0.08);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneFog />
      <CameraRig />
      <ambientLight intensity={0.25} />
      <EnergyCore />
      <Shards />
      <GridPlane />
      <EffectComposer>
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
      </EffectComposer>
    </Canvas>
  );
}