import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec3  uAccentColor;
  uniform float uAccentStrength;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float t = uTime * 0.55;

    vec3 noisePos = vec3(vUv * 2.5 + uMouse * 0.9, t);
    float n1 = snoise(noisePos) * 0.5 + 0.5;
    float n2 = snoise(noisePos + vec3(3.7, 1.3, 0.9)) * 0.5 + 0.5;
    float n3 = snoise(noisePos + vec3(1.1, 4.2, 2.1)) * 0.5 + 0.5;

    vec2 mouseInfluence = uMouse * 0.15;
    float mx = vUv.x + mouseInfluence.x;
    float my = vUv.y + mouseInfluence.y;

    vec3 pink    = vec3(0.95, 0.38, 0.65);
    vec3 orange  = vec3(0.95, 0.62, 0.22);
    vec3 purple  = vec3(0.45, 0.20, 0.85);
    vec3 blue    = vec3(0.22, 0.42, 0.95);
    vec3 hotpink = vec3(0.90, 0.15, 0.55);

    vec3 col = mix(pink,    orange,  n1);
    col       = mix(col,    purple,  n2 * 0.7);
    col       = mix(col,    blue,    n3 * (1.0 - vUv.y));
    col       = mix(col,    hotpink, smoothstep(0.6, 1.0, n1 * n2) * 0.5);
    col = mix(col, blue,  smoothstep(0.5, 0.0, vUv.y) * 0.5);
    col = mix(col, pink,  smoothstep(0.4, 1.0, mx) * smoothstep(0.4, 1.0, my) * 0.4);

    // Rim — tinted toward accent when active
    float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);
    rim = pow(rim, 1.8);
    vec3 rimBase  = mix(blue, purple, n1);
    vec3 rimColor = mix(rimBase, uAccentColor, uAccentStrength * 0.55) * 2.2;
    col += rimColor * rim * 0.7;

    // Mouse hotspot
    vec2 m = clamp(uMouse * 0.75, vec2(-0.75), vec2(0.75));
    float mz = sqrt(max(0.0, 1.0 - dot(m, m)));
    vec3 mouseDir   = normalize(vec3(m.x, m.y, mz));
    float mouseHot  = smoothstep(0.3, 1.0, dot(vNormal, mouseDir));
    col += mix(pink, vec3(1.0, 0.9, 1.0), 0.35) * mouseHot * 0.60;

    // Specular
    vec3 lightDir = normalize(vec3(0.5 + uMouse.x * 0.7, 0.6 + uMouse.y * 0.55, 1.0));
    float spec = pow(max(dot(vNormal, lightDir), 0.0), 12.0);
    col += vec3(1.0, 0.95, 1.0) * spec * 0.55;

    // Accent wash — card hover response
    col = mix(col, uAccentColor * 1.15, uAccentStrength * 0.55);
    col *= mix(1.15, 1.30, uAccentStrength);

    float edgeFade = dot(vNormal, vec3(0.0, 0.0, 1.0));
    float alpha = smoothstep(-0.05, 0.35, edgeFade);

    gl_FragColor = vec4(col, alpha);
  }
`;

interface OrbProps {
  accentColor: [number, number, number] | null;
}

function OrbSphere({ accentColor }: OrbProps) {
  const meshRef        = useRef<THREE.Mesh>(null);
  const matRef         = useRef<THREE.ShaderMaterial>(null);
  const mouse          = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const accentStrength = useRef(0);
  const accentVec      = useRef(new THREE.Vector3(0.95, 0.38, 0.65));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.03;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.03;

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);

      // Lerp accent strength
      const targetStrength = accentColor ? 1.0 : 0.0;
      accentStrength.current += (targetStrength - accentStrength.current) * 0.055;
      matRef.current.uniforms.uAccentStrength.value = accentStrength.current;

      // Lerp accent color toward whichever card is hovered (holds last color while fading out)
      if (accentColor) {
        accentVec.current.x += (accentColor[0] - accentVec.current.x) * 0.055;
        accentVec.current.y += (accentColor[1] - accentVec.current.y) * 0.055;
        accentVec.current.z += (accentColor[2] - accentVec.current.z) * 0.055;
      }
      matRef.current.uniforms.uAccentColor.value.copy(accentVec.current);
    }

    if (meshRef.current) {
      const s = 1.0 + Math.sin(state.clock.elapsedTime * 0.4) * 0.012;
      meshRef.current.scale.setScalar(s);
      meshRef.current.rotation.y = mouse.current.x * 0.45;
      meshRef.current.rotation.x = -mouse.current.y * 0.30;
    }
  });

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uMouse:          { value: new THREE.Vector2(0, 0) },
    uAccentColor:    { value: new THREE.Vector3(0.95, 0.38, 0.65) },
    uAccentStrength: { value: 0 },
  }), []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.65, 128, 128]} />
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

interface GlowingSphereProps {
  accentColor?: [number, number, number] | null;
}

export default function GlowingSphere({ accentColor = null }: GlowingSphereProps) {
  // Hold last accent so bloom colour doesn't snap to black while fading out
  const lastAccent = useRef<[number, number, number]>([230 / 255, 80 / 255, 160 / 255]);
  if (accentColor) lastAccent.current = accentColor;
  const [r, g, b] = lastAccent.current.map((v) => Math.round(v * 255));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>

      {/* Default atmospheric bloom */}
      <div style={{
        position: "absolute", inset: "-20%",
        background: [
          "radial-gradient(ellipse at 65% 30%, rgba(230, 80, 160, 0.28) 0%, transparent 50%)",
          "radial-gradient(ellipse at 25% 55%, rgba(120, 40, 220, 0.22) 0%, transparent 50%)",
          "radial-gradient(ellipse at 50% 80%, rgba(40, 80, 230, 0.20) 0%, transparent 45%)",
        ].join(", "),
        filter: "blur(30px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Accent bloom — cross-fades in when a card is hovered */}
      <div style={{
        position: "absolute", inset: "-20%",
        background: `radial-gradient(ellipse at center, rgba(${r}, ${g}, ${b}, 0.40) 0%, transparent 62%)`,
        filter: "blur(38px)",
        opacity: accentColor ? 1 : 0,
        transition: "opacity 0.55s ease",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "transparent", position: "relative", zIndex: 1 }}
      >
        <OrbSphere accentColor={accentColor} />
      </Canvas>
    </div>
  );
}
