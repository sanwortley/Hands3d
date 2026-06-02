import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';
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
  const { active, progress } = useProgress();
  const { lang } = useAppStore();

  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing relative group touch-none"
      onPointerDown={() => { if (controlsRef.current) controlsRef.current.enableZoom = true; }}
      onPointerUp={() => { if (controlsRef.current) controlsRef.current.enableZoom = false; }}
      onPointerLeave={() => { if (controlsRef.current) controlsRef.current.enableZoom = false; }}
    >
      <div className="relative h-full w-full overflow-hidden bg-transparent touch-none">
        {/* Beautiful glassmorphic loading screen overlay */}
        <AnimatePresence>
          {active && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAF5EF]/60 backdrop-blur-[6px] pointer-events-none"
            >
              <div className="flex flex-col items-center gap-3">
                {/* Circular minimalist percentage container */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-[#3E5F8A]/10" />
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-t-[#3E5F8A] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <span className="font-space text-[10px] font-bold text-[#3E5F8A] mt-0.5">
                    {Math.round(progress)}%
                  </span>
                </div>
                <span className="font-space text-[10px] tracking-widest text-[#3E5F8A]/80 uppercase font-black select-none">
                  {lang === 'es' ? 'Cargando 3D' : 'Loading 3D'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
