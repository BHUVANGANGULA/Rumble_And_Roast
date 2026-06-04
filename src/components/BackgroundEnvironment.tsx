import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const BackgroundEnvironment: React.FC = () => {
  const dustParticlesRef = useRef<THREE.Points>(null);
  const beansGroupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Create ambient dust particles
  const dustCount = 180;
  const [dustPositions, dustSpeeds, dustPhases] = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    const spd = new Float32Array(dustCount * 3);
    const phs = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      // Wide dispersion
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z

      // Drifting speed
      spd[i * 3] = (Math.random() - 0.5) * 0.003;
      spd[i * 3 + 1] = (Math.random() + 0.1) * 0.004; // drift upward
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      phs[i * 3] = Math.random() * 50;
      phs[i * 3 + 1] = Math.random() * 50;
      phs[i * 3 + 2] = Math.random() * 50;
    }
    return [pos, spd, phs];
  }, []);

  const dustGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    return geo;
  }, [dustPositions]);

  // Create background floating coffee beans
  const beansCount = 20;
  const beansData = useMemo(() => {
    const data = [];
    for (let i = 0; i < beansCount; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 4
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: (0.12 + Math.random() * 0.1) as number,
        spinSpeed: (Math.random() - 0.5) * 0.4,
        driftSpeed: (Math.random() + 0.2) * 0.1,
        phase: Math.random() * 100
      });
    }
    return data;
  }, []);

  // Animate dust particles and coffee beans
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 1. Dust Particles Animation
    if (dustParticlesRef.current) {
      const posAttr = dustParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dustCount; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        // Move upward
        y += dustSpeeds[i * 3 + 1];
        x += dustSpeeds[i * 3] + Math.sin(time * 0.5 + dustPhases[i * 3]) * 0.001;
        z += dustSpeeds[i * 3 + 2];

        // Wrap around boundary bounds
        if (y > 7.5) y = -7.5;
        if (x > 10) x = -10;
        if (x < -10) x = 10;
        
        posAttr.setXYZ(i, x, y, z);
      }
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Slight mouse react
      dustParticlesRef.current.rotation.x = mouse.y * 0.08;
      dustParticlesRef.current.rotation.y = mouse.x * 0.08;
    }

    // 2. Coffee Beans Animation
    if (beansGroupRef.current) {
      beansGroupRef.current.children.forEach((child, index) => {
        const data = beansData[index];
        if (child) {
          // Bobbing up and down
          child.position.y = data.position[1] + Math.sin(time * data.driftSpeed + data.phase) * 0.25;
          // Drifting left/right
          child.position.x = data.position[0] + Math.cos(time * 0.2 + data.phase) * 0.15;
          // Spin
          child.rotation.x += 0.002;
          child.rotation.y += 0.003;
        }
      });
      
      // Rotate whole container slightly based on mouse
      beansGroupRef.current.rotation.x = mouse.y * 0.05;
      beansGroupRef.current.rotation.y = mouse.x * 0.05;
    }
  });

  return (
    <group>
      {/* Golden ambient dust glow */}
      <points ref={dustParticlesRef} geometry={dustGeometry}>
        <pointsMaterial
          color="#D4AF37"
          size={0.045}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Floating Coffee Beans */}
      <group ref={beansGroupRef}>
        {beansData.map((bean, idx) => (
          <group 
            key={idx} 
            position={bean.position} 
            rotation={bean.rotation}
            scale={[bean.scale * 1.6, bean.scale * 0.9, bean.scale * 1.1]} // squashed to look like a bean
          >
            {/* Bean halves split by crease */}
            <mesh castShadow>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial 
                color="#3D200E" // Deep bean brown
                roughness={0.8}
                metalness={0.05}
              />
            </mesh>
            
            {/* Bean center crease lines */}
            <mesh scale={[1.02, 0.35, 1.02]}>
              <boxGeometry args={[2.0, 0.2, 0.06]} />
              <meshStandardMaterial color="#1C120C" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
