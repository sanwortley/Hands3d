import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, CornerRightDown, Maximize2, RotateCcw } from 'lucide-react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls, Stage, PerspectiveCamera, Environment } from '@react-three/drei';

const STLModel = ({ url, color = "#001A3D" }) => {
  const geom = useLoader(STLLoader, url);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <primitive object={geom} attach="geometry" />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.8}
        emissive="#000000"
      />
    </mesh>
  );
};

const STLViewer = ({ modelUrl }) => {
  return (
    <div className="w-full h-[50vh] md:h-[70vh] cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-brand-beige/20 border border-brand-blue/5">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={50} />
          <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.2, blur: 2 }} center>
            <STLModel url={modelUrl} />
          </Stage>
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.75}
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

const Navbar = ({ isDark }) => (
  <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 flex justify-between items-center pointer-events-none transition-colors duration-500">
    <div className={`font-space font-bold text-2xl md:text-3xl tracking-[0.05em] leading-none pointer-events-auto transition-colors duration-500 ${isDark ? 'text-brand-beige' : 'text-brand-blue'}`}>
      hands3D
    </div>
    <div className={`hidden md:flex gap-12 font-outfit text-[10px] uppercase tracking-[0.4em] pointer-events-auto font-bold transition-colors duration-500 ${isDark ? 'text-brand-beige' : 'text-brand-blue'}`}>
      <a href="#archivo" className="hover:opacity-40 transition-opacity">Archivo</a>
      <a href="#productos" className="hover:opacity-40 transition-opacity">Productos</a>
      <a href="#materiales" className="hover:opacity-40 transition-opacity">Materiales</a>
      <a href="#produccion" className="hover:opacity-40 transition-opacity">Producción</a>
    </div>
    <button className={`font-outfit text-[10px] uppercase tracking-[0.4em] px-8 py-3 rounded-full pointer-events-auto shadow-2xl hover:scale-105 transition-all font-bold ${isDark ? 'bg-brand-beige text-brand-blue' : 'bg-brand-blue text-brand-beige'}`}>
      Contacto
    </button>
  </nav>
);

const Section = ({ children, className, id, number, dark = false, style, onVisible }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(dark);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [dark, onVisible]);

  return (
    <section 
      ref={ref}
      id={id}
      className={`snap-section ${className} relative flex flex-col items-center justify-start w-full isolate`}
      style={style}
    >
      {number && (
        <div className={`absolute top-10 left-6 md:left-10 font-space font-bold text-xl tracking-tighter opacity-10 z-50 ${dark ? 'text-brand-beige' : 'text-brand-blue'}`}>
          [{number}]
        </div>
      )}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-40 pb-20">
        {children}
      </div>
    </section>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [navDark, setNavDark] = useState(false);
  const [selectedModel, setSelectedModel] = useState('/models/bandeja.stl');

  return (
    <main className="snap-container font-outfit bg-brand-dark">
      <div className="grain pointer-events-none" />
      <Navbar isDark={navDark} />

      {/* 01. HERO - Cinematic & Premium */}
      <Section className="bg-brand-cream text-brand-dark overflow-visible" id="hero" number="01" dark={false} onVisible={setNavDark} style={{ backgroundColor: '#FAF9F6' }}>
        <div className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Text Content - Left Aligned for Asymmetry */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="z-20 flex-1 space-y-8 text-left"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-brand-blue"
              />
              <h2 className="text-brand-blue tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold opacity-40">
                Digital Fabrication Studio
              </h2>
            </div>
            
            <h1 className="font-space font-bold text-7xl md:text-[9rem] leading-[0.85] tracking-[-0.04em] text-brand-blue">
              hands<span className="text-brand-blue/90">3D</span>
            </h1>
            
            <p className="text-lg md:text-xl font-medium opacity-60 max-w-sm leading-relaxed">
              Transformamos geometrías complejas en realidades tangibles a través de fabricación aditiva avanzada.
            </p>

            <div className="pt-8">
              <motion.button 
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-center gap-6 font-outfit text-[11px] font-bold tracking-[0.4em] uppercase"
              >
                <span className="bg-brand-blue text-white px-10 py-5 rounded-full group-hover:bg-brand-blue/90 transition-all shadow-xl">
                  Explorar Proyectos
                </span>
                <div className="w-12 h-px bg-brand-blue/20 group-hover:w-20 transition-all" />
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Image - Right Aligned with Masking */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative flex justify-end items-center"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <img 
                src="/brand/premium_hero_hand.png" 
                alt="Hands3D Sculptural" 
                className="h-[60vh] md:h-[85vh] w-auto object-contain grayscale contrast-125 brightness-110 mix-blend-multiply"
                style={{ 
                  maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                }}
              />
              {/* Subtle Glow */}
              <div className="absolute inset-0 bg-brand-blue/5 rounded-full blur-[120px] -z-10" />
            </motion.div>
          </motion.div>

        </div>
      </Section>

      {/* 02. PRODUCTOS - 3D Viewer */}
      <Section className="bg-brand-cream text-brand-dark" id="productos" number="02" dark={false} onVisible={setNavDark} style={{ backgroundColor: '#FDF5E6' }}>
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-6">
            <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tight leading-none text-brand-blue">PRODUCTOS<br/>EN 3D.</h2>
            <p className="text-lg md:text-xl font-medium opacity-60 max-w-md">
              Explorá cada detalle de nuestras piezas desde todos los ángulos con nuestro visualizador interactivo.
            </p>
            
            <div className="flex flex-col gap-3 mt-8 relative z-50">
              {[
                { name: 'Bandeja de Diseño', path: '/models/bandeja.stl' },
                { name: 'Cuerpo Estructural', path: '/models/cuerpo.stl' }
              ].map((m, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedModel(m.path)}
                  className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all ${selectedModel === m.path ? 'bg-brand-blue text-white border-brand-blue shadow-xl' : 'bg-white/50 text-brand-blue border-brand-blue/10 hover:border-brand-blue/30'}`}
                >
                  <span className="font-bold tracking-widest uppercase text-[10px]">{m.name}</span>
                  <div className={`w-2 h-2 rounded-full ${selectedModel === m.path ? 'bg-white' : 'bg-brand-blue/20'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex-[1.5] w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModel}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <STLViewer modelUrl={selectedModel} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* 03. SHOWCASE - Video Gallery */}
      <Section className="bg-brand-dark text-white" id="showcase" number="03" dark onVisible={setNavDark}>
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-space font-bold text-5xl md:text-7xl tracking-tight uppercase text-brand-beige">SHOWCASE.</h2>
            <p className="text-lg md:text-2xl opacity-40 font-light tracking-wide">Manufacturing precision in motion.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[9/16] bg-brand-blue/10 overflow-hidden border border-white/5 rounded-2xl group"
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:brightness-75 group-hover:grayscale-0 transition-all duration-1000"
                >
                  <source src={`/videos/showcase_${i}.mp4`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-brand-blue/30 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 04. ARCHIVO - Black Aesthetic */}
      <Section className="bg-brand-dark text-white" id="archivo" number="04" dark onVisible={setNavDark}>
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1 order-2 md:order-1 w-full">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="relative aspect-square md:aspect-[4/3] overflow-hidden border border-white/5 rounded-2xl"
            >
              <img 
                src="/brand/premium_pointing_hand.png" 
                alt="Process" 
                className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-1000"
              />
            </motion.div>
          </div>
          <div className="flex-1 space-y-8 order-1 md:order-2">
            <h2 className="font-space font-bold text-5xl md:text-7xl tracking-tight leading-none uppercase text-brand-beige">ARCHIVO.</h2>
            <p className="text-lg md:text-3xl font-bold leading-tight tracking-tight opacity-60">
              Sistemas de producción escalable para firmas de diseño y arquitectura.
            </p>
            <div className="flex flex-wrap gap-3 font-outfit text-[9px] font-bold tracking-widest opacity-80 mt-6">
              <span className="border border-white/20 px-6 py-2 rounded-full">STL</span>
              <span className="border border-white/20 px-6 py-2 rounded-full">OBJ</span>
              <span className="border border-white/20 px-6 py-2 rounded-full">STEP</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 05. MATERIALES - Beige Contrast */}
      <Section className="bg-brand-beige text-brand-blue" id="materiales" number="05" dark={false} onVisible={setNavDark}>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-[1.5] space-y-6">
            <h2 className="font-space font-bold text-5xl md:text-7xl tracking-tight leading-[0.8] uppercase text-brand-blue">MATERIA.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6">
              {[
                { t: 'PLA PRO', s: 'Visual / Maquetas', d: 'Acabado perfecto para arquitectura.' },
                { t: 'ABS HT', s: 'Técnico / Industrial', d: 'Máxima resistencia estructural.' },
                { t: 'PETG PRO', s: 'Resistente / Dual', d: 'Químicamente inerte y duradero.' },
                { t: 'FLEX', s: 'Elasticidad', d: 'Para prototipado suave y funcional.' }
              ].map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-dark/5 backdrop-blur-sm p-6 md:p-8 border border-brand-blue/5 hover:border-brand-blue/20 transition-all rounded-2xl"
                >
                  <span className="font-outfit text-[8px] tracking-widest opacity-50 mb-2 block uppercase font-bold">{m.s}</span>
                  <h3 className="font-space font-bold text-xl md:text-3xl mb-2">{m.t}</h3>
                  <p className="text-[12px] md:text-sm font-bold opacity-70 leading-snug">{m.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
             <motion.img 
               initial={{ x: 50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ duration: 1.5 }}
               src="/brand/hands_composite.png" 
               alt="Materials" 
               className="h-[30vh] md:h-[60vh] object-contain mix-blend-multiply grayscale contrast-125 opacity-80"
             />
          </div>
        </div>
      </Section>

      {/* 06. PRODUCCIÓN - Industrial Black */}
      <Section className="bg-brand-dark text-white" id="produccion" number="06" dark onVisible={setNavDark}>
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="font-space font-bold text-5xl md:text-7xl tracking-tight leading-[0.8] uppercase text-brand-beige">ESCALA<br/>TOTAL.</h2>
            <p className="text-lg md:text-2xl font-bold opacity-40 leading-tight tracking-tight mt-4">
              Producción masiva sin comprometer el detalle individual.
            </p>
            <button className="bg-brand-beige text-brand-blue font-outfit text-[10px] font-bold tracking-widest px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-2xl mt-6">
              CAPACIDAD B2B
            </button>
          </div>
          <div className="flex-1 relative h-[40vh] md:h-[60vh] w-full overflow-hidden border border-white/5 rounded-2xl">
             <motion.img 
               style={{ y: yParallax }}
               src="/brand/premium_industrial_grid.png" 
               alt="Industrial Grid" 
               className="w-full h-[150%] object-cover opacity-30 grayscale"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/60 to-brand-dark" />
          </div>
        </div>
      </Section>

      {/* 07. CONTACTO - Brand Blue */}
      <Section className="bg-brand-blue text-white" id="contacto" number="07" dark onVisible={setNavDark} style={{ backgroundColor: '#001A3D' }}>
        <div className="flex flex-col items-center justify-between min-h-[50vh] text-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="space-y-12 md:space-y-16 flex-grow flex flex-col justify-center"
          >
            <h2 className="font-space font-bold text-6xl md:text-[7rem] tracking-tight leading-none uppercase text-brand-beige">HOLA.</h2>
            <motion.a 
              href="https://wa.me/yournumber"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-6 bg-brand-beige text-brand-blue px-10 py-6 md:px-16 md:py-8 font-space font-bold text-xl md:text-3xl uppercase shadow-[0_0_150px_rgba(235,211,172,0.15)] transition-all rounded-xl mx-auto"
            >
              <MessageCircle size={48} />
              Escribinos
            </motion.a>
          </motion.div>
          
          <footer className="mt-12 font-outfit text-[8px] tracking-[0.8em] opacity-20 uppercase font-bold text-brand-beige">
            hands3D © 2026 — FABRICACIÓN DIGITAL AVANZADA
          </footer>
        </div>
      </Section>
    </main>
  );
};

export default App;
