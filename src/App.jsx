import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stage, Environment } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { MessageCircle, ArrowUpRight, Menu, X } from 'lucide-react';

const Reveal = ({ children, width = "100%" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const STLModel = ({ url, color = "#FFFFFF" }) => {
  const geom = useLoader(STLLoader, url);
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <primitive object={geom} attach="geometry" />
      <meshStandardMaterial 
        color={color} 
        roughness={0.05} 
        metalness={0.8}
        emissive="#0A0A0A"
      />
    </mesh>
  );
};

const STLViewer = ({ modelUrl }) => {
  return (
    <div className="w-full h-[40vh] md:h-[75vh] cursor-grab active:cursor-grabbing relative group">
      <div className="absolute inset-0 bg-brand-beige/5 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-white/5 bg-[#080808]">
        <Canvas shadows dpr={[1, 2]} style={{ touchAction: 'none' }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={45} />
            <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.2, blur: 3 }} center>
              <STLModel url={modelUrl} />
            </Stage>
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minPolarAngle={Math.PI / 4} 
              maxPolarAngle={Math.PI / 1.5}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={0.8}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

const translations = {
  en: {
    nav: ['Archive', 'Products', 'Materials', 'Production'],
    connect: 'Connect',
    hero: {
      sub: 'Architectural Digital Fabrication',
      title: ['hands', '3D'],
      desc: '“Turning complex geometries into tangible realities through advanced additive manufacturing.”',
      cta: 'Explore Archive',
      studio: 'Studio 2026'
    },
    products: {
      title: ['Interactive', 'Gallery.'],
      items: [
        { name: 'Design Tray', desc: 'Sculptural utility piece.' },
        { name: 'Structural Core', desc: 'Industrial grade structural core.' }
      ]
    },
    showcase: {
      title: 'Showcase.',
      desc: 'Cinematic exploration of digital manufacturing.',
      phase: 'Phase'
    },
    archive: {
      title: ['Archive', '.'],
      desc: '“Scalable production systems for global design and architecture firms.”',
      tags: ['Additive', 'NURBS', 'BIM']
    },
    materia: {
      title: ['Matter', '& Form.'],
      items: [
        { 
          t: 'PLA PRO', 
          s: 'Architectural', 
          d: 'Perfect surface finish for large-scale architectural models.',
          img: '/brand/pla_pro.png',
          ld: 'Our PLA PRO is optimized for architectural visualization. It offers a smooth, matte finish that hides layer lines while maintaining sharp edge definition. Ideal for urban planning and structural models.'
        },
        { 
          t: 'ABS HT', 
          s: 'Structural', 
          d: 'High thermal resistance for industrial performance parts.',
          img: '/brand/abs_ht.png',
          ld: 'Engineered for high-temperature environments, ABS HT provides superior mechanical strength and impact resistance. It is the industrial standard for functional prototypes and tooling.'
        },
        { 
          t: 'PETG PRO', 
          s: 'Functional', 
          d: 'Chemically inert and impact resistant for functional prototypes.',
          img: '/brand/petg_pro.png',
          ld: 'PETG PRO combines the ease of printing with the strength of industrial materials. It is moisture resistant and chemically stable, making it perfect for custom mechanical components.'
        },
        { 
          t: 'FLEX', 
          s: 'Kinetic', 
          d: 'Variable shore hardness for elastic and ergonomic exploration.',
          img: '/brand/flex.png',
          ld: 'Our FLEX material allows for the creation of soft-touch, ergonomic, and shock-absorbing parts. With variable density control, we can tune the elasticity of each part individually.'
        }
      ]
    },
    production: {
      title: ['Infinite', 'Scale.'],
      desc: 'Mass production without compromising individual precision.',
      cta: 'B2B Production'
    },
    contact: {
      title: ['Connect', '.'],
      cta: 'WhatsApp',
      footer: 'Hands3D Architectural Studio © 2026 — All Rights Reserved'
    },
    modal: {
      close: 'Close',
      spec: 'Technical Spec'
    }
  },
  es: {
    nav: ['Archivo', 'Productos', 'Materiales', 'Producción'],
    connect: 'Contactar',
    hero: {
      sub: 'Fabricación Digital Arquitectónica',
      title: ['hands', '3D'],
      desc: '“Transformando geometrías complejas en realidades tangibles mediante fabricación aditiva avanzada.”',
      cta: 'Explorar Archivo',
      studio: 'Estudio 2026'
    },
    products: {
      title: ['Galería', 'Interactiva.'],
      items: [
        { name: 'Bandeja de Diseño', desc: 'Pieza de utilidad escultórica.' },
        { name: 'Cuerpo Estructural', desc: 'Núcleo estructural de grado industrial.' }
      ]
    },
    showcase: {
      title: 'Showcase.',
      desc: 'Exploración cinemática de la fabricación digital.',
      phase: 'Fase'
    },
    archive: {
      title: ['Archivo', '.'],
      desc: '“Sistemas de producción escalables para firmas globales de diseño y arquitectura.”',
      tags: ['Aditivo', 'NURBS', 'BIM']
    },
    materia: {
      title: ['Materia', '& Forma.'],
      items: [
        { 
          t: 'PLA PRO', 
          s: 'Arquitectónico', 
          d: 'Acabado superficial perfecto para modelos arquitectónicos a gran escala.',
          img: '/brand/pla_pro.png',
          ld: 'Nuestro PLA PRO está optimizado para la visualización arquitectónica. Ofrece un acabado mate suave que oculta las líneas de capa manteniendo bordes afilados. Ideal para planificación urbana y modelos estructurales.'
        },
        { 
          t: 'ABS HT', 
          s: 'Estructural', 
          d: 'Alta resistencia térmica para piezas de rendimiento industrial.',
          img: '/brand/abs_ht.png',
          ld: 'Diseñado para entornos de alta temperatura, el ABS HT proporciona una resistencia mecánica y al impacto superior. Es el estándar industrial para prototipos funcionales y herramental.'
        },
        { 
          t: 'PETG PRO', 
          s: 'Funcional', 
          d: 'Químicamente inerte y resistente al impacto para prototipos funcionales.',
          img: '/brand/petg_pro.png',
          ld: 'El PETG PRO combina la facilidad de impresión con la fuerza de materiales industriales. Es resistente a la humedad y químicamente estable, perfecto para componentes mecánicos personalizados.'
        },
        { 
          t: 'FLEX', 
          s: 'Kinetic', 
          d: 'Dureza variable para exploración elástica y ergonómica.',
          img: '/brand/flex.png',
          ld: 'Nuestro material FLEX permite la creación de piezas suaves al tacto, ergonómicas y que absorben impactos. Con control de densidad variable, podemos ajustar la elasticidad de cada pieza individualmente.'
        }
      ]
    },
    production: {
      title: ['Escala', 'Infinita.'],
      desc: 'Producción masiva sin comprometer la precisión individual.',
      cta: 'Producción B2B'
    },
    contact: {
      title: ['Conectar', '.'],
      cta: 'WhatsApp',
      footer: 'Hands3D Architectural Studio © 2026 — Todos los derechos reservados'
    },
    modal: {
      close: 'Cerrar',
      spec: 'Ficha Técnica'
    }
  }
};

const MaterialModal = ({ material, onClose, t }) => {
  if (!material) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-8 bg-[#050B18]/98 backdrop-blur-3xl"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="relative w-full max-w-5xl bg-white/[0.03] border border-white/10 rounded-[40px] md:rounded-[50px] overflow-hidden flex flex-col h-full max-h-[90vh] md:max-h-[700px] shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-brand-beige text-brand-dark px-5 py-2 md:px-6 md:py-2 rounded-full font-space font-black text-[8px] md:text-[9px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          {t.modal.close}
        </button>

        <div className="flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-hidden">
          <div className="w-full md:flex-1 h-[30vh] md:h-full relative overflow-hidden bg-black border-b md:border-b-0 md:border-r border-white/5 shrink-0">
            <img 
              src={material.img} 
              alt={material.t} 
              className="w-full h-full object-cover grayscale contrast-125 opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#050B18]/80" />
          </div>

          <div className="w-full md:flex-[1.2] p-6 md:p-16 flex flex-col justify-center space-y-8 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <span className="text-brand-gold font-space font-black tracking-[0.6em] text-[7px] md:text-[9px] uppercase opacity-60">{material.s}</span>
              <h2 className="font-space font-black text-3xl md:text-6xl tracking-tighter uppercase leading-none text-white">{material.t}</h2>
            </div>
            
            <div className="space-y-5 md:space-y-6">
              <h3 className="font-outfit text-brand-beige/30 font-bold uppercase tracking-[0.4em] text-[7px] md:text-[8px]">{t.modal.spec}</h3>
              <p className="text-base md:text-2xl font-light leading-relaxed text-white/70">
                {material.ld}
              </p>
            </div>

            <div className="pt-4 md:pt-6">
              <div className="h-px w-full bg-white/5" />
              <div className="flex gap-8 md:gap-10 mt-6 md:mt-8">
                <div className="space-y-1">
                  <span className="block text-[6px] md:text-[7px] font-black opacity-30 uppercase tracking-[0.3em] text-white">Density</span>
                  <span className="font-space font-bold text-base md:text-xl text-brand-beige">1.24 g/cm³</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[6px] md:text-[7px] font-black opacity-30 uppercase tracking-[0.3em] text-white">Hardness</span>
                  <span className="font-space font-bold text-base md:text-xl text-brand-beige">80 Shore D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ lang, setLang, t, isLight }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setIsTop(latest < 20);
    });
  }, [scrollY]);

  const isContrastMode = isLight && !isTop;
  const logoMainColor = isContrastMode ? 'text-[#050B18]' : 'text-white';
  const logoSubColor = isContrastMode ? 'text-[#B8860B]' : 'text-brand-gold';
  const navLinkColor = isContrastMode ? 'text-[#050B18]/70' : 'text-white/40';
  const navLinkHoverColor = isContrastMode ? 'hover:text-[#050B18]' : 'hover:text-brand-beige';
  const pillBg = isContrastMode ? 'bg-[#050B18]/10 border-[#050B18]/20' : 'bg-black/40 border-white/10';
  const pillActiveBg = isContrastMode ? 'bg-[#050B18]' : 'bg-brand-beige';
  const pillActiveText = isContrastMode ? 'text-white' : 'text-brand-dark';
  const pillInactiveText = isContrastMode ? 'text-[#050B18]/40 hover:text-[#050B18]' : 'text-white/40 hover:text-white';

  const navIds = ['archive', 'products', 'materials', 'production'];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-16 md:py-8 flex justify-between items-center transition-all duration-500 ${isTop ? 'bg-transparent' : (isLight ? 'bg-[#EBD3AC]/90 backdrop-blur-2xl border-b border-[#050B18]/10 shadow-xl' : 'bg-[#050B18]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl')}`}
    >
      <div className="flex items-center gap-6 md:gap-16">
        <motion.div 
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          className={`font-space font-black text-2xl md:text-3xl tracking-tighter flex items-baseline transition-colors duration-500 cursor-pointer hover:opacity-80`}
        >
          <span className={logoMainColor}>hands</span>
          <span className={`${logoSubColor} ml-0.5`}>3D</span>
        </motion.div>
        
        <div className={`relative flex items-center p-1 rounded-full border cursor-pointer h-8 md:h-10 w-20 md:w-24 shrink-0 transition-all duration-500 ${pillBg}`}>
          <motion.div 
            className={`absolute h-6 md:h-8 w-[36px] md:w-[44px] rounded-full shadow-lg transition-colors duration-500 ${pillActiveBg}`}
            animate={{ x: lang === 'es' ? 4 : (window.innerWidth < 768 ? 40 : 44) }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          <button 
            onClick={() => setLang('es')}
            className={`relative z-10 flex-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${lang === 'es' ? pillActiveText : pillInactiveText}`}
          >
            ES
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`relative z-10 flex-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${lang === 'en' ? pillActiveText : pillInactiveText}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className={`hidden lg:flex gap-16 xl:gap-24 font-outfit text-[9px] uppercase tracking-[0.5em] font-bold transition-colors duration-500 ${navLinkColor}`}>
        {t.nav.map((item, i) => (
          <a 
            key={item}
            href={`#${navIds[i]}`} 
            className={`transition-colors relative group ${navLinkHoverColor}`}
          >
            {item}
            <span className={`absolute -bottom-2 left-0 w-0 h-px transition-all group-hover:w-full ${isContrastMode ? 'bg-[#050B18]' : 'bg-brand-beige'}`} />
          </a>
        ))}
      </div>

      <button 
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className={`font-outfit text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.5em] px-5 py-3 md:px-10 md:py-4 rounded-full font-black hover:scale-105 transition-all shadow-xl whitespace-nowrap duration-500 ${isContrastMode ? 'bg-[#050B18] text-white' : 'bg-brand-beige text-brand-dark'}`}
      >
        {t.connect}
      </button>
    </motion.nav>
  );
};

const Section = ({ children, id, number, onVisible, className = "bg-brand-dark" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <section 
      ref={ref}
      id={id}
      className={`snap-section relative flex flex-col items-center justify-center w-full py-12 md:py-32 overflow-hidden ${className}`}
    >
      {number && (
        <div className="absolute top-10 left-4 md:left-16 font-space font-bold text-xs md:text-base tracking-widest opacity-10 flex items-center gap-2 md:gap-4">
          <span className="w-4 md:w-8 h-px bg-current" />
          {number}
        </div>
      )}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-24">
        {children}
      </div>
    </section>
  );
};

const App = () => {
  const [lang, setLang] = useState('es');
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const [selectedModel, setSelectedModel] = useState('/models/bandeja.stl');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isLight, setIsLight] = useState(false);

  return (
    <main className="snap-container font-outfit bg-[#050505] text-brand-beige selection:bg-brand-beige selection:text-brand-dark">
      <div className="grain pointer-events-none" />
      <Navbar lang={lang} setLang={setLang} t={t} isLight={isLight} />

      <AnimatePresence>
        {selectedMaterial && (
          <MaterialModal 
            material={selectedMaterial} 
            onClose={() => setSelectedMaterial(null)} 
            t={t}
          />
        )}
      </AnimatePresence>

      {/* 01. HOME (HERO) */}
      <Section id="home" onVisible={() => setIsLight(false)} className="bg-[#0A1A3F] min-h-screen">
        <div className="relative w-full flex flex-col items-center justify-center text-center pt-20 md:pt-0">
          <Reveal>
            <div className="space-y-8 md:space-y-12 relative z-20">
              <div className="space-y-3 md:space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, letterSpacing: "1em" }}
                  animate={{ opacity: 0.6, letterSpacing: "0.6em" }}
                  transition={{ duration: 2 }}
                  className="text-brand-beige text-[7px] md:text-[10px] uppercase font-bold text-glow tracking-[0.4em] md:tracking-[0.6em]"
                >
                  {t.hero.sub}
                </motion.h2>
                <h1 className="font-space font-black text-6xl md:text-[11rem] leading-none tracking-tighter text-white">
                  {t.hero.title[0]}<span className="text-brand-beige opacity-80">{t.hero.title[1]}</span>
                </h1>
              </div>
              
              <p className="text-sm md:text-2xl font-light text-white/60 max-w-sm md:max-w-2xl mx-auto leading-relaxed tracking-wide italic">
                {t.hero.desc}
              </p>

              <div className="pt-6 md:pt-10 flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                <div className="w-12 h-px bg-white/20 hidden md:block" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-beige/40 font-bold">{t.hero.studio}</span>
              </div>
            </div>
          </Reveal>

          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none flex items-center justify-center">
            <motion.img 
              animate={{ y: [0, -20, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              src="/brand/hero_hand.png" 
              className="w-full max-w-7xl h-auto object-contain opacity-[0.6] md:opacity-[0.5] scale-110 brightness-110"
            />
          </div>
        </div>
      </Section>

      {/* 02. PRODUCTS */}
      <Section id="products" number="02" onVisible={() => setIsLight(false)} className="bg-[#050505]">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-32">
          <div className="w-full lg:flex-1 space-y-8 md:space-y-12 text-center lg:text-left">
            <Reveal>
              <h2 className="font-space font-black text-4xl md:text-8xl tracking-tighter leading-none text-white uppercase">
                {t.products.title[0]}<br/><span className="text-brand-beige opacity-40">{t.products.title[1]}</span>
              </h2>
            </Reveal>
            
            <Reveal>
              <div className="flex flex-col gap-3 md:gap-4 mt-8 md:mt-12 relative z-50">
                {t.products.items.map((m, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedModel(translations.en.products.items[i].path || (i === 0 ? '/models/bandeja.stl' : '/models/cuerpo.stl'))}
                    className={`group flex flex-col items-start px-8 py-6 md:px-10 md:py-8 rounded-[25px] md:rounded-[30px] border transition-all duration-500 text-left ${selectedModel === (i === 0 ? '/models/bandeja.stl' : '/models/cuerpo.stl') ? 'bg-brand-beige text-brand-dark border-brand-beige shadow-xl' : 'bg-white/5 text-white/80 border-white/5 hover:bg-white/10'}`}
                  >
                    <span className="font-space font-black tracking-widest uppercase text-[10px] md:text-xs mb-1">{m.name}</span>
                    <span className="text-[8px] md:text-[10px] opacity-40 uppercase tracking-widest font-bold">{m.desc}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
          
          <div className="flex-[1.4] w-full min-h-[350px] md:min-h-[600px]">
            <Reveal>
              <STLViewer modelUrl={selectedModel} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 03. SHOWCASE */}
      <Section id="showcase" number="03" onVisible={() => setIsLight(false)} className="bg-[#050505]">
        <div className="space-y-12 md:space-y-20">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
              <h2 className="font-space font-black text-4xl md:text-9xl tracking-tighter uppercase leading-none text-white">
                {t.showcase.title}
              </h2>
              <p className="text-[10px] md:text-xs opacity-40 font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-left md:text-right max-w-[200px] text-brand-beige">
                {t.showcase.desc}
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].slice(0, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 4).map((i) => (
              <Reveal key={i}>
                <div className="relative aspect-[4/5] bg-white/5 overflow-hidden rounded-[30px] md:rounded-[40px] border border-white/5 group">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 transition-all duration-[2000ms]">
                    <source src={`/videos/showcase_${i}.mp4`} type="video/mp4" />
                  </video>
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] bg-brand-beige text-brand-dark px-3 py-1.5 md:px-4 md:py-2 rounded-full">{t.showcase.phase} 0{i}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 04. ARCHIVE */}
      <Section id="archive" number="04" onVisible={() => setIsLight(false)} className="bg-[#050505]">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-40">
          <div className="w-full md:flex-1 order-2 md:order-1 flex justify-center">
            <Reveal>
              <img src="/brand/pointing_3d_v2.png" className="w-full max-w-sm md:max-w-lg rounded-[30px] md:rounded-[50px] grayscale opacity-80 border border-white/10 shadow-2xl" />
            </Reveal>
          </div>
          <div className="flex-1 space-y-8 md:space-y-12 order-1 md:order-2 text-center md:text-left">
            <Reveal>
              <h2 className="font-space font-black text-4xl md:text-9xl tracking-tighter leading-none uppercase text-white">
                {t.archive.title[0]}<span className="text-brand-gold opacity-50">{t.archive.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-lg md:text-4xl font-light italic opacity-50 leading-tight text-brand-beige">{t.archive.desc}</p>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start pt-4 md:pt-6">
                {t.archive.tags.map(tag => (
                  <span key={tag} className="px-5 py-2 md:px-8 md:py-3 border border-white/10 rounded-full text-[8px] md:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.4em] opacity-40 uppercase text-white">{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 05. MATERIALS */}
      <Section id="materials" number="05" onVisible={() => setIsLight(true)} className="bg-[#EBD3AC] min-h-screen">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="flex-[1.5] space-y-12 md:space-y-16 w-full">
            <Reveal>
              <h2 className="font-space font-black text-4xl md:text-9xl tracking-tighter uppercase leading-[0.8] text-[#050B18]">
                {t.materia.title[0]}<br/><span className="opacity-30">{t.materia.title[1]}</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {t.materia.items.map((m, i) => (
                <Reveal key={i}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMaterial(m)}
                    className="bg-black/5 p-8 md:p-10 border border-black/10 rounded-[30px] md:rounded-[40px] hover:bg-black/10 transition-all group cursor-pointer"
                  >
                    <span className="text-[7px] tracking-[0.5em] opacity-60 uppercase font-black mb-3 block text-[#050B18]">{m.s}</span>
                    <h3 className="font-space font-black text-xl md:text-4xl mb-3 tracking-tighter text-[#050B18]">{m.t}</h3>
                    <p className="text-[10px] md:text-sm font-light opacity-60 leading-relaxed text-[#050B18]">{m.d}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end relative mt-12 lg:mt-0">
             <Reveal>
               <img src="/brand/materia_hand.png" className="h-[40vh] md:h-[80vh] w-auto object-contain grayscale brightness-90 contrast-125" />
             </Reveal>
          </div>
        </div>
      </Section>

      {/* 06. PRODUCTION */}
      <Section id="production" number="06" onVisible={() => setIsLight(false)} className="bg-[#050505]">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8 md:space-y-12 text-center md:text-left">
            <Reveal>
              <h2 className="font-space font-black text-4xl md:text-[10rem] tracking-tighter leading-[0.8] uppercase text-white">
                {t.production.title[0]}<br/><span className="text-brand-gold">{t.production.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-lg md:text-3xl font-light opacity-50 leading-tight max-w-md mx-auto md:mx-0 text-brand-beige">{t.production.desc}</p>
            </Reveal>
          </div>
          <div className="flex-1 relative h-[35vh] md:h-[80vh] w-full overflow-hidden rounded-[30px] md:rounded-[50px] border border-white/5">
             <motion.img 
               style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
               src="/brand/premium_industrial_grid.png" 
               className="w-full h-[150%] object-cover grayscale opacity-20 contrast-150"
             />
          </div>
        </div>
      </Section>

      {/* 07. CONTACT */}
      <Section id="contact" number="07" onVisible={() => setIsLight(false)} className="bg-[#050505]">
        <div className="flex flex-col items-center justify-between min-h-[70vh] text-center py-20">
          <div className="space-y-24 flex-grow flex flex-col justify-center">
            <Reveal>
              <h2 className="font-space font-black text-5xl md:text-[15rem] tracking-tighter leading-none uppercase text-glow text-white">
                {t.contact.title[0]}<span className="text-brand-gold opacity-50">{t.contact.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal>
              <motion.a 
                href="https://wa.me/5493546513432" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: -2 }} 
                className="inline-flex items-center gap-10 bg-brand-beige text-brand-dark px-14 py-8 md:px-24 md:py-12 font-space font-black text-2xl md:text-5xl uppercase shadow-2xl rounded-[40px] mx-auto"
              >
                <MessageCircle size={80} strokeWidth={3} />
                {t.contact.cta}
              </motion.a>
            </Reveal>
          </div>
          <Reveal>
            <footer className="mt-32 font-outfit text-[9px] tracking-[1.2em] opacity-20 uppercase font-black text-brand-gold leading-loose">{t.contact.footer}</footer>
          </Reveal>
        </div>
      </Section>
    </main>
  );
};

export default App;
