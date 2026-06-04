import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { CoffeeCup3D } from './CoffeeCup3D';
import { PotlamBiryani3D } from './PotlamBiryani3D';
import { BackgroundEnvironment } from './BackgroundEnvironment';
import * as THREE from 'three';

interface ThreeCanvasProps {
  activeSection: string;
}

// Camera and scene transition controller
const SceneController: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const { camera } = useThree();
  
  // Target position and rotation state
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5));
  const targetCamLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Update targets based on scroll section
  useEffect(() => {
    // Media Query check for mobile responsiveness
    const isMobile = window.innerWidth < 768;

    switch (activeSection) {
      case 'home':
        // Model placed on the right side for desktop, centered for mobile
        targetCamPos.current.set(isMobile ? 0 : -0.8, 0, 4.5);
        targetCamLookAt.current.set(isMobile ? 0 : 1.2, 0, 0);
        break;
      case 'about':
        // Camera moves back slightly, model shifts left
        targetCamPos.current.set(isMobile ? 0 : 1.0, 0.5, 5.0);
        targetCamLookAt.current.set(isMobile ? 0 : -1.2, 0, 0);
        break;
      case 'services':
        // Ambient perspective, camera angles down slightly
        targetCamPos.current.set(0, 2.0, 6.0);
        targetCamLookAt.current.set(0, 0, 0);
        break;
      case 'menu':
        // Showcase Biryani on the right (desktop) or centered (mobile)
        targetCamPos.current.set(isMobile ? 0 : -0.8, 0, 4.5);
        targetCamLookAt.current.set(isMobile ? 0 : 1.2, 0, 0);
        break;
      case 'gallery':
      case 'reservations':
      case 'contact':
        // High zoom out / ambient particle view
        targetCamPos.current.set(0, 0, 8.5);
        targetCamLookAt.current.set(0, 0, 0);
        break;
      default:
        targetCamPos.current.set(0, 0, 5);
        targetCamLookAt.current.set(0, 0, 0);
    }
  }, [activeSection]);

  // Smoothly interpolate camera position and lookAt direction
  useFrame(() => {
    // Lerp Camera position
    camera.position.lerp(targetCamPos.current, 0.05);

    // Lerp camera lookAt by adjusting helper target
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    const targetDirection = new THREE.Vector3().subVectors(targetCamLookAt.current, camera.position).normalize();
    const targetLookAtPoint = camera.position.clone().add(targetDirection.multiplyScalar(5));
    
    currentLookAt.lerp(targetLookAtPoint, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
};

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ activeSection }) => {
  // Determine coordinate offset for model groups based on responsive layout
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const modelXOffset = isMobile ? 0 : 1.8;

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        className="w-full h-full pointer-events-auto"
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        
        {/* Cinematic Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        
        {/* Moody Fill Light */}
        <pointLight position={[-6, 2, -2]} intensity={0.8} color="#4A2C11" />
        
        {/* Gold Accent Light */}
        <pointLight position={[0, -2, 3]} intensity={1.5} color="#D4AF37" />

        {/* Global Particles */}
        <BackgroundEnvironment />

        {/* 1. Hero / Home: 3D Coffee Cup */}
        <group 
          position={[modelXOffset, 0, 0]} 
          visible={activeSection === 'home' || activeSection === 'about'}
        >
          <CoffeeCup3D active={activeSection === 'home' || activeSection === 'about'} />
        </group>

        {/* 2. Menu Section: 3D Potlam Biryani */}
        <group 
          position={[modelXOffset, 0, 0]} 
          visible={activeSection === 'menu'}
        >
          <PotlamBiryani3D active={activeSection === 'menu'} />
        </group>

        {/* Scene Camera Transitions */}
        <SceneController activeSection={activeSection} />

        <Preload all />
      </Canvas>
    </div>
  );
};
