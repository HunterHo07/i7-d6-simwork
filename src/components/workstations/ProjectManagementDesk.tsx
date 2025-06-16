'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Plane, Cylinder } from '@react-three/drei';

interface ProjectManagementDeskProps {
  position: [number, number, number];
  onInteract?: () => void;
}

export default function ProjectManagementDesk({ position, onInteract }: ProjectManagementDeskProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const deskRef = useRef<any>();
  const chartRef = useRef<any>();

  useFrame((state) => {
    if (deskRef.current) {
      deskRef.current.scale.setScalar(isHovered ? 1.05 : 1);
    }
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
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
      {/* Executive Desk */}
      <Box 
        ref={deskRef}
        args={[3, 0.15, 1.8]} 
        position={[0, 0.8, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.8} />
      </Box>

      {/* Desk Pedestals */}
      <Box args={[0.6, 0.8, 1.6]} position={[-1, 0.4, 0]}>
        <meshStandardMaterial color="#3a3a3a" />
      </Box>
      <Box args={[0.6, 0.8, 1.6]} position={[1, 0.4, 0]}>
        <meshStandardMaterial color="#3a3a3a" />
      </Box>

      {/* Multiple Monitors Setup */}
      {/* Main Monitor */}
      <Box args={[1.5, 1, 0.1]} position={[0, 1.4, -0.7]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      <Plane args={[1.4, 0.9]} position={[0, 1.4, -0.65]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive={isActive ? "#4CAF50" : "#2196F3"} 
          emissiveIntensity={0.4}
        />
      </Plane>

      {/* Side Monitor 1 */}
      <Box args={[1, 0.8, 0.1]} position={[-1.2, 1.3, -0.6]} rotation={[0, Math.PI / 6, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      <Plane args={[0.9, 0.7]} position={[-1.2, 1.3, -0.55]} rotation={[0, Math.PI / 6, 0]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#FF9800" 
          emissiveIntensity={0.3}
        />
      </Plane>

      {/* Side Monitor 2 */}
      <Box args={[1, 0.8, 0.1]} position={[1.2, 1.3, -0.6]} rotation={[0, -Math.PI / 6, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      <Plane args={[0.9, 0.7]} position={[1.2, 1.3, -0.55]} rotation={[0, -Math.PI / 6, 0]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#9C27B0" 
          emissiveIntensity={0.3}
        />
      </Plane>

      {/* Laptop */}
      <Box args={[0.8, 0.05, 0.6]} position={[-0.5, 0.85, 0.3]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      <Box args={[0.8, 0.6, 0.05]} position={[-0.5, 1.15, 0]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      <Plane args={[0.75, 0.55]} position={[-0.5, 1.15, 0.03]}>
        <meshStandardMaterial 
          color="#000000" 
          emissive="#00d4ff" 
          emissiveIntensity={0.2}
        />
      </Plane>

      {/* Tablet */}
      <Box args={[0.5, 0.03, 0.7]} position={[0.6, 0.85, 0.2]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      <Plane args={[0.45, 0.65]} position={[0.6, 0.87, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#E91E63" 
          emissiveIntensity={0.3}
        />
      </Plane>

      {/* Wireless Keyboard */}
      <Box args={[1, 0.05, 0.35]} position={[0, 0.85, 0.5]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Box>

      {/* Wireless Mouse */}
      <Box args={[0.12, 0.05, 0.18]} position={[0.7, 0.85, 0.6]}>
        <meshStandardMaterial color="#333333" />
      </Box>

      {/* Coffee Mug */}
      <Cylinder args={[0.06, 0.06, 0.12]} position={[-1.2, 0.86, 0.6]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>

      {/* Notepad */}
      <Box args={[0.4, 0.02, 0.6]} position={[1.1, 0.85, 0.4]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Pen Holder */}
      <Cylinder args={[0.08, 0.08, 0.15]} position={[1.2, 0.875, -0.2]}>
        <meshStandardMaterial color="#4169E1" />
      </Cylinder>

      {/* Pens */}
      <Cylinder args={[0.01, 0.01, 0.18]} position={[1.18, 0.96, -0.2]}>
        <meshStandardMaterial color="#000000" />
      </Cylinder>
      <Cylinder args={[0.01, 0.01, 0.18]} position={[1.22, 0.96, -0.2]}>
        <meshStandardMaterial color="#ff0000" />
      </Cylinder>

      {/* Desk Phone */}
      <Box args={[0.25, 0.08, 0.15]} position={[-0.9, 0.84, -0.3]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>

      {/* Chart/Whiteboard */}
      <Box 
        ref={chartRef}
        args={[1.5, 1.2, 0.05]} 
        position={[-2, 1.5, 0]} 
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Chart Elements */}
      <Box args={[0.8, 0.05, 0.02]} position={[-1.98, 1.3, 0]}>
        <meshStandardMaterial color="#4CAF50" />
      </Box>
      <Box args={[0.6, 0.05, 0.02]} position={[-1.98, 1.5, 0]}>
        <meshStandardMaterial color="#FF9800" />
      </Box>
      <Box args={[0.9, 0.05, 0.02]} position={[-1.98, 1.7, 0]}>
        <meshStandardMaterial color="#2196F3" />
      </Box>

      {/* Executive Chair */}
      <Cylinder args={[0.4, 0.4, 0.1]} position={[0, 0.5, 1.2]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      <Cylinder args={[0.35, 0.35, 0.8]} position={[0, 1, 1.2]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Cylinder>

      {/* Interaction Indicator */}
      {isHovered && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#4CAF50"
          anchorX="center"
          anchorY="middle"
        >
          📊 Project Management
          {'\n'}Click to manage!
        </Text>
      )}

      {/* Active Indicator */}
      {isActive && (
        <Box args={[0.2, 0.2, 0.2]} position={[0, 2.8, 0]}>
          <meshStandardMaterial 
            color="#4CAF50" 
            emissive="#4CAF50" 
            emissiveIntensity={0.5}
          />
        </Box>
      )}

      {/* Data Visualization Particles */}
      {isActive && (
        <>
          <Box args={[0.05, 0.05, 0.05]} position={[0.8, 2.2, 0.8]}>
            <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.8} />
          </Box>
          <Box args={[0.05, 0.05, 0.05]} position={[-0.8, 2.4, -0.8]}>
            <meshStandardMaterial color="#FF9800" emissive="#FF9800" emissiveIntensity={0.8} />
          </Box>
          <Box args={[0.05, 0.05, 0.05]} position={[0.3, 2.6, -0.3]}>
            <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.8} />
          </Box>
        </>
      )}
    </group>
  );
}
