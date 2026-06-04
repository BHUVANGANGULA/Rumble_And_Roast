import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CoffeeCup3D: React.FC<{ active: boolean }> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null);
  const steamParticlesRef = useRef<THREE.Points>(null);

  // Rotate cup slowly
  useFrame((state) => {
    if (groupRef.current && active) {
      // Gentle floating and self rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08 - 0.2;
    }
  });

  // Steam particle setup
  const particleCount = 65;
  const [positions, speeds, phs] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    const phs = new Float32Array(particleCount * 3); // random offset values
    
    for (let i = 0; i < particleCount; i++) {
      // Random starting positions inside the coffee cup rim
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.45;
      pos[i * 3] = Math.cos(angle) * radius; // x
      pos[i * 3 + 1] = 0.5 + Math.random() * 1.5; // y (height)
      pos[i * 3 + 2] = Math.sin(angle) * radius; // z

      spd[i] = 0.01 + Math.random() * 0.015; // speed going up
      
      phs[i * 3] = Math.random() * 100;
      phs[i * 3 + 1] = Math.random() * 100;
      phs[i * 3 + 2] = Math.random() * 100;
    }
    return [pos, spd, phs];
  }, []);

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  // Animate steam particles rising
  useFrame((state) => {
    if (steamParticlesRef.current) {
      const positionAttr = steamParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < particleCount; i++) {
        let x = positionAttr.getX(i);
        let y = positionAttr.getY(i);
        let z = positionAttr.getZ(i);

        // Move up
        y += speeds[i];

        // Apply noise-like drift based on sine waves and phases
        x += Math.sin(time * 2 + phs[i * 3]) * 0.003;
        z += Math.cos(time * 1.5 + phs[i * 3 + 2]) * 0.003;

        // Reset if it goes too high
        if (y > 2.8) {
          y = 0.5; // Back to cup surface
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.45;
          x = Math.cos(angle) * radius;
          z = Math.sin(angle) * radius;
        }

        positionAttr.setXYZ(i, x, y, z);
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.8, 1.8, 1.8]}>
      {/* 1. Saucer / Plate */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.2, 0.08, 32]} />
        <meshStandardMaterial 
          color="#1A1512" 
          roughness={0.4} 
          metalness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Gold Rim on Saucer */}
      <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.02, 8, 48]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* 2. Cup Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.7, 1.1, 32]} />
        <meshStandardMaterial 
          color="#1A1512" 
          roughness={0.3} 
          metalness={0.2}
        />
      </mesh>

      {/* Gold Ring around the Cup Base */}
      <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.73, 0.03, 8, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Cup Rim Gold Accent */}
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.025, 8, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* 3. Cup Handle */}
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <torusGeometry args={[0.35, 0.09, 12, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#1A1512" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 4. Coffee Liquid */}
      <mesh position={[0, 0.48, 0]} receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.05, 32]} />
        <meshStandardMaterial 
          color="#422510" // Dark espresso brown
          roughness={0.1} 
          metalness={0.5} 
        />
      </mesh>

      {/* Latte Art (cream pattern) */}
      <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.01, 0.45, 32]} />
        <meshStandardMaterial 
          color="#EADBC8" // Cream
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 5. Dynamic Steam Particles */}
      <points ref={steamParticlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color="#F3E5AB" // Warm gold/cream glowing steam
          size={0.06}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Cup spotlight shadow helper */}
      <directionalLight 
        position={[2, 4, 1]} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />
    </group>
  );
};
