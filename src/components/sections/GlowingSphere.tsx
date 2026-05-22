import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // Animated light position
    vec3 lightDir = normalize(vec3(
      0.4 + sin(uTime * 0.3) * 0.3 + uMouse.x * 0.4,
      0.5 + cos(uTime * 0.25) * 0.2 + uMouse.y * 0.3,
      1.0
    ));

    float diff = max(dot(vNormal, lightDir), 0.0);
    float lighting = 0.2 + diff * 0.8;

    // Three distinct colors
    vec3 pink   = vec3(0.85, 0.40, 0.65); // warm pink
    vec3 purple = vec3(0.42, 0.15, 0.72); // deep purple
    vec3 blue   = vec3(0.22, 0.35, 0.85); // cool blue

    // Time-animated blend
    float ta = sin(uTime * 0.28) * 0.5 + 0.5;
    float tb = cos(uTime * 0.22 + 1.5) * 0.5 + 0.5;
    float tc = sin(uTime * 0.35 + 3.0) * 0.5 + 0.5;

    // UV-based gradient — pink upper-right, blue lower, purple left
    vec3 col = mix(pink,   purple, clamp(vUv.y * 1.2 - ta * 0.3, 0.0, 1.0));
    col       = mix(col,   blue,   clamp((1.0 - vUv.x) * 0.6 + tb * 0.3, 0.0, 1.0) * (1.0 - vUv.y * 0.5));
    col       = mix(col,   pink,   clamp(vUv.x * tc * 0.5, 0.0, 1.0));

    col *= lighting;

    // Specular highlight
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 48.0);
    col += vec3(spec * 0.6, spec * 0.5, spec * 0.9) * 0.5;

    // Edge transparency — soft fade at silhouette
    float rim = dot(vNormal, vec3(0.0, 0.0, 1.0));
    float alpha = smoothstep(0.0, 0.25, rim);

    gl_FragColor = vec4(col, alpha);
  }
`;

// Atmospheric glow — rendered as a fullscreen quad behind sphere
const bgVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const bgFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);

    // Animated glow colors
    vec3 glowPink   = vec3(0.65, 0.15, 0.45);
    vec3 glowPurple = vec3(0.28, 0.08, 0.55);
    vec3 glowBlue   = vec3(0.10, 0.12, 0.50);

    float t = sin(uTime * 0.25) * 0.5 + 0.5;
    vec3 glowCol = mix(glowPurple, glowPink, t);
    glowCol = mix(glowCol, glowBlue, sin(uTime * 0.18 + 1.0) * 0.5 + 0.5);

    // Soft radial glow — only within sphere radius
    float glow = smoothstep(0.52, 0.18, dist);
    float alpha = glow * 0.18;

    gl_FragColor = vec4(glowCol, alpha);
  }
`;

function AtmosphericGlow() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={bgVertexShader}
        fragmentShader={bgFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.ShaderMaterial>(null);
  const mouse   = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

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

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.07 + mouse.current.x * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.08 + mouse.current.y * 0.10;
      const s = 1.0 + Math.sin(t * 0.55) * 0.018;
      meshRef.current.scale.setScalar(s);
    }

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    }
  });

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  return (
    <mesh ref={meshRef} renderOrder={1}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function GlowingSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 38 }}
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
      }}
    >
      <AtmosphericGlow />
      <Sphere />
    </Canvas>
  );
}
