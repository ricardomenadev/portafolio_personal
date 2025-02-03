
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';


const ParticlesField = () => {
  const particlesCount = 5000;
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame(() => {
    points.current.rotation.y += 0.001;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#61DAFB"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

const NodeLogo = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial
        color="#68A063"
        metalness={0.7}
        roughness={0.2}
        emissive="#68A063"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const Particles = () => {
  return (
    <div className="w-full h-[600px] bg-gray-900">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        
        <NodeLogo />
        <ParticlesField />

        <EffectComposer>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Particles;