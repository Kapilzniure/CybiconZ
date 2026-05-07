import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshPhongMaterial color={0x2D1B69} shininess={30} transparent opacity={0.85} wireframe={false} />
      </mesh>
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[2.22, 64, 64]} />
        <meshBasicMaterial color={0x7C3AED} transparent opacity={0.18} wireframe={true} />
      </mesh>
      <mesh ref={wireframe2Ref}>
        <sphereGeometry args={[2.8, 24, 24]} />
        <meshBasicMaterial color={0xA855F7} transparent opacity={0.06} wireframe={true} />
      </mesh>
      <ambientLight color={0xffffff} intensity={0.25} />
      <pointLight position={[5, 5, 5]} color={0x7C3AED} intensity={6} distance={20} />
      <pointLight position={[-5, -3, 3]} color={0xEC4899} intensity={3} distance={15} />
      <pointLight position={[0, 6, 0]} color={0x06B6D4} intensity={2} distance={12} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <Sphere />
    </Canvas>
  );
}
