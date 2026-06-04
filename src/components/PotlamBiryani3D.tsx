import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const PotlamBiryani3D: React.FC<{ active: boolean }> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null);


  // Deform a sphere to create a banana leaf potlam bag pouch shape
  const pouchGeometry = useMemo(() => {
    const geom = new THREE.SphereGeometry(0.8, 32, 32);
    const pos = geom.attributes.position as THREE.BufferAttribute;
    
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Squish the bottom slightly
      if (y < -0.2) {
        y = y * 0.7;
      }
      
      // Pull in the neck of the pouch
      if (y > 0.25 && y < 0.6) {
        const neckFactor = 1.0 - (y - 0.25) * 1.5; // pull inward
        x *= Math.max(0.35, neckFactor);
        z *= Math.max(0.35, neckFactor);
      }
      
      // Flare out the leaf top frills
      if (y >= 0.6) {
        const flareFactor = 1.0 + (y - 0.6) * 2.5; // expand outward
        x *= flareFactor;
        z *= flareFactor;
        y *= 1.1; // stretch upwards
      }

      // Add natural organic leaf folds (sinusoidal waves)
      const angle = Math.atan2(z, x);
      const wave = Math.sin(angle * 8) * 0.05; // 8 vertical leaf rib folds
      
      // Apply displacement (only on body of the pouch, not the top flare)
      if (y < 0.5) {
        x += Math.cos(angle) * wave;
        z += Math.sin(angle) * wave;
      }

      pos.setXYZ(i, x, y, z);
    }
    
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Rotate and bob the Potlam Biryani
  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y = -state.clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.05 - 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={[1.8, 1.8, 1.8]}>
      {/* 1. Platter / Base Plate */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.4, 0.06, 32]} />
        <meshStandardMaterial 
          color="#0F0F0F" // Ceramic matte black plate
          roughness={0.5} 
          metalness={0.2}
        />
      </mesh>

      {/* Gold Ring around the Platter Rim */}
      <mesh position={[0, -0.61, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.025, 8, 48]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* 2. Banana Leaf Wrapped Pouch (Potlam) */}
      <mesh geometry={pouchGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#4C6E2F" // Rich leaf green
          roughness={0.7}
          metalness={0.1}
          flatShading={false}
          bumpScale={0.05}
        />
      </mesh>

      {/* Under Leaf highlight (yellowish green tones) */}
      <mesh geometry={pouchGeometry} scale={[0.99, 0.99, 0.99]}>
        <meshStandardMaterial 
          color="#6D8B38" // Lighter green leaf shade
          roughness={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 3. The Pouch Tie / String */}
      <mesh position={[0, 0.38, 0]} rotation={[Math.PI / 2 + 0.1, 0, 0]} castShadow>
        <torusGeometry args={[0.22, 0.04, 8, 24]} />
        <meshStandardMaterial 
          color="#A87C43" // Hemp/jute rope brown
          roughness={0.9}
        />
      </mesh>

      {/* 4. Little spices / rice grains escaping the top frill (ambient detail) */}
      <group position={[0, 0.72, 0]}>
        {/* Cardamom Pod */}
        <mesh position={[0.08, 0.02, 0.05]} rotation={[0.4, 0.2, 0.8]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#889C54" roughness={0.8} />
        </mesh>
        
        {/* Star Anise point */}
        <mesh position={[-0.08, 0.01, -0.05]} rotation={[0.1, 0.9, 0.3]}>
          <coneGeometry args={[0.025, 0.08, 5]} />
          <meshStandardMaterial color="#5C3A21" roughness={0.9} />
        </mesh>
        
        {/* Saffron strands */}
        <mesh position={[0.02, 0.05, -0.08]} rotation={[0.8, -0.3, 0.4]}>
          <cylinderGeometry args={[0.005, 0.005, 0.08, 8]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.5} />
        </mesh>
      </group>

      {/* Custom lighting for Biryani gold-green glow */}
      <spotLight 
        position={[2, 3, 2]} 
        intensity={3.0} 
        angle={Math.PI / 4}
        penumbra={0.6}
        castShadow
      />
    </group>
  );
};
