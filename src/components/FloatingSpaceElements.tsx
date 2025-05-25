
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

const FloatingPlanet = ({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} scale={scale} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </Sphere>
  );
};

const FloatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.001;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.3, 0.3, 0.3]}>
      <meshStandardMaterial color="#4F46E5" transparent opacity={0.4} />
    </Box>
  );
};

const FloatingRing = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.3 + position[0]) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.3, 0.1, 16, 100]} />
      <meshStandardMaterial color="#10B981" transparent opacity={0.5} />
    </mesh>
  );
};

const SpaceScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B5CF6" />
      
      {/* Floating Planets */}
      <FloatingPlanet position={[-4, 2, -2]} color="#F59E0B" scale={0.8} />
      <FloatingPlanet position={[3, -1, -3]} color="#EF4444" scale={0.6} />
      <FloatingPlanet position={[0, 3, -4]} color="#3B82F6" scale={1.2} />
      <FloatingPlanet position={[-2, -2, -1]} color="#10B981" scale={0.7} />
      
      {/* Floating Cubes */}
      <FloatingCube position={[2, 1, -1]} />
      <FloatingCube position={[-3, -1, -2]} />
      <FloatingCube position={[1, -2, -3]} />
      
      {/* Floating Rings */}
      <FloatingRing position={[4, 0, -2]} />
      <FloatingRing position={[-1, 2, -1]} />
      <FloatingRing position={[-4, -1, -3]} />
    </>
  );
};

export const FloatingSpaceElements: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <SpaceScene />
      </Canvas>
    </div>
  );
};
