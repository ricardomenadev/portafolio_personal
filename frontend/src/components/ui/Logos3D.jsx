// components/ui/Logos3D.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const ReactLogo = () => {
  const groupRef = useRef();
  const orbitRefs = useRef([]);

  // Configuración más detallada para React
  const orbits = [
    { radius: 2.5, speed: 1, angle: 0 },
    { radius: 2.5, speed: 0.8, angle: 2 },
    { radius: 2.5, speed: 1.2, angle: 4 }
  ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Rotación suave del átomo
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    
    // Órbitas más naturales
    orbitRefs.current.forEach((orbit, i) => {
      const { radius, speed, angle } = orbits[i];
      orbit.position.x = Math.cos(t * speed + angle) * radius;
      orbit.position.z = Math.sin(t * speed + angle) * radius;
      orbit.position.y = Math.cos(t * speed * 0.5) * radius * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Núcleo más detallado */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#61DAFB"
          metalness={0.8}
          roughness={0.2}
          emissive="#61DAFB"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Órbitas con estelas */}
      {orbits.map((_, i) => (
        <group key={i}>
          <mesh
            ref={el => orbitRefs.current[i] = el}
            position={[orbits[i].radius, 0, 0]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#61DAFB"
              emissive="#61DAFB"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const NodeLogo = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Forma base del logo de Node */}
      <mesh>
        <torusGeometry args={[1.5, 0.5, 16, 100]} />
        <meshStandardMaterial
          color="#68A063"
          metalness={0.7}
          roughness={0.2}
          emissive="#68A063"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Detalles internos */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#68A063"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const Logos3D = () => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-gray-900 to-gray-800">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight 
          position={[-10, 10, -10]} 
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <ReactLogo position={[-3, 0, 0]} />
        <NodeLogo position={[3, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default Logos3D;