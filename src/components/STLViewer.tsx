import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
// @ts-ignore
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

interface STLModelProps {
  url: string;
}

const STLModel: React.FC<STLModelProps> = ({ url }) => {
  const geom = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (geom) {
      geom.center();
    }
  }, [geom]);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <primitive object={geom} attach="geometry" />
      <meshPhysicalMaterial 
        color="#fafafa" // Premium Matte White Object
        roughness={0.9}
        metalness={0.02}
        reflectivity={0.02}
        clearcoat={0.0}
        clearcoatRoughness={0.0}
      />
    </mesh>
  );
};

interface STLViewerProps {
  modelUrl: string;
}

const STLViewer: React.FC<STLViewerProps> = ({ modelUrl }) => {
  const controlsRef = useRef<any>(null);

  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing relative group touch-none"
      onPointerDown={() => { if (controlsRef.current) controlsRef.current.enableZoom = true; }}
      onPointerUp={() => { if (controlsRef.current) controlsRef.current.enableZoom = false; }}
      onPointerLeave={() => { if (controlsRef.current) controlsRef.current.enableZoom = false; }}
    >
      <div className="relative h-full w-full overflow-hidden bg-transparent touch-none">
        <Canvas 
          shadows={{ type: THREE.PCFShadowMap }} 
          dpr={[1, 2]} 
          gl={{ 
            antialias: true
          }}
          style={{ touchAction: 'none' }}
          camera={{ position: [0, 0, 150], fov: 40 }}
        >
          <Suspense fallback={null}>
            {/* @ts-ignore */}
            <Stage 
              environment="city" 
              intensity={1.2} 
              shadows="contact" 
              adjustCamera={1.15}
            >
              <STLModel url={modelUrl} />
            </Stage>
            <OrbitControls 
              ref={controlsRef}
              enablePan={false} 
              enableZoom={false} 
              enableRotate={true}
              makeDefault
              minPolarAngle={0} 
              maxPolarAngle={Math.PI}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default STLViewer;
export { STLModel };
