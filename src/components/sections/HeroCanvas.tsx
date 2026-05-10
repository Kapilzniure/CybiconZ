import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLOR_INDIGO = 0x4f46e5;
const COLOR_INDIGO_LIGHT = 0x818cf8;
const COLOR_CYAN = 0x06b6d4;

const NODE_POSITIONS: [number, number, number][] = [
  [0, 0.5, 0],         // 0 central
  [-1.8, 0, 0],        // 1 central
  [1.8, 0, 0],         // 2 central
  [0, -1.2, 0],        // 3 central
  [-3.2, 1.2, -1],     // 4
  [3.2, 1.4, -1],      // 5
  [-2.8, -0.8, -1.5],  // 6
  [2.6, -1.0, -1.5],   // 7
  [0, 2.2, -1],        // 8
  [-1.2, -2.4, -1],    // 9
  [1.4, -2.2, -1],     // 10
  [-3.8, 0.2, -2],     // 11
  [3.6, -0.2, -2],     // 12
  [0, 3.0, -2],        // 13
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [1, 6], [2, 7],
  [0, 8], [3, 9], [3, 10], [4, 11], [5, 12], [8, 13], [9, 11],
];

const PACKET_CONNECTIONS = [0, 1, 2, 3, 4, 7];

const gridVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const gridFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vec2 grid = abs(fract(vUv * 32.0 - 0.5) - 0.5) / fwidth(vUv * 32.0);
    float line = min(grid.x, grid.y);
    float gridAlpha = 1.0 - min(line, 1.0);
    float dist = length(vUv - 0.5) * 2.0;
    float fade = 1.0 - smoothstep(0.3, 1.0, dist);
    float pulse = sin(dist * 8.0 - uTime * 1.2) * 0.5 + 0.5;
    pulse = pow(pulse, 3.0) * (1.0 - dist);
    float alpha = gridAlpha * fade * 0.18 + pulse * 0.08;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function GridPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh position={[0, -3.5, 0]} rotation={[-Math.PI * 0.38, 0, 0]}>
      <planeGeometry args={[28, 28, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(COLOR_INDIGO) },
        }}
      />
    </mesh>
  );
}

function Nodes() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const phaseOffsets = useMemo(() => NODE_POSITIONS.map(() => Math.random() * Math.PI * 2), []);
  const periods = useMemo(() => NODE_POSITIONS.map(() => 3 + Math.random() * 3), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    NODE_POSITIONS.forEach((_, i) => {
      const m = meshRefs.current[i];
      if (!m) return;
      const s = 1 + Math.sin((t / periods[i]) * Math.PI * 2 + phaseOffsets[i]) * 0.15;
      m.scale.setScalar(s);
    });
  });

  return (
    <group>
      {NODE_POSITIONS.map((pos, i) => {
        const isCentral = i < 4;
        const r = isCentral ? 0.12 : 0.06;
        const emissiveIntensity = isCentral ? 0.8 : 0.4;
        return (
          <group key={i} position={pos}>
            <mesh ref={(el) => { meshRefs.current[i] = el; }}>
              <sphereGeometry args={[r, 16, 16]} />
              <meshStandardMaterial
                color={COLOR_INDIGO_LIGHT}
                emissive={COLOR_INDIGO}
                emissiveIntensity={emissiveIntensity}
              />
            </mesh>
            {!isCentral && (
              <mesh>
                <sphereGeometry args={[r * 3, 12, 12]} />
                <meshBasicMaterial color={COLOR_INDIGO} transparent opacity={0.04} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function Connections() {
  const lines = useMemo(() => {
    return CONNECTIONS.map(([a, b]) => {
      const pa = new THREE.Vector3(...NODE_POSITIONS[a]);
      const pb = new THREE.Vector3(...NODE_POSITIONS[b]);
      const geom = new THREE.BufferGeometry().setFromPoints([pa, pb]);
      return { geom, pa, pb };
    });
  }, []);

  return (
    <group>
      {lines.map((l, i) => (
        <group key={i}>
          <line>
            <primitive object={l.geom} attach="geometry" />
            <lineBasicMaterial color={COLOR_INDIGO} transparent opacity={0.15} />
          </line>
          <line>
            <primitive object={l.geom} attach="geometry" />
            <lineBasicMaterial color={COLOR_INDIGO} transparent opacity={0.08} />
          </line>
        </group>
      ))}
    </group>
  );
}

function DataPackets() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef<number[]>(PACKET_CONNECTIONS.map(() => Math.random()));
  const speeds = useMemo(() => PACKET_CONNECTIONS.map(() => 0.25 + Math.random() * 0.25), []);
  const endpoints = useMemo(() => {
    return PACKET_CONNECTIONS.map((ci) => {
      const [a, b] = CONNECTIONS[ci];
      return {
        a: new THREE.Vector3(...NODE_POSITIONS[a]),
        b: new THREE.Vector3(...NODE_POSITIONS[b]),
      };
    });
  }, []);

  useFrame((_, delta) => {
    PACKET_CONNECTIONS.forEach((_, i) => {
      progress.current[i] += delta * speeds[i] * 0.5;
      if (progress.current[i] > 1.1) progress.current[i] = -0.05;
      const t = Math.max(0, Math.min(1, progress.current[i]));
      const m = refs.current[i];
      if (!m) return;
      m.position.lerpVectors(endpoints[i].a, endpoints[i].b, t);
      m.visible = progress.current[i] >= 0 && progress.current[i] <= 1;
    });
  });

  return (
    <group>
      {PACKET_CONNECTIONS.map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={COLOR_INDIGO_LIGHT} />
        </mesh>
      ))}
    </group>
  );
}

function makeCardTexture(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0A0A12";
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = "rgba(79,70,229,0.3)";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, 255, 127);
  draw(ctx, 256, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function Card({
  position,
  draw,
  bobOffset,
}: {
  position: [number, number, number];
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  bobOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => makeCardTexture(draw), [draw]);
  const { camera } = useThree();
  const baseY = position[1];

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = baseY + Math.sin(t * 0.6 + bobOffset) * 0.1;
    // Dampened look-at camera
    const target = new THREE.Vector3(camera.position.x * 0.3, camera.position.y * 0.3, camera.position.z);
    const m = new THREE.Matrix4().lookAt(g.position, target, g.up);
    const q = new THREE.Quaternion().setFromRotationMatrix(m);
    g.quaternion.slerp(q, 0.05);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <planeGeometry args={[1.4, 0.7]} />
        <meshBasicMaterial map={texture} transparent opacity={0.85} />
      </mesh>
      <pointLight color={0xffffff} intensity={0.3} distance={3} />
    </group>
  );
}

function Cards() {
  return (
    <>
      <Card
        position={[-2.8, 1.8, 0.5]}
        bobOffset={0}
        draw={(ctx) => {
          ctx.fillStyle = "#818CF8";
          ctx.font = "600 14px ui-monospace, monospace";
          ctx.fillText("01 / DISCOVERY", 14, 26);
          ctx.fillStyle = "rgba(79,70,229,0.25)";
          ctx.fillRect(14, 50, 228, 6);
          ctx.fillStyle = "#4F46E5";
          ctx.fillRect(14, 50, 228 * 0.6, 6);
          ctx.fillStyle = "rgba(240,238,255,0.7)";
          ctx.font = "500 13px ui-sans-serif, system-ui";
          ctx.fillText("LwangBlack · E-Commerce", 14, 90);
        }}
      />
      <Card
        position={[2.6, 0.8, 0.3]}
        bobOffset={1.7}
        draw={(ctx) => {
          ctx.fillStyle = "#818CF8";
          ctx.font = "600 14px ui-monospace, monospace";
          ctx.fillText("02 / BUILD", 14, 26);
          ctx.fillStyle = "rgba(79,70,229,0.25)";
          ctx.fillRect(14, 50, 228, 6);
          ctx.fillStyle = "#4F46E5";
          ctx.fillRect(14, 50, 228 * 0.8, 6);
          ctx.fillStyle = "rgba(240,238,255,0.7)";
          ctx.font = "500 13px ui-sans-serif, system-ui";
          ctx.fillText("Johnnies · Digital", 14, 90);
        }}
      />
      <Card
        position={[0.2, -2.0, 0.8]}
        bobOffset={3.2}
        draw={(ctx) => {
          ctx.fillStyle = "#818CF8";
          ctx.font = "600 14px ui-monospace, monospace";
          ctx.fillText("RESPONSE TIME · 1 DAY", 14, 26);
          ctx.fillStyle = "#10B981";
          ctx.beginPath();
          ctx.arc(24, 80, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(240,238,255,0.7)";
          ctx.font = "500 13px ui-sans-serif, system-ui";
          ctx.fillText("Active", 40, 85);
        }}
      />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ tx: 0, ty: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / window.innerWidth - 0.5;
      mouse.current.ty = -(e.clientY / window.innerHeight - 0.5);
    };
    const onScroll = () => { scroll.current = window.scrollY; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollProgress = Math.min(scroll.current / window.innerHeight, 1);
    const targetX = mouse.current.tx * 1.2 + Math.sin(t * 0.0003) * 0.001;
    const targetY = mouse.current.ty * 0.8 + 0.5;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.position.z = 14 + scrollProgress * 4;
    camera.rotation.x = scrollProgress * 0.08;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneFog() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x060608, 0.045);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneFog />
      <CameraRig />
      <ambientLight color={0x1a1a2e} intensity={0.4} />
      <pointLight position={[0, 4, 4]} color={COLOR_INDIGO} intensity={3} distance={20} />
      <pointLight position={[-4, -2, 2]} color={COLOR_INDIGO_LIGHT} intensity={1.5} distance={15} />
      <pointLight position={[4, 0, -2]} color={COLOR_CYAN} intensity={0.8} distance={12} />
      <GridPlane />
      <Connections />
      <DataPackets />
      <Nodes />
      <Cards />
    </Canvas>
  );
}
