'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Plane } from '@react-three/drei';
import { Vector3, Color } from 'three';
import styles from './SimWorldPreview.module.css';

// Simple building component
function OfficeBuilding({ position, color = "#667eea" }: { position: [number, number, number], color?: string }) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Main building */}
      <Box ref={meshRef} args={[2, 4, 2]} position={[0, 2, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Building base */}
      <Box args={[2.2, 0.2, 2.2]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#444444" />
      </Box>
      
      {/* Windows */}
      <Box args={[0.3, 0.4, 0.1]} position={[-0.6, 2.5, 1.05]}>
        <meshStandardMaterial color="#ffff88" emissive="#ffff44" emissiveIntensity={0.3} />
      </Box>
      <Box args={[0.3, 0.4, 0.1]} position={[0.6, 2.5, 1.05]}>
        <meshStandardMaterial color="#ffff88" emissive="#ffff44" emissiveIntensity={0.3} />
      </Box>
      <Box args={[0.3, 0.4, 0.1]} position={[-0.6, 1.5, 1.05]}>
        <meshStandardMaterial color="#ffff88" emissive="#ffff44" emissiveIntensity={0.3} />
      </Box>
      <Box args={[0.3, 0.4, 0.1]} position={[0.6, 1.5, 1.05]}>
        <meshStandardMaterial color="#ffff88" emissive="#ffff44" emissiveIntensity={0.3} />
      </Box>
    </group>
  );
}

// Player character component
function PlayerCharacter({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Body */}
      <Box ref={meshRef} args={[0.4, 0.8, 0.3]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#00d4ff" />
      </Box>
      
      {/* Head */}
      <Box args={[0.3, 0.3, 0.3]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Box>
      
      {/* Shadow */}
      <Plane args={[0.8, 0.8]} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#000000" transparent opacity={0.3} />
      </Plane>
    </group>
  );
}

// Quest marker component
function QuestMarker({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  );
}

// Ground plane
function Ground() {
  return (
    <Plane args={[20, 20]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#2a4d3a" />
    </Plane>
  );
}

// Camera controller for isometric view
function IsometricCamera() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Set isometric-style camera position
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

// Main world scene
function WorldScene() {
  return (
    <>
      <IsometricCamera />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00d4ff" />

      {/* Ground */}
      <Ground />

      {/* Buildings */}
      <OfficeBuilding position={[-4, 0, -2]} color="#667eea" />
      <OfficeBuilding position={[4, 0, -2]} color="#764ba2" />
      <OfficeBuilding position={[0, 0, -6]} color="#f093fb" />
      
      {/* Coffee shop (smaller building) */}
      <group position={[-6, 0, 4]}>
        <Box args={[1.5, 2, 1.5]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          ☕ Café
        </Text>
      </group>

      {/* Player character */}
      <PlayerCharacter position={[0, 0, 2]} />

      {/* Quest markers */}
      <QuestMarker position={[-4, 5, -2]} />
      <QuestMarker position={[4, 5, -2]} />
      <QuestMarker position={[0, 3, -6]} />

      {/* Environment */}
      <Environment preset="city" />
    </>
  );
}

export default function SimWorldPreview() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.worldContainer}>
      <div className={styles.worldCanvas}>
        <Canvas
          shadows
          camera={{ position: [10, 8, 10], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB, #98FB98)' }}
        >
          <Suspense fallback={null}>
            <WorldScene />
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </div>
      
      <div className={styles.worldUI}>
        <div className={styles.instructions}>
          <h3>🎮 Interactive Demo</h3>
          <p>• Drag to rotate the camera</p>
          <p>• Scroll to zoom in/out</p>
          <p>• Explore the SimWork office world</p>
        </div>
        
        <div className={styles.worldInfo}>
          <div className={styles.infoCard}>
            <span className={styles.icon}>🏢</span>
            <div>
              <h4>Office Buildings</h4>
              <p>Different departments with specialized tools</p>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <span className={styles.icon}>👤</span>
            <div>
              <h4>Your Character</h4>
              <p>Navigate and interact with the world</p>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <span className={styles.icon}>⭐</span>
            <div>
              <h4>Quest Markers</h4>
              <p>Available tasks and challenges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
