"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NODE_COUNT = 200;
const GLOBE_RADIUS = 2.5;

function GlobePoints() {
  const meshRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();
  const { pointer } = useThree();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const col = new Float32Array(NODE_COUNT * 3);

    const blue = new THREE.Color("#60a5fa");
    const violet = new THREE.Color("#8b5cf6");
    const cyan = new THREE.Color("#22d3ee");
    const colorOptions = [blue, violet, cyan];

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = GLOBE_RADIUS * (0.9 + Math.random() * 0.2);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = colorOptions[i % 3];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.y += delta * 0.05;
    meshRef.current.rotation.x = pointer.y * 0.1;
    meshRef.current.rotation.z = pointer.x * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GlobeWireframe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
      <meshBasicMaterial wireframe color="#60a5fa" transparent opacity={0.05} />
    </mesh>
  );
}

export function DataGlobe() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        aria-label="Decorative data visualization globe"
        role="img"
      >
        <ambientLight intensity={0.5} />
        <GlobePoints />
        <GlobeWireframe />
      </Canvas>
    </div>
  );
}
