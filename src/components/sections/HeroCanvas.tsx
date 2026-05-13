import { useEffect, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BRAND_BLUE = "#00C4FF";
const BRAND_GREEN = "#39FF14";

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
  // Far background buildings
  { w: 0.6, h: 3.5, d: 0.6, x: -11.0, z: -9 },
  { w: 0.8, h: 4.5, d: 0.8, x: -9.5, z: -11 },
  { w: 0.5, h: 3.0, d: 0.5, x: -5.0, z: -10 },
  { w: 0.7, h: 5.5, d: 0.7, x: 5.0, z: -11 },
  { w: 0.9, h: 4.0, d: 0.9, x: 9.5, z: -10 },
  { w: 0.6, h: 3.2, d: 0.6, x: 11.0, z: -8.5 },
];

function Building({ b, index }: { b: typeof BUILDINGS[0]; index: number }) {
  const meshRef = useRef<THREE.LineSegments>(null);
  
  const baseOpacity = useMemo(() => {
    if (b.z > -4) return 0.06;
    if (b.z >= -7) return 0.04;
    return 0.025;
  }, [b.z]);

  const yPos = -3.5 + b.h / 2;

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.LineBasicMaterial;
      material.opacity = baseOpacity + Math.sin(state.clock.elapsedTime * 0.3 + index * 0.7) * 0.01;
    }
  });

  return (
    <group position={[b.x, yPos, b.z]}>
      <lineSegments ref={meshRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.d)]} />
        <lineBasicMaterial color={BRAND_BLUE} transparent opacity={baseOpacity} />
      </lineSegments>
      <BuildingLights w={b.w} h={b.h} d={b.d} />
    </group>
  );
}

function Cityscape() {
  return (
    <group>
      {BUILDINGS.map((b, i) => (
        <Building key={i} b={b} index={i} />
      ))}
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

function FloatingParticles() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);
    
    const colorBlue = new THREE.Color(BRAND_BLUE);
    const colorGreen = new THREE.Color(BRAND_GREEN);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24; // x [-12, 12]
      pos[i * 3 + 1] = Math.random() * 10 - 2; // y [-2, 8]
      pos[i * 3 + 2] = -Math.random() * 8 - 2; // z [-2, -10]
      
      spd[i] = 0.5 + Math.random() * 1.5; // speed 0.5 - 2.0
      
      const isGreen = Math.random() > 0.8;
      const c = isGreen ? colorGreen : colorBlue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, spd, col];
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      const posAttr = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        let y = posAttr.getY(i);
        y += 0.002 * speeds[i];
        if (y > 8) y = -2;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

const mistVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mistFragment = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float dist = length(vUv - 0.5) * 2.0;
    float alpha = smoothstep(1.0, 0.0, dist) * 0.08;
    
    // Slow drift
    float wave = sin(vUv.x * 10.0 + uTime * 0.015) * 0.02;
    alpha *= (0.8 + wave);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function GroundMist() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, -3.4, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={mistVertex}
        fragmentShader={mistFragment}
        transparent
        depthWrite={false}
        alphaTest={0.01}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(BRAND_BLUE) }
        }}
      />
    </mesh>
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
    
    // Primary pulse
    float pulseA = pow(max(0.0, sin(dist * 5.0 - uTime * 0.4) * 0.5 + 0.5), 3.0);
    // Secondary slower pulse ring
    float pulseB = pow(max(0.0, sin(dist * 3.0 - uTime * 0.2) * 0.5 + 0.5), 2.0);
    
    // Scanline effect
    float scanline = sin(vUv.y * 500.0) * 0.01;
    
    // Color mixing wave
    vec3 color = mix(uColorA, uColorB, sin(uTime * 0.1 + vUv.x * 2.0) * 0.5 + 0.5);
    
    float alpha = (g * fade * 0.1) + (pulseA * fade * 0.02) + (pulseB * fade * 0.01) + scanline;
    
    gl_FragColor = vec4(color, alpha);
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
  const mouse = useRef({ cx: 0, cy: 0, tx: 0, ty: 0, lastMove: Date.now() });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5);
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5);
      mouse.current.lastMove = Date.now();
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

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const isIdle = Date.now() - mouse.current.lastMove > 3000;

    mouse.current.cx += (mouse.current.tx - mouse.current.cx) * 0.015;
    mouse.current.cy += (mouse.current.ty - mouse.current.cy) * 0.015;

    const scrollProgress = Math.min(scroll.current / window.innerHeight, 1);
    
    let targetX = mouse.current.cx * 0.5;
    let targetY = 1.0 - mouse.current.cy * 0.3;
    
    if (isIdle) {
      targetX += Math.sin(time * 0.1) * 0.3;
    }

    camera.position.x = targetX;
    camera.position.y = targetY - scrollProgress * 0.8;
    camera.position.z = 12;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneSetup() {
  const { scene } = useThree();
  const blueLightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x020408, 0.018);
    scene.background = new THREE.Color(0x020408);
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  useFrame((state) => {
    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 8;
    }
  });

  return (
    <>
      <ambientLight color={0x020408} intensity={0.3} />
      <pointLight 
        ref={blueLightRef}
        position={[0, 10, 10]} 
        color={BRAND_BLUE} 
        intensity={2} 
        distance={50} 
      />
      <pointLight position={[10, -5, 5]} color={BRAND_GREEN} intensity={1} distance={30} />
      <pointLight position={[0, 8, -5]} color={BRAND_GREEN} intensity={0.4} distance={25} />
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
        <FloatingParticles />
        <GroundMist />
        <GlowingGrid />
      </Suspense>
    </Canvas>
  );
}