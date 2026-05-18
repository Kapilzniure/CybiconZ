import { useEffect, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BRAND_BLUE  = "#00C4FF";
const BRAND_GREEN = "#39FF14";

// ─── Building definitions ──────────────────────────────────────────
const BUILDINGS = [
  // Mid-range — primary skyline
  { w: 0.8,  h: 5.0,  d: 0.8,  x: -8.5, z: -4   },
  { w: 1.2,  h: 7.5,  d: 1.0,  x: -6.5, z: -3   },
  { w: 0.9,  h: 4.0,  d: 0.7,  x: -5.5, z: -5   },
  { w: 1.4,  h: 9.0,  d: 1.2,  x: -4.0, z: -3.5 },
  { w: 0.7,  h: 3.5,  d: 0.6,  x: -2.8, z: -6.0 },
  { w: 0.7,  h: 3.5,  d: 0.6,  x:  2.8, z: -6.0 },
  { w: 1.3,  h: 8.0,  d: 1.1,  x:  4.0, z: -3.5 },
  { w: 0.8,  h: 3.8,  d: 0.7,  x:  5.5, z: -5   },
  { w: 1.5,  h: 10.5, d: 1.3,  x:  6.5, z: -3   },
  { w: 0.9,  h: 4.2,  d: 0.8,  x:  8.5, z: -4   },
  // Far background
  { w: 0.6,  h: 3.5,  d: 0.6,  x: -11.0, z: -9  },
  { w: 0.8,  h: 4.5,  d: 0.8,  x:  -9.5, z: -11 },
  { w: 0.5,  h: 3.0,  d: 0.5,  x:  -5.0, z: -10 },
  { w: 0.7,  h: 5.5,  d: 0.7,  x:   5.0, z: -11 },
  { w: 0.9,  h: 4.0,  d: 0.9,  x:   9.5, z: -10 },
  { w: 0.6,  h: 3.2,  d: 0.6,  x:  11.0, z: -8.5},
  // Near-foreground framing canyon walls
  { w: 2.0,  h: 14.0, d: 1.5,  x: -14,   z: -1  },
  { w: 1.5,  h: 10.0, d: 1.2,  x: -10,   z: -1.5},
  { w: 1.5,  h: 11.0, d: 1.2,  x:  10,   z: -1.5},
  { w: 2.0,  h: 16.0, d: 1.5,  x:  14,   z: -1  },
];

// ─── Building lights ───────────────────────────────────────────────
function BuildingLights({ w, h, d, buildingIndex }: {
  w: number; h: number; d: number; buildingIndex: number;
}) {
  const lights = useMemo(() => {
    const count = 3 + Math.floor(Math.random() * 4);
    return Array.from({ length: count }).map(() => ({
      pos: [
        (Math.random() - 0.5) * w,
        (Math.random() - 0.5) * h,
        (Math.random() - 0.5) * d + (Math.random() > 0.5 ? d / 2 : -d / 2),
      ] as [number, number, number],
      visible: Math.random() > 0.5,
    }));
  }, [w, h, d]);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    refs.current.forEach((ref, i) => {
      if (!ref) return;
      if (Math.random() < 0.001) ref.visible = !ref.visible;
      if (buildingIndex % 3 === 0) {
        ref.visible =
          Math.sin(state.clock.elapsedTime * 0.5 + buildingIndex * 1.3 + i * 0.2) > 0.7;
      }
    });
  });

  return (
    <group>
      {lights.map((l, i) => (
        <mesh key={i} position={l.pos} ref={(el) => { refs.current[i] = el; }} visible={l.visible}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color={BRAND_BLUE} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Single building ───────────────────────────────────────────────
function Building({ b, index }: { b: typeof BUILDINGS[0]; index: number }) {
  const meshRef = useRef<THREE.LineSegments>(null);

  const baseOpacity = useMemo(() => {
    if (b.z > -2)  return 0.015;
    if (b.z > -4)  return 0.04;
    if (b.z >= -7) return 0.025;
    return 0.012;
  }, [b.z]);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = baseOpacity + Math.sin(state.clock.elapsedTime * 0.3 + index * 0.7) * 0.005;
    }
  });

  return (
    <group position={[b.x, -3.5 + b.h / 2, b.z]}>
      <lineSegments ref={meshRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.d)]} />
        <lineBasicMaterial color={BRAND_BLUE} transparent opacity={baseOpacity} />
      </lineSegments>
      <BuildingLights w={b.w} h={b.h} d={b.d} buildingIndex={index} />
    </group>
  );
}

function Cityscape() {
  return (
    <group>
      {BUILDINGS.map((b, i) => <Building key={i} b={b} index={i} />)}
    </group>
  );
}

// ─── Floating particles ────────────────────────────────────────────
function FloatingParticles() {
  const count   = 60;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const cBlue  = new THREE.Color(BRAND_BLUE);
    const cGreen = new THREE.Color(BRAND_GREEN);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 24;
      pos[i*3+1] = Math.random() * 10 - 2;
      pos[i*3+2] = -Math.random() * 8 - 2;
      spd[i]     = 0.5 + Math.random() * 1.5;
      const c    = Math.random() > 0.95 ? cGreen : cBlue;
      col[i*3]   = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    return [pos, spd, col];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) + 0.002 * speeds[i];
      if (y > 8) y = -2;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.010} vertexColors transparent opacity={0.25} depthWrite={false} />
    </points>
  );
}

// ─── Ground mist ──────────────────────────────────────────────────
const mistVertex   = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const mistFragment = `
  uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
  void main(){
    float dist=length(vUv-0.5)*2.0;
    float alpha=smoothstep(1.0,0.0,dist)*0.12;
    float wave=sin(vUv.x*8.0+uTime*0.012)*0.03;
    alpha*=(0.7+wave);
    gl_FragColor=vec4(uColor,alpha);
  }`;

function GroundMist() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh position={[0, -3.4, 0]} rotation={[-Math.PI*0.5, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <shaderMaterial ref={matRef} vertexShader={mistVertex} fragmentShader={mistFragment}
        transparent depthWrite={false} alphaTest={0.01}
        uniforms={{ uTime:{value:0}, uColor:{value:new THREE.Color(BRAND_BLUE)} }} />
    </mesh>
  );
}

// ─── Glowing grid ─────────────────────────────────────────────────
const gridVertex   = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const gridFragment = `
  uniform float uTime; varying vec2 vUv;
  void main(){
    vec2 grid=abs(fract(vUv*54.0-0.5)-0.5)/fwidth(vUv*54.0);
    float line=min(grid.x,grid.y);
    float g=1.0-min(line,1.0);
    float dist=length(vUv-0.5)*2.0;
    float fade=1.0-smoothstep(0.0,0.95,dist);
    vec3 colorA=vec3(0.0,0.769,1.0);
    vec3 colorB=vec3(0.02,0.02,0.06);
    float radialPulse=pow(max(0.0,sin(dist*4.0-uTime*0.35)*0.5+0.5),4.0);
    vec3 color=mix(colorB,colorA,radialPulse*0.6);
    float alpha=(g*fade*0.06)+(radialPulse*fade*0.04);
    gl_FragColor=vec4(color,alpha);
  }`;

function GlowingGrid() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh position={[0, -3.5, 4]} rotation={[-Math.PI*0.5, 0, 0]}>
      <planeGeometry args={[80, 80, 64, 64]} />
      <shaderMaterial ref={matRef} vertexShader={gridVertex} fragmentShader={gridFragment}
        transparent side={THREE.DoubleSide} uniforms={{ uTime:{value:0} }} />
    </mesh>
  );
}

function HorizonLine() {
  const geometry = useMemo(() => {
    const pts = [new THREE.Vector3(-30,-0.5,-4), new THREE.Vector3(30,-0.5,-4)];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={BRAND_BLUE} transparent opacity={0.06} />
    </line>
  );
}

// ─── CAMERA RIG — the scroll cinematic engine ──────────────────────
// 
//  WHAT THIS DOES:
//  The camera starts at z=12 (far back, city barely visible through fog).
//  As the visitor scrolls, z moves toward 4 (inside the city, buildings close).
//  Fog density thins from 0.024 → 0.008 as the camera approaches.
//  Mouse moves the camera X/Y slightly for parallax depth.
//  When idle 3+ seconds, the camera drifts slowly on its own.
//
function CameraRig() {
  const { camera, scene } = useThree();
  const mouse  = useRef({ cx:0, cy:0, tx:0, ty:0, lastMove: Date.now() });
  const scroll = useRef(0);

  // Smoothed camera state — prevents jitter
  const camState = useRef({ z: 12, fogDensity: 0.024 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / window.innerWidth  - 0.5;
      mouse.current.ty = e.clientY / window.innerHeight - 0.5;
      mouse.current.lastMove = Date.now();
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
    const time = state.clock.elapsedTime;
    const isIdle = Date.now() - mouse.current.lastMove > 3000;

    // ── Smooth mouse follow ──────────────────────────────────────
    mouse.current.cx += (mouse.current.tx - mouse.current.cx) * 0.008;
    mouse.current.cy += (mouse.current.ty - mouse.current.cy) * 0.008;

    // ── Scroll progress 0→1 over full page height ────────────────
    // We cap at 2× viewport height so city is fully revealed by
    // the time the visitor reaches the Portfolio section
    const maxScroll = window.innerHeight * 2;
    const scrollProgress = Math.min(scroll.current / maxScroll, 1);

    // ── Camera Z: dolly forward on scroll ────────────────────────
    // z=12 (hero, far back) → z=4 (mid-page, inside city)
    const targetZ = 12 - scrollProgress * 8;
    // Smooth with slow lerp — prevents snap on fast scroll
    camState.current.z += (targetZ - camState.current.z) * 0.04;

    // ── Subtle z breath (ambient life) ───────────────────────────
    const zBreath = Math.sin(time * 0.06) * 0.25;

    // ── Camera X/Y: mouse parallax + idle drift ───────────────────
    let targetX = mouse.current.cx * 0.3;
    let targetY = 0.8 - mouse.current.cy * 0.2;

    if (isIdle) {
      targetX += Math.sin(time * 0.07) * 0.2;
      targetY += Math.cos(time * 0.05) * 0.1;
    }

    // Slight downward tilt as you scroll in — feels like entering a canyon
    targetY -= scrollProgress * 0.5;

    // ── Apply camera position ─────────────────────────────────────
    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.position.z = camState.current.z + zBreath;
    camera.lookAt(0, 0, 0);

    // ── Fog: thin as city is revealed ────────────────────────────
    // Dense at start (0.024) → thin when deep in city (0.008)
    const targetFog = 0.024 - scrollProgress * 0.016;
    camState.current.fogDensity += (targetFog - camState.current.fogDensity) * 0.04;

    if (scene.fog && scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = camState.current.fogDensity;
    }
  });

  return null;
}

// ─── Scene setup ──────────────────────────────────────────────────
function SceneSetup() {
  const { scene } = useThree();
  const blueLightRef  = useRef<THREE.PointLight>(null);
  const beaconRef     = useRef<THREE.PointLight>(null);

  useEffect(() => {
    scene.fog        = new THREE.FogExp2(0x010306, 0.024);
    scene.background = new THREE.Color(0x020408);
    return () => { scene.fog = null; scene.background = null; };
  }, [scene]);

  useFrame((state) => {
    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 8;
    }
    if (beaconRef.current) {
      const t = state.clock.elapsedTime * 0.04;
      beaconRef.current.position.set(Math.sin(t)*15, 20, Math.cos(t)*15);
    }
  });

  return (
    <>
      <ambientLight color={0x020408} intensity={0.2} />
      <pointLight ref={blueLightRef} position={[0,10,10]}  color={BRAND_BLUE}  intensity={2}   distance={50} />
      <pointLight                    position={[10,-5,5]}  color={BRAND_GREEN} intensity={1}   distance={30} />
      <pointLight                    position={[0,8,-5]}   color={BRAND_GREEN} intensity={0.4} distance={25} />
      <pointLight                    position={[-8,5,8]}   color={0x001122}    intensity={0.5} distance={40} />
      <pointLight ref={beaconRef}    position={[0,20,15]}  color={0x003366}    intensity={3}   distance={60} />
    </>
  );
}

// ─── Canvas export ─────────────────────────────────────────────────
export default function HeroCanvas() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position:[0, 1, 12], fov: 45 }}
      dpr={[1, isMobile ? 1 : 1.5]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      style={{ width:"100%", height:"100%" }}
    >
      <Suspense fallback={null}>
        <SceneSetup />
        <CameraRig />
        <Cityscape />
        <FloatingParticles />
        <GroundMist />
        <GlowingGrid />
        <HorizonLine />
      </Suspense>
    </Canvas>
  );
}