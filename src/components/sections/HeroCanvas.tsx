import { useEffect, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BRAND_BLUE = "#00C4FF";
const BRAND_GREEN = "#39FF14";
const BRAND_DARK_BLUE = "#0066FF";

const BUILDINGS = [
  { w: 0.8, h: 5.0, d: 0.8, x: -8.5, z: -4 },
  { w: 1.2, h: 7.5, d: 1.0, x: -6.5, z: -3 },
  { w: 0.9, h: 4.0, d: 0.7, x: -5.5, z: -5 },
  { w: 1.4, h: 9.0, d: 1.2, x: -4.0, z: -3.5 },
  { w: 0.7, h: 3.5, d: 0.6, x: -2.8, z: -6.0 },
  { w: 0.7, h: 3.5, d: 0.6, x: 2.8, z: -6.0 },
  { w: 1.3, h: 8.0, d: 1.1, x: 4.0, z: -3.5 },
  { w: 0.8, h: 3.8, d: 0.7, x: 5.5, z: -5 },
  { w: 1.5, h: 10.5, d: 1.3, x: 6.5, z: -3 },
  { w: 0.9, h: 4.2, d: 0.8, x: 8.5, z: -4 },
];

function Cityscape() {
  return (
    <group>
      {BUILDINGS.map((b, i) => {
        const opacity = b.z > -4.5 ? 0.05 : 0.08;
        const yPos = -3.5 + b.h / 2;
        
        return (
          <group key={i} position={[b.x, yPos, b.z]}>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.d)]} />
              <lineBasicMaterial color={BRAND_BLUE} transparent opacity={opacity} />
            </lineSegments>
            <BuildingLights w={b.w} h={b.h} d={b.d} />
          </group>
        );
      })}
    </group>
  );
}

function BuildingLights({ w, h, d }: { w: number; h: number; d: number }) {
  const lights = useMemo(() => {
    const count = 3 + Math.floor(Math.random() * 4);
    return Array.from({ length: count }).map(() => ({
      pos: [
        (Math.random() - 0.5) * w,
        (Math.random() - 0.5) * h,
        (Math.random() - 0.5) * d + (Math.random() > 0.5 ? d/2 : -d/2),
      ] as [number, number, number],
      visible: Math.random() > 0.5,
    }));
  }, [w, h, d]);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    refs.current.forEach((ref) => {
      if (ref && Math.random() < 0.002) {
        ref.visible = !ref.visible;
      }
    });
  });

  return (
    <group>
      {lights.map((l, i) => (
        <mesh
          key={i}
          position={l.pos}
          ref={(el) => { refs.current[i] = el; }}
          visible={l.visible}
        >
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color={BRAND_BLUE} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

const gridVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragment = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    vec2 grid = abs(fract(vUv * 54.0 - 0.5) - 0.5) / fwidth(vUv * 54.0);
    float line = min(grid.x, grid.y);
    float g = 1.0 - min(line, 1.0);
    
    float dist = length(vUv - 0.5) * 2.0;
    float fade = 1.0 - smoothstep(0.0, 0.95, dist);
    
    float pulseA = pow(max(0.0, sin(dist * 5.0 - uTime * 0.4) * 0.5 + 0.5), 3.0);
    float alpha = g * fade * 0.1 + pulseA * fade * 0.02;
    
    gl_FragColor = vec4(uColorA, alpha);
  }
`;

function GlowingGrid() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, -3.5, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[45, 45, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        transparent
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(BRAND_BLUE) },
          uColorB: { value: new THREE.Color(BRAND_GREEN) },
        }}
      />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ cx: 0, cy: 0, tx: 0, ty: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5);
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5);
    };
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    mouse.current.cx += (mouse.current.tx - mouse.current.cx) * 0.02;
    mouse.current.cy += (mouse.current.ty - mouse.current.cy) * 0.02;

    const scrollProgress = Math.min(scroll.current / window.innerHeight, 1);
    
    camera.position.x = mouse.current.cx * 0.5;
    camera.position.y = 1.0 - mouse.current.cy * 0.3;
    camera.position.z = 12 + scrollProgress * 5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x020408, 0.025);
    scene.background = new THREE.Color(0x020408);
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  return (
    <>
      <ambientLight color={0x020408} intensity={0.5} />
      <pointLight position={[0, 10, 10]} color={BRAND_BLUE} intensity={2} distance={50} />
      <pointLight position={[10, -5, 5]} color={BRAND_GREEN} intensity={1} distance={30} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1, 12], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneSetup />
        <CameraRig />
        <Cityscape />
        <GlowingGrid />
      </Suspense>
    </Canvas>
  );
}