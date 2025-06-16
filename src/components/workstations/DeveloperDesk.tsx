'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Plane } from '@react-three/drei';
import styles from './DeveloperDesk.module.css';

interface DeveloperDeskProps {
  position: [number, number, number];
  onInteract?: () => void;
}

export default function DeveloperDesk({ position, onInteract }: DeveloperDeskProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const deskRef = useRef<any>();
  const screenRef = useRef<any>();

  useFrame((state) => {
    if (deskRef.current) {
      deskRef.current.scale.setScalar(isHovered ? 1.05 : 1);
    }
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = isActive ? 0.8 : 0.3;
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
      {/* Desk Base */}
      <Box 
        ref={deskRef}
        args={[2, 0.1, 1.2]} 
        position={[0, 0.8, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Box>

      {/* Desk Legs */}
      <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, -0.5]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, -0.5]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, 0.5]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, 0.5]}>
        <meshStandardMaterial color="#654321" />
      </Box>

      {/* Monitor */}
      <Box args={[1.2, 0.8, 0.1]} position={[0, 1.3, -0.4]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>

      {/* Screen */}
      <Plane 
        ref={screenRef}
        args={[1.1, 0.7]} 
        position={[0, 1.3, -0.35]}
      >
        <meshStandardMaterial 
          color="#000000" 
          emissive="#00ff00" 
          emissiveIntensity={0.3}
        />
      </Plane>

      {/* Keyboard */}
      <Box args={[0.8, 0.05, 0.3]} position={[0, 0.85, 0.2]}>
        <meshStandardMaterial color="#333333" />
      </Box>

      {/* Mouse */}
      <Box args={[0.1, 0.05, 0.15]} position={[0.5, 0.85, 0.3]}>
        <meshStandardMaterial color="#444444" />
      </Box>

      {/* Coffee Cup */}
      <Box args={[0.08, 0.12, 0.08]} position={[-0.6, 0.86, 0.3]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>

      {/* Interaction Indicator */}
      {isHovered && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
        >
          💻 Developer Workstation
          {'\n'}Click to code!
        </Text>
      )}

      {/* Active Indicator */}
      {isActive && (
        <Box args={[0.2, 0.2, 0.2]} position={[0, 2.2, 0]}>
          <meshStandardMaterial 
            color="#00ff00" 
            emissive="#00ff00" 
            emissiveIntensity={0.5}
          />
        </Box>
      )}
    </group>
  );
}
