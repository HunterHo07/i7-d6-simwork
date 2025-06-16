'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Plane, Cylinder, Sphere } from '@react-three/drei';
import { Vector3, Color } from 'three';
import DeveloperDesk from '@/components/workstations/DeveloperDesk';
import DesignStudio from '@/components/workstations/DesignStudio';
import ProjectManagementDesk from '@/components/workstations/ProjectManagementDesk';
import styles from './SimWorldScene.module.css';

// Office Building Component
function OfficeBuilding({ 
  position, 
  size = [2, 4, 2], 
  color = "#667eea",
  name = "Office"
}: { 
  position: [number, number, number], 
  size?: [number, number, number],
  color?: string,
  name?: string
}) {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
    }
  });

  return (
    <group position={position}>
      {/* Main building */}
      <Box 
        ref={meshRef} 
        args={size} 
        position={[0, size[1] / 2, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#8a9fff" : color} 
          roughness={0.3}
          metalness={0.1}
        />
      </Box>
      
      {/* Building base */}
      <Box args={[size[0] + 0.2, 0.2, size[2] + 0.2]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#444444" />
      </Box>
      
      {/* Windows - Front face */}
      {Array.from({ length: Math.floor(size[1] / 1.2) }, (_, floor) => (
        <group key={`front-${floor}`}>
          <Box args={[0.3, 0.4, 0.1]} position={[-size[0] * 0.3, 1 + floor * 1.2, size[2] / 2 + 0.05]}>
            <meshStandardMaterial 
              color="#ffff88" 
              emissive="#ffff44" 
              emissiveIntensity={0.3} 
            />
          </Box>
          <Box args={[0.3, 0.4, 0.1]} position={[size[0] * 0.3, 1 + floor * 1.2, size[2] / 2 + 0.05]}>
            <meshStandardMaterial 
              color="#ffff88" 
              emissive="#ffff44" 
              emissiveIntensity={0.3} 
            />
          </Box>
        </group>
      ))}
      
      {/* Building name */}
      <Text
        position={[0, size[1] + 1, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

// Coffee Shop Component
function CoffeeShop({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Main building */}
      <Box ref={meshRef} args={[2, 2.5, 2]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Box>
      
      {/* Roof */}
      <Cylinder args={[1.5, 1.5, 0.3]} position={[0, 2.65, 0]}>
        <meshStandardMaterial color="#654321" />
      </Cylinder>
      
      {/* Sign */}
      <Box args={[1.5, 0.5, 0.1]} position={[0, 3, 1.1]}>
        <meshStandardMaterial color="#2F4F4F" />
      </Box>
      
      {/* Coffee sign text */}
      <Text
        position={[0, 3, 1.2]}
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        ☕ SimCafé
      </Text>
      
      {/* Door */}
      <Box args={[0.8, 1.5, 0.1]} position={[0, 0.75, 1.05]}>
        <meshStandardMaterial color="#654321" />
      </Box>
    </group>
  );
}

// Player Character Component
function PlayerCharacter({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<any>();
  const [isMoving, setIsMoving] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      if (isMoving) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 8) * 0.2;
      }
    }
  });

  return (
    <group position={position}>
      {/* Body */}
      <Box ref={meshRef} args={[0.4, 0.8, 0.3]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#00d4ff" />
      </Box>
      
      {/* Head */}
      <Sphere args={[0.2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>
      
      {/* Arms */}
      <Box args={[0.15, 0.6, 0.15]} position={[-0.3, 0.4, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Box>
      <Box args={[0.15, 0.6, 0.15]} position={[0.3, 0.4, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Box>
      
      {/* Shadow */}
      <Plane args={[1, 1]} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#000000" transparent opacity={0.3} />
      </Plane>
      
      {/* Name tag */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        You
      </Text>
    </group>
  );
}

// Quest Marker Component
function QuestMarker({ position, type = "main" }: { position: [number, number, number], type?: string }) {
  const meshRef = useRef<any>();
  
  const colors = {
    main: "#ffff00",
    side: "#00ff00",
    urgent: "#ff0000"
  };
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.3;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[0.4, 0.4, 0.4]}>
        <meshStandardMaterial 
          color={colors[type as keyof typeof colors]} 
          emissive={colors[type as keyof typeof colors]} 
          emissiveIntensity={0.5}
        />
      </Box>
      
      {/* Quest indicator ring */}
      <Cylinder args={[0.8, 0.8, 0.1]} position={[0, -0.5, 0]}>
        <meshStandardMaterial 
          color={colors[type as keyof typeof colors]} 
          transparent 
          opacity={0.3}
        />
      </Cylinder>
    </group>
  );
}

// Street and Ground
function CityGround() {
  return (
    <group>
      {/* Main ground */}
      <Plane args={[30, 30]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#2a4d3a" />
      </Plane>
      
      {/* Streets */}
      <Plane args={[30, 2]} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </Plane>
      <Plane args={[2, 30]} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </Plane>
      
      {/* Street lines */}
      <Plane args={[30, 0.1]} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffff00" />
      </Plane>
      <Plane args={[0.1, 30]} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffff00" />
      </Plane>
    </group>
  );
}

// Camera controller for isometric view
function IsometricCamera() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

// Main world scene
export default function SimWorldScene() {
  const [activeWorkstation, setActiveWorkstation] = useState<string | null>(null);

  const handleWorkstationInteract = (type: string) => {
    setActiveWorkstation(activeWorkstation === type ? null : type);
    console.log(`Interacting with ${type} workstation`);
  };

  return (
    <div className={styles.worldContainer}>
      <Canvas
        shadows
        camera={{ position: [12, 10, 12], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #98FB98)' }}
      >
        <Suspense fallback={null}>
          <IsometricCamera />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[15, 15, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 8, 0]} intensity={0.3} color="#00d4ff" />

          {/* Ground and streets */}
          <CityGround />

          {/* Office District */}
          <OfficeBuilding position={[-6, 0, -6]} size={[3, 6, 3]} color="#667eea" name="Tech Tower" />
          <OfficeBuilding position={[6, 0, -6]} size={[2.5, 5, 2.5]} color="#764ba2" name="Design Studio" />
          <OfficeBuilding position={[0, 0, -10]} size={[4, 7, 3]} color="#f093fb" name="Business Center" />

          {/* Interactive Workstations */}
          <DeveloperDesk
            position={[-6, 0, -4]}
            onInteract={() => handleWorkstationInteract('developer')}
          />
          <DesignStudio
            position={[6, 0, -4]}
            onInteract={() => handleWorkstationInteract('design')}
          />
          <ProjectManagementDesk
            position={[0, 0, -8]}
            onInteract={() => handleWorkstationInteract('management')}
          />

          {/* Residential Area */}
          <OfficeBuilding position={[-8, 0, 8]} size={[2, 3, 2]} color="#ff6b6b" name="Apartments" />
          <OfficeBuilding position={[-4, 0, 8]} size={[1.8, 2.5, 1.8]} color="#4ecdc4" name="Housing" />

          {/* Coffee shops and social spaces */}
          <CoffeeShop position={[8, 0, 8]} />
          <CoffeeShop position={[4, 0, 6]} />

          {/* Player character */}
          <PlayerCharacter position={[0, 0, 3]} />

          {/* Quest markers */}
          <QuestMarker position={[-6, 7, -6]} type="main" />
          <QuestMarker position={[6, 6, -6]} type="side" />
          <QuestMarker position={[0, 8, -10]} type="urgent" />
          <QuestMarker position={[8, 4, 8]} type="side" />

          {/* Environment */}
          <Environment preset="city" />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={8}
            maxDistance={25}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Workstation UI Overlay */}
      {activeWorkstation && (
        <div className={styles.workstationOverlay}>
          <div className={styles.overlayContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setActiveWorkstation(null)}
            >
              ×
            </button>

            {activeWorkstation === 'developer' && (
              <div className={styles.workstationInterface}>
                <h3>💻 Developer Workstation</h3>
                <p>Welcome to the coding zone! Here you can:</p>
                <ul>
                  <li>Complete coding challenges</li>
                  <li>Debug real applications</li>
                  <li>Learn new programming languages</li>
                  <li>Collaborate on open source projects</li>
                </ul>
                <button className={styles.startBtn}>Start Coding Challenge</button>
              </div>
            )}

            {activeWorkstation === 'design' && (
              <div className={styles.workstationInterface}>
                <h3>🎨 Design Studio</h3>
                <p>Unleash your creativity! Here you can:</p>
                <ul>
                  <li>Create UI/UX designs</li>
                  <li>Design logos and branding</li>
                  <li>Build interactive prototypes</li>
                  <li>Collaborate with design teams</li>
                </ul>
                <button className={styles.startBtn}>Start Design Project</button>
              </div>
            )}

            {activeWorkstation === 'management' && (
              <div className={styles.workstationInterface}>
                <h3>📊 Project Management</h3>
                <p>Lead your team to success! Here you can:</p>
                <ul>
                  <li>Plan and track projects</li>
                  <li>Manage team resources</li>
                  <li>Analyze performance metrics</li>
                  <li>Coordinate cross-functional teams</li>
                </ul>
                <button className={styles.startBtn}>Start Project</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
