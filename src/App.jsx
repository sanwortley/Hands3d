import * as THREE from 'three';
// Build Trigger: 2026-04-30 12:08
import React, { useState, useEffect, useRef, Suspense } from 'react';
import CircularArchive from './components/CircularArchive';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stage, Environment } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { MessageCircle, ArrowUpRight, Menu, X } from 'lucide-react';

const Reveal = ({ children, width = "100%" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible", border: "none", outline: "none" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
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
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;

  // Ensure the geometry is centered relative to its origin
  useEffect(() => {
    if (geom) geom.center();
  }, [geom]);

  // The rotation is now purely manual to allow for total inspection mobility


  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <primitive object={geom} attach="geometry" />
      <meshPhysicalMaterial 
        color="#333333"
        roughness={0.4}
        metalness={0.1}
        clearcoat={0.1}
        clearcoatRoughness={0.5}
        reflectivity={0.2}
      />
    </mesh>
  );
};

const STLViewer = ({ modelUrl }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing relative group"
      onPointerDown={() => setIsMouseDown(true)}
      onPointerUp={() => setIsMouseDown(false)}
      onPointerLeave={() => setIsMouseDown(false)}
    >
      <div className="relative h-full w-full overflow-hidden bg-white">
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          gl={{ 
            antialias: true,
            shadowMapType: THREE.PCFShadowMap
          }}
          style={{ touchAction: 'none' }} // Evita scroll de página al tocar el modelo
          camera={{ position: [0, 0, 150], fov: 40 }}
        >
          <Suspense fallback={null}>
            <Stage 
              environment="city" 
              intensity={1.5} 
              contactShadow={{ opacity: 0.2, blur: 3 }} 
              adjustCamera={1.2} 
              center
            >
              <STLModel url={modelUrl} />
            </Stage>
            <OrbitControls 
              enablePan={false} 
              enableZoom={isMouseDown} 
              enableRotate={true}
              makeDefault
              minPolarAngle={0} 
              maxPolarAngle={Math.PI} // Permite girar 360 grados verticalmente
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
      title: 'hands3d',
      desc: 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.',
      nav: ['Projects', 'Our ethos', 'Inquiry'],
      footer: {
        copy: '© hands3d 2026',
        email: 'info@hands3d.studio',
        phone: '+1234567890',
        about: 'About'
      }
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
      desc: 'Cinematic exploration of digital manufacturing.'
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
          density: '1.24 g/cm³',
          hardness: '80 Shore D',
          ld: 'Our PLA PRO is optimized for architectural visualization. It offers a smooth, matte finish that hides layer lines while maintaining sharp edge definition. Ideal for urban planning and structural models.'
        },
        { 
          t: 'ABS HT', 
          s: 'Structural', 
          d: 'High thermal resistance for industrial performance parts.',
          img: '/brand/abs_ht.png',
          density: '1.05 g/cm³',
          hardness: '75 Shore D',
          ld: 'Engineered for high-temperature environments, ABS HT provides superior mechanical strength and impact resistance. It is the industrial standard for functional prototypes and tooling.'
        },
        { 
          t: 'PETG PRO', 
          s: 'Functional', 
          d: 'Chemically inert and impact resistant for functional prototypes.',
          img: '/brand/petg_pro.png',
          density: '1.27 g/cm³',
          hardness: '78 Shore D',
          ld: 'PETG PRO combines the ease of printing with the strength of industrial materials. It is moisture resistant and chemically stable, making it perfect for custom mechanical components.'
        },
        { 
          t: 'FLEX', 
          s: 'Kinetic', 
          d: 'Variable shore hardness for elastic and ergonomic exploration.',
          img: '/brand/flex.png',
          density: '1.20 g/cm³',
          hardness: '95 Shore A',
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
      title: 'hands3d',
      desc: 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.',
      nav: ['Proyectos', 'Nuestro ethos', 'Consulta'],
      footer: {
        copy: '© hands3d 2026',
        email: 'info@hands3d.studio',
        phone: '+1234567890',
        about: 'Sobre nosotros'
      }
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
      desc: 'Exploración cinemática de la fabricación digital.'
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
          density: '1.24 g/cm³',
          hardness: '80 Shore D',
          ld: 'Nuestro PLA PRO está optimizado para la visualización arquitectónica. Ofrece un acabado mate suave que oculta las líneas de capa manteniendo bordes afilados. Ideal para planificación urbana y modelos estructurales.'
        },
        { 
          t: 'ABS HT', 
          s: 'Estructural', 
          d: 'Alta resistencia térmica para piezas de rendimiento industrial.',
          img: '/brand/abs_ht.png',
          density: '1.05 g/cm³',
          hardness: '75 Shore D',
          ld: 'Diseñado para entornos de alta temperatura, el ABS HT proporciona una resistencia mecánica y al impacto superior. Es el estándar industrial para prototipos funcionales y herramental.'
        },
        { 
          t: 'PETG PRO', 
          s: 'Funcional', 
          d: 'Químicamente inerte y resistente al impacto para prototipos funcionales.',
          img: '/brand/petg_pro.png',
          density: '1.27 g/cm³',
          hardness: '78 Shore D',
          ld: 'El PETG PRO combina la facilidad de impresión con la fuerza de materiales industriales. Es resistente a la humedad y químicamente estable, perfecto para componentes mecánicos personalizados.'
        },
        { 
          t: 'FLEX', 
          s: 'Kinetic', 
          d: 'Dureza variable para exploración elástica y ergonómica.',
          img: '/brand/flex.png',
          density: '1.20 g/cm³',
          hardness: '95 Shore A',
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-8 bg-white/80 backdrop-blur-3xl"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="relative w-full max-w-5xl bg-white border border-black/5 rounded-[40px] md:rounded-[50px] overflow-hidden flex flex-col h-full max-h-[90vh] md:max-h-[700px] shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-[#EBD3AC] text-[#1a1a1a] px-5 py-2 md:px-6 md:py-2 rounded-full font-space font-black text-[8px] md:text-[9px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          {t.modal.close}
        </button>

        <div className="flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-hidden bg-white">
          <div className="w-full md:flex-1 h-[25vh] md:h-full relative overflow-hidden bg-black border-b md:border-b-0 md:border-r border-white/5 shrink-0">
            <img 
              src={material.img} 
              alt={material.t} 
              className="w-full h-full object-cover grayscale contrast-125 opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#050B18]/80" />
          </div>

          <div className="w-full md:flex-[1.2] p-8 md:p-16 flex flex-col justify-center space-y-6 md:space-y-10">
            <div className="space-y-2 md:space-y-4">
              <span className="text-[#3e5f8a] font-space font-black tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[9px] uppercase opacity-60">{material.s}</span>
              <h2 className="font-space font-black text-4xl md:text-6xl tracking-tighter uppercase leading-none text-[#1a1a1a]">{material.t}</h2>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h3 className="font-outfit text-[#3e5f8a]/30 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[9px]">{t.modal.spec}</h3>
              <p className="text-lg md:text-2xl font-light leading-relaxed text-[#1a1a1a]/70">
                {material.ld}
              </p>
            </div>

            <div className="pt-4 md:pt-6 border-t border-black/5">
              <div className="flex gap-10 md:gap-12 mt-4">
                <div className="space-y-1">
                  <span className="block text-[7px] font-black opacity-30 uppercase tracking-[0.3em] text-[#1a1a1a]">Density</span>
                  <span className="font-space font-bold text-lg md:text-xl text-[#3e5f8a]">{material.density}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[7px] font-black opacity-30 uppercase tracking-[0.3em] text-[#1a1a1a]">Hardness</span>
                  <span className="font-space font-bold text-lg md:text-xl text-[#3e5f8a]">{material.hardness}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ lang, setLang, t, isLight, showNavbar }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsTop(latest < 10);
      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    });
  }, [scrollY]);

  const isContrastMode = isLight;
  const logoMainColor = isContrastMode ? 'text-[#1a1a1a]' : 'text-white';
  const logoSubColor = isContrastMode ? 'text-[#3e5f8a]' : 'text-[#EBD3AC]';
  const navLinkColor = isContrastMode ? 'text-[#1a1a1a]/60' : 'text-white/40';
  const navLinkHoverColor = isContrastMode ? 'hover:text-[#3e5f8a]' : 'hover:text-white';
  const pillBg = isContrastMode ? 'bg-[#3e5f8a]/10 border-[#3e5f8a]/20' : 'bg-black/20 border-white/10';
  const pillActiveBg = isContrastMode ? 'bg-[#3e5f8a]' : 'bg-[#EBD3AC]';
  const pillActiveText = isContrastMode ? 'text-white' : 'text-[#1a1a1a]';
  const pillInactiveText = isContrastMode ? 'text-[#3e5f8a]/40 hover:text-[#3e5f8a]' : 'text-white/40 hover:text-white';

  const navIds = ['archive', 'products', 'materials', 'production'];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -120 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-4 md:px-16 md:py-8 flex justify-between items-center transition-all duration-500 border-none outline-none ${isTop ? 'bg-transparent' : (isLight ? 'bg-white/95 backdrop-blur-2xl border-b border-black/5 shadow-xl' : 'bg-[#3e5f8a]/95 backdrop-blur-2xl border-b border-white/5 shadow-xl')}`}
      >
        <div className="flex items-center gap-6 md:gap-16">
          <motion.div 
            onClick={() => {
              setIsOpen(false);
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`font-space font-black text-2xl md:text-3xl tracking-tighter flex items-baseline transition-colors duration-500 cursor-pointer hover:opacity-80`}
          >
            <span className={logoMainColor}>hands</span>
            <span className={`${logoSubColor} ml-0.5`}>3D</span>
          </motion.div>
          
          <div className={`hidden md:flex relative items-center p-1 rounded-full border cursor-pointer h-10 w-24 shrink-0 transition-all duration-500 ${pillBg}`}>
            <motion.div 
              className={`absolute h-8 w-[44px] rounded-full shadow-lg transition-colors duration-500 ${pillActiveBg}`}
              animate={{ x: lang === 'es' ? 4 : 44 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            <button 
              onClick={() => setLang('es')}
              className={`relative z-10 flex-1 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${lang === 'es' ? pillActiveText : pillInactiveText}`}
            >
              ES
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`relative z-10 flex-1 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${lang === 'en' ? pillActiveText : pillInactiveText}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {t.nav.map((item, i) => (
            <button 
              key={navIds[i]} 
              onClick={() => document.getElementById(navIds[i])?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-300 ${navLinkColor} ${navLinkHoverColor} hover:tracking-[0.6em]`}
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${isContrastMode ? 'bg-[#3e5f8a] text-white' : 'bg-[#EBD3AC] text-[#1a1a1a]'} hover:scale-105 hover:shadow-xl active:scale-95`}
          >
            {t.connect}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-4">
          <div className={`relative flex items-center p-0.5 rounded-full border h-8 w-16 transition-all duration-500 border-black/10 bg-black/5`}>
            <motion.div 
              className={`absolute h-6 w-[28px] rounded-full shadow-sm ${pillActiveBg}`}
              animate={{ x: lang === 'es' ? 0 : 30 }}
            />
            <button onClick={() => setLang('es')} className={`relative z-10 flex-1 text-[8px] font-black text-center ${lang === 'es' ? pillActiveText : pillInactiveText}`}>ES</button>
            <button onClick={() => setLang('en')} className={`relative z-10 flex-1 text-[8px] font-black text-center ${lang === 'en' ? pillActiveText : pillInactiveText}`}>EN</button>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isContrastMode ? 'text-[#1a1a1a]' : 'text-white'}`}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6.5 : 0 }} className="w-5 h-0.5 bg-current rounded-full" />
              <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-5 h-0.5 bg-current rounded-full" />
              <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6.5 : 0 }} className="w-5 h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white flex flex-col items-center justify-center p-10"
          >
            <div className="flex flex-col items-center space-y-8 w-full">
              {t.nav.map((item, i) => (
                <button 
                  key={navIds[i]} 
                  onClick={() => { setIsOpen(false); document.getElementById(navIds[i])?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-4xl font-space font-black uppercase tracking-[0.2em] text-[#1a1a1a] hover:text-[#3e5f8a] transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="w-20 h-px bg-black/10 my-4" />
              <button 
                onClick={() => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="w-full py-5 bg-[#3e5f8a] text-white rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-2xl"
              >
                {t.connect}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

const Section = ({ children, id, number, onVisible, className = "bg-brand-dark", fullWidth = false, container, skipRotation = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: container,
    offset: ["start end", "end start"]
  });

  // 3D Cylinder / Roulette Animation Logic
  const isHome = id === 'home' || skipRotation;
  
  // Rotation: from 45deg (entering) to 0 (active) to -45deg (exiting)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  
  // Depth: moving back into the scene when entering/exiting
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-300, 0, -300]);
  
  // Scale: subtle shrink for depth
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  // Opacity: fade out
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);

  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  useEffect(() => {
    if (!container?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { 
        root: container.current,
        threshold: 0.1 
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible, container, container?.current]);

  return (
    <section 
      ref={ref}
      id={id}
      className={`snap-section relative w-full overflow-hidden ${fullWidth ? '' : 'flex flex-col items-center justify-center'} ${className || (fullWidth ? '' : 'pt-32 pb-16 md:py-32')}`}
    >
      {number && (
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
          className="absolute top-12 left-6 md:left-16 font-space font-bold text-[10px] md:text-base tracking-[0.4em] opacity-30 flex items-center gap-3 md:gap-4 pointer-events-none"
        >
          <span className="w-6 md:w-8 h-px bg-current" />
          {number}
        </motion.div>
      )}
      <motion.div 
        style={!isHome ? { 
          rotateX, 
          z, 
          scale, 
          opacity, 
          transformStyle: "preserve-3d" 
        } : (skipRotation ? {} : { 
          skewX: skew, 
          y: useTransform(scrollYProgress, [0, 1], [30, -30]) 
        })}
        className={`relative z-10 ${fullWidth ? 'w-full h-screen' : `w-full max-w-[1440px] mx-auto ${className?.includes('px-') ? '' : 'px-6 md:px-24'}`}`}
      >
        {children}
      </motion.div>
    </section>
  );
};

const App = () => {
  const [lang, setLang] = useState('es');
  const t = translations[lang];
  const [isLight, setIsLight] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [selectedModel, setSelectedModel] = useState('/models/bandeja.stl');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  // Use state for container to ensure hooks update when it mounts
  const [containerNode, setContainerNode] = useState(null);
  const containerRef = useRef(null);

  const setRefs = (node) => {
    containerRef.current = node;
    setContainerNode(node);
  };

  const { scrollY, scrollYProgress } = useScroll({ container: containerRef });
  const models = [
    { name: 'Bandeja Técnica', url: '/models/bandeja.stl' },
    { name: 'Cuerpo Base', url: '/models/cuerpo.stl' },
    { name: 'Porta Vaso v1', url: '/models/PORTA VASO-1.stl' },
    { name: 'Porta Vaso v2', url: '/models/PORTA VASO-2.stl' },
    { name: 'Porta Vaso v3', url: '/models/PORTA VASO-3.stl' },
    { name: 'Base Vasos x2', url: '/models/001-BASE + VASO-PORTALAPICES X2.stl' },
    { name: 'Base Lápices x3', url: '/models/001-BASE-PORTALAPICERA X3.stl' },
    { name: 'Vasos x3', url: '/models/001-VASOS-PORTALAPICES X3.stl' },
    { name: 'Pieza Vengala', url: '/models/vengala pieza.stl' }
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (!containerNode) return;
    
    const handleScroll = () => {
      // Usamos scrollTop para mayor compatibilidad con el contenedor main
      const currentScroll = containerNode.scrollTop;
      if (currentScroll > 30) setShowNavbar(true);
      else setShowNavbar(false);
    };
    
    containerNode.addEventListener('scroll', handleScroll);
    // Disparar una vez por si ya hay scroll al cargar
    handleScroll();
    
    return () => containerNode.removeEventListener('scroll', handleScroll);
  }, [containerNode]);

  const categories = [
    {
      id: 'produccion',
      title: 'Producción 3D',
      cover: '/ind_8.jpg',
      images: [
        '/ind_8.jpg', '/ind_9.jpg',
        '/arq_8.jpg', '/arq_9.jpg', '/arq_10.jpg',
        '/dis_1.jpg', '/dis_2.jpg', '/dis_3.jpg', '/dis_5.jpg'
      ],
      desc: 'La precisión del proceso: piezas capturadas directamente desde la bandeja de impresión.'
    },
    {
      id: 'finalizados',
      title: 'Proyectos en Escenario',
      cover: '/arq_1.jpg',
      images: [
        '/trabajo_1.jpg', '/trabajo_2.jpg', '/trabajo_3.jpg', '/trabajo_4.jpg',
        '/trabajo_5.jpg', '/trabajo_6.jpg', '/ind_6.jpg', '/ind_7.jpg',
        '/arq_1.jpg', '/arq_2.jpg', '/arq_3.jpg', '/arq_4.jpg', '/arq_5.jpg', '/arq_7.jpg',
        '/ind_1.jpg', '/ind_2.jpg', '/ind_3.jpg', '/ind_4.jpg', '/ind_5.jpg'
      ],
      desc: 'El resultado real: piezas integradas en balcones, oficinas y estudios.'
    }
  ];

  const allShowcaseImages = categories.flatMap(cat => 
    cat.images.map(img => ({ url: img, category: cat.title, desc: cat.desc }))
  );

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSelectedModel(prev => {
        const currentIndex = models.findIndex(m => m.url === prev);
        const nextIndex = (currentIndex + 1) % models.length;
        return models[nextIndex].url;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlay, models]);

  // Gallery Autoplay Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCatIndex(prev => (prev + 1) % allShowcaseImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allShowcaseImages.length]);

  return (
    <>
      <AnimatePresence>
        {selectedMaterial && (
          <MaterialModal 
            material={selectedMaterial} 
            onClose={() => setSelectedMaterial(null)} 
            t={t}
          />
        )}
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-dark/98 backdrop-blur-3xl overflow-y-auto"
          >
            <div className="max-w-[1440px] mx-auto px-6 py-24 md:py-32">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
                <div className="space-y-4">
                  <span className="text-brand-gold text-[10px] md:text-xs font-black uppercase tracking-[0.8em]">Categoría</span>
                  <h2 className="font-space font-black text-4xl md:text-[8rem] tracking-tighter uppercase leading-none text-white">{selectedCategory.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="bg-white text-brand-dark px-6 py-3 md:px-10 md:py-4 rounded-full font-space font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-brand-beige transition-colors whitespace-nowrap self-end md:self-auto"
                >
                  Cerrar Galería
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {selectedCategory.images.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-[4/5] md:aspect-[16/9] rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/10"
                  >
                    <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main 
        ref={setRefs}
        className="snap-container relative w-full h-screen overflow-y-scroll overflow-x-hidden bg-brand-dark scroll-smooth selection:bg-brand-beige selection:text-brand-dark"
      >
        <div className="grain pointer-events-none" />
        <Navbar lang={lang} setLang={setLang} t={t} isLight={isLight} showNavbar={showNavbar} />


      {/* 01. HOME (HERO) - MINIMALIST REVERSION */}
      {/* 01. HOME (HERO) - MINIMALIST EDITORIAL REVERSION */}
      <Section 
        id="home" 
        container={containerRef}
        onVisible={() => { setIsLight(false); }} 
        className="!p-0 !bg-[#3e5f8a]" 
        fullWidth={true}
      >
        <div className="flex flex-col h-screen w-full font-inter overflow-hidden">
          {/* Top Section - Blue #3e5f8a Background */}
          <div className="h-[55%] w-full bg-[#3e5f8a] relative px-6 md:px-16 py-10 flex flex-col justify-between">
            {/* Empty space for a cleaner look */}
            <div className="flex justify-between items-start w-full relative z-20">
            </div>
            
            {/* Subtle background element or empty space to match the aesthetic */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-[80%] h-px bg-white/20" />
            </div>
          </div>
          
          {/* Bottom Section - Pure White Background */}
          <div className="h-[45%] w-full bg-[#FFFFFF] relative px-6 md:px-16 py-12 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.8] tracking-[-0.05em] text-[#111111] lowercase"
              >
                {t.hero.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md flex gap-5 mt-4 md:mt-10"
              >

                <p className="text-[11px] md:text-[13px] leading-[1.6] text-[#111111]/70 font-medium text-pretty">
                  {t.hero.desc}
                </p>
              </motion.div>
            </div>
            
            {/* Hero Footer Info */}
            <div className="flex justify-between items-end gap-6 pt-10 border-t border-black/5">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-[0.3em] text-black/30 font-bold">{t.hero.footer.copy}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 02. PRODUCTS - DIRECT FULLSCREEN SECTION WITH SAFE MARGINS */}
      <Section 
        id="products" 
        container={containerRef}
        skipRotation={true}
        onVisible={() => { setIsLight(true); }} 
        className="!p-0 bg-white" 
        fullWidth={true}
      >
        {/* Floating Minimalist Signature */}
        <div className="absolute top-20 left-6 md:left-16 z-20 pointer-events-none">
          <Reveal>
            <h2 className="font-space font-black text-2xl md:text-5xl lg:text-7xl tracking-tighter uppercase text-[#3e5f8a]/60">
              {t.products.title[0]} <span className="text-[#3e5f8a]">{t.products.title[1]}</span>
            </h2>
          </Reveal>
        </div>
        
        {/* Central 3D Stage */}
        <div className="w-full h-full flex flex-col items-center justify-center pt-20">
          <div className="w-full h-[50vh] md:h-[60vh] max-w-5xl mx-auto">
            <STLViewer modelUrl={selectedModel} />
          </div>
        </div>  
          {/* Horizontal Model Selector */}
          <div className="absolute bottom-8 md:bottom-12 left-0 w-full z-30 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-[#3e5f8a]/80">Catálogo de Piezas</span>
                
                <button 
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="flex items-center justify-center transition-all opacity-100 hover:scale-110"
                >
                  {isAutoPlay ? (
                    <svg className="w-3 h-3 text-[#3e5f8a]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-3 h-3 text-[#3e5f8a]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
              </div>

              <div className="flex md:justify-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-4 -mx-2 px-2">
                {models.map((m) => (
                  <button
                    key={m.url}
                    onClick={() => setSelectedModel(m.url)}
                    className={`flex-none flex flex-col items-center px-4 py-2 md:px-6 md:py-3 rounded-xl transition-all duration-700 border ${
                      selectedModel === m.url 
                        ? 'bg-[#F5E6D3] border-[#F5E6D3] scale-105 shadow-xl' 
                        : 'bg-black/5 border-black/5 hover:bg-black/10 backdrop-blur-sm'
                    }`}
                  >
                    <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest mb-1 ${
                      selectedModel === m.url ? 'text-[#1a1a1a]' : 'text-[#3e5f8a]/80'
                    }`}>
                      {selectedModel === m.url ? 'Vista' : 'Pieza'}
                    </span>
                    <span className={`text-[9px] md:text-[11px] font-bold whitespace-nowrap transition-colors ${
                      selectedModel === m.url ? 'text-[#1a1a1a]' : 'text-[#3e5f8a]/90'
                    }`}>
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
          </div>
        </div>
      </Section>

      {/* 03. SHOWCASE - EDITORIAL GALLERY (7-IMAGE MODE) */}
      <Section id="showcase" number="03" container={containerRef} onVisible={() => { setIsLight(false); }} className="bg-[#0a0a0a] !px-0 flex flex-col">
        {/* Entrance Header */}
        <div className="w-full h-[50vh] flex items-center justify-center relative px-6 md:px-24">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="text-[#EBD3AC] text-[10px] font-black uppercase tracking-[1em] mb-6 block opacity-60">Portfolio Archive</span>
              <h2 className="font-space font-black text-6xl md:text-[12rem] lg:text-[15rem] tracking-tighter uppercase leading-none text-white opacity-20 select-none">
                Gallery
              </h2>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12 text-white/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7"/></svg>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Carousel Content */}
        <div className="w-full pb-32 relative">
          <div className="px-6 md:px-24 mb-12 flex justify-between items-end">
            <div className="space-y-2">
              <span className="text-[#EBD3AC] text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em]">{(activeCatIndex + 1).toString().padStart(2, '0')} / {allShowcaseImages.length.toString().padStart(2, '0')}</span>
              <div className="w-48 h-px bg-[#EBD3AC]/40" />
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold hidden md:block">Scroll to explore or use controls</p>
          </div>

          <div className="relative h-[600px] flex items-center w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <div className="w-full h-px bg-white/5" />
            </div>
            
            <div className="w-full overflow-visible">
              <motion.div 
                className="flex gap-4 md:gap-12 px-[5%] md:px-[10%]"
                animate={{ 
                  x: isMobile 
                    ? `calc(50% - ${(activeCatIndex * 216) + 100}px)`
                    : `calc(35vw - ${activeCatIndex * 298}px)` 
                }}
                transition={{ type: "spring", stiffness: 70, damping: 20 }}
              >
                {allShowcaseImages.map((img, i) => {
                  const isActive = i === activeCatIndex;
                  const distance = Math.abs(i - activeCatIndex);
                  
                  return (
                    <motion.div
                      key={i}
                      onClick={() => setActiveCatIndex(i)}
                      className={`relative shrink-0 cursor-pointer transition-all duration-700 ${isActive ? 'z-20' : 'z-10'}`}
                      animate={{ 
                        scale: isActive ? 1.6 : 0.8,
                        opacity: isActive ? 1 : (distance > 4 ? 0 : 0.25),
                        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                        y: isActive ? -10 : 0
                      }}
                    >
                      <div className={`w-[200px] md:w-[250px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border ${isActive ? 'border-[#EBD3AC]/40' : 'border-transparent'}`}>
                        <img 
                          src={img.url} 
                          alt={img.category} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center items-center gap-20 mt-32">
            <button 
              onClick={() => setActiveCatIndex(prev => Math.max(0, prev - 1))}
              className="text-white/20 hover:text-[#EBD3AC] transition-all hover:scale-125 disabled:opacity-0"
              disabled={activeCatIndex === 0}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => setActiveCatIndex(prev => Math.min(allShowcaseImages.length - 1, prev + 1))}
              className="text-white/20 hover:text-[#EBD3AC] transition-all hover:scale-125 disabled:opacity-0"
              disabled={activeCatIndex === allShowcaseImages.length - 1}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </Section>

      {/* 04 & 05. MATERIALS & ARCHIVE - CIRCULAR FLOW */}
      <Section 
        id="materials" 
        container={containerRef}
        onVisible={() => { setIsLight(true); }} 
        className="!p-0 bg-white snap-section" 
        fullWidth={true}
      >
        <CircularArchive t={t} setSelectedMaterial={setSelectedMaterial} />
      </Section>
      <div id="archive" />

      {/* 06. PRODUCTION */}
      <Section id="production" number="06" container={containerRef} onVisible={() => { setIsLight(true); }} className="bg-white">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8 md:space-y-12 text-center md:text-left">
            <Reveal>
              <h2 className="font-space font-black text-4xl md:text-[10rem] tracking-tighter leading-[0.8] uppercase text-[#1a1a1a]">
                {t.production.title[0]}<br/><span className="text-[#3e5f8a]">{t.production.title[1]}</span>
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
      <Section id="contact" number="07" container={containerRef} onVisible={() => { setIsLight(true); }} className="bg-white">
        <div className="flex flex-col items-center justify-between min-h-[70vh] text-center py-20 px-4">
          <div className="space-y-16 md:space-y-24 flex-grow flex flex-col justify-center">
            <Reveal>
              <h2 className="font-space font-black text-6xl md:text-[15rem] tracking-tighter leading-none uppercase text-[#1a1a1a]">
                {t.contact.title[0]}<span className="text-[#3e5f8a]/50">{t.contact.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal>
              <motion.a 
                href="https://wa.me/5493546513432" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: -2 }} 
                className="inline-flex items-center gap-6 md:gap-10 bg-brand-beige text-brand-dark px-10 py-6 md:px-24 md:py-12 font-space font-black text-xl md:text-5xl uppercase shadow-2xl rounded-[30px] md:rounded-[40px] mx-auto"
              >
                <MessageCircle className="w-8 h-8 md:w-20 md:h-20" strokeWidth={3} />
                {t.contact.cta}
              </motion.a>
            </Reveal>
          </div>
          <Reveal>
            <footer className="mt-20 md:mt-32 font-outfit text-[8px] md:text-[9px] tracking-[0.8em] md:tracking-[1.2em] opacity-20 uppercase font-black text-brand-gold leading-loose px-4">
              {t.contact.footer}
            </footer>
          </Reveal>
        </div>
      </Section>
    </main>
    </>
  );
};

export default App;
