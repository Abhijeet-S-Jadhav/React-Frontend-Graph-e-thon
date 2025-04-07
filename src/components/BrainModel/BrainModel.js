// src/components/BrainModel/BrainModel.js
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial, PointLight } from 'three';
import { OrbitControls, Environment } from '@react-three/drei'; // Import Environment for better lighting

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef();

  // Make the brain slightly emissive and use a techy color
  const brainMaterial = new MeshStandardMaterial({
    color: '#00f0ff', // Base cyan color
    emissive: '#007088', // Darker cyan emission
    roughness: 0.4,
    metalness: 0.7,
    // wireframe: true, // Uncomment for a wireframe look
  });

  // Apply material to all meshes in the loaded model
  if (gltf.scene) {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = brainMaterial;
        // Optional: Enable shadows if needed (requires light setup)
        // child.castShadow = true;
        // child.receiveShadow = true;
      }
    });
  }

  // Rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Adjust speed (0.2 radians/sec)
    }
  });

  // Adjust scale and position as needed for your specific model
  return (
     <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={5.5} // Adjust scale to fit hero section
      position={[0, -0.5, 0]} // Adjust vertical position if needed
    />
  );
}


// The main component that sets up the Canvas
function BrainModel() {
  return (
    // Set frameloop="demand" to only render when needed (like on rotation change)
    // Can improve performance if the animation isn't complex or interactive
    <Canvas
        // camera={{ position: [0, 0, 3], fov: 50 }} // Adjust camera start position & field of view
        // shadows // Enable shadows if lights/meshes are configured
        gl={{ antialias: true, alpha: true }} // Antialiasing and transparent background
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} // Position canvas
     >
        {/* Add some lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff"/>
        <directionalLight position={[-5, 5, 2]} intensity={0.6} color="#7f00ff" />

       {/* Environment lighting adds realism from all directions */}
       <Environment preset="city" />

      {/* Suspense fallback while the model loads */}
      <Suspense fallback={null}>
         <Model url="/brain-scan.glb" /> {/* Path relative to public folder */}
      </Suspense>

      {/* Optional: OrbitControls for debugging/interaction (usually disabled for backgrounds) */}
       {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5}/> */}
    </Canvas>
  );
}

// Preload the model for faster initial display (optional but good practice)
useLoader.preload(GLTFLoader, '/brain-scan.glb');

export default BrainModel;