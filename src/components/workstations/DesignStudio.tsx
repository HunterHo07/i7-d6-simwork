'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Plane, Cylinder } from '@react-three/drei';

interface DesignStudioProps {
  position: [number, number, number];
  onInteract?: () => void;
}

export default function DesignStudio({ position, onInteract }: DesignStudioProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const studioRef = useRef<any>();
  const tabletRef = useRef<any>();

  useFrame((state) => {
    if (studioRef.current) {
      studioRef.current.scale.setScalar(isHovered ? 1.05 : 1);
    }
    if (tabletRef.current) {
      tabletRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleClick = () => {
    setIsActive(!isActive);
    if (onInteract) {
      onInteract();
    }
  };

  return (
    <group position={position}>
      {/* Main Desk */}
      <Box 
        ref={studioRef}
        args={[2.5, 0.1, 1.5]} 
        position={[0, 0.8, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} metalness={0.1} />
      </Box>

      {/* Desk Support */}
      <Cylinder args={[0.3, 0.3, 0.8]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#cccccc" />
      </Cylinder>

      {/* Large Monitor */}
      <Box args={[1.8, 1.2, 0.1]} position={[0, 1.5, -0.6]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>

      {/* Monitor Screen */}
      <Plane args={[1.7, 1.1]} position={[0, 1.5, -0.55]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive={isActive ? "#ff6b9d" : "#4a90e2"} 
          emissiveIntensity={0.4}
        />
      </Plane>

      {/* Drawing Tablet */}
      <Box 
        ref={tabletRef}
        args={[0.8, 0.05, 0.6]} 
        position={[-0.3, 0.85, 0.2]}
      >
        <meshStandardMaterial color="#333333" />
      </Box>

      {/* Tablet Screen */}
      <Plane args={[0.7, 0.5]} position={[-0.3, 0.88, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#000000" 
          emissive="#00d4ff" 
          emissiveIntensity={0.2}
        />
      </Plane>

      {/* Stylus */}
      <Cylinder args={[0.01, 0.01, 0.2]} position={[0.3, 0.86, 0.3]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#ff6b9d" />
      </Cylinder>

      {/* Color Palette */}
      <Box args={[0.4, 0.05, 0.3]} position={[0.6, 0.85, 0.4]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Color Swatches */}
      <Box args={[0.06, 0.02, 0.06]} position={[0.45, 0.87, 0.35]}>
        <meshStandardMaterial color="#ff0000" />
      </Box>
      <Box args={[0.06, 0.02, 0.06]} position={[0.55, 0.87, 0.35]}>
        <meshStandardMaterial color="#00ff00" />
      </Box>
      <Box args={[0.06, 0.02, 0.06]} position={[0.65, 0.87, 0.35]}>
        <meshStandardMaterial color="#0000ff" />
      </Box>
      <Box args={[0.06, 0.02, 0.06]} position={[0.75, 0.87, 0.35]}>
        <meshStandardMaterial color="#ffff00" />
      </Box>

      {/* Desk Lamp */}
      <Cylinder args={[0.05, 0.05, 0.6]} position={[-0.8, 1.1, -0.3]}>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      <Cylinder args={[0.15, 0.1, 0.2]} position={[-0.8, 1.5, -0.3]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </Cylinder>

      {/* Reference Books */}
      <Box args={[0.3, 0.05, 0.2]} position={[0.8, 0.85, -0.2]}>
        <meshStandardMaterial color="#8B0000" />
      </Box>
      <Box args={[0.3, 0.05, 0.2]} position={[0.8, 0.9, -0.2]}>
        <meshStandardMaterial color="#006400" />
      </Box>
      <Box args={[0.3, 0.05, 0.2]} position={[0.8, 0.95, -0.2]}>
        <meshStandardMaterial color="#4169E1" />
      </Box>

      {/* Plant */}
      <Cylinder args={[0.08, 0.08, 0.15]} position={[-0.9, 0.875, 0.4]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      <Box args={[0.2, 0.3, 0.02]} position={[-0.9, 1.1, 0.4]}>
        <meshStandardMaterial color="#228B22" />
      </Box>

      {/* Interaction Indicator */}
      {isHovered && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.3}
          color="#ff6b9d"
          anchorX="center"
          anchorY="middle"
        >
          🎨 Design Studio
          {'\n'}Click to create!
        </Text>
      )}

      {/* Active Indicator */}
      {isActive && (
        <Box args={[0.2, 0.2, 0.2]} position={[0, 2.5, 0]}>
          <meshStandardMaterial 
            color="#ff6b9d" 
            emissive="#ff6b9d" 
            emissiveIntensity={0.5}
          />
        </Box>
      )}

      {/* Creative Particles */}
      {isActive && (
        <>
          <Box args={[0.05, 0.05, 0.05]} position={[0.5, 2, 0.5]}>
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
          </Box>
          <Box args={[0.05, 0.05, 0.05]} position={[-0.5, 2.2, -0.5]}>
            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
          </Box>
          <Box args={[0.05, 0.05, 0.05]} position={[0.3, 2.4, -0.3]}>
            <meshStandardMaterial color="#0000ff" emissive="#0000ff" emissiveIntensity={0.8} />
          </Box>
        </>
      )}
    </group>
  );
}
