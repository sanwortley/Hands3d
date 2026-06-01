import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from './lib/store';
import { translations } from './translations';

// Components
import HeroSection from './components/HeroSection';
import PresentationSection from './components/PresentationSection';
import ProductsSection from './components/ProductsSection';
import CircularArchive from './components/CircularArchive';
import ProductionSection from './components/ProductionSection';
import BudgetSection from './components/BudgetSection';
import WorldCupSection from './components/WorldCupSection';
import CalculatorSection from './components/CalculatorSection';
import MaterialModal from './components/MaterialModal';

export const App: React.FC = () => {
  const { 
    lang, 
    selectedMaterial, 
    setSelectedMaterial, 
    selectedModel, 
    setSelectedModel,
    isFichaOpen, 
    setIsFichaOpen,
    activeSection,
    setActiveSection
  } = useAppStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  // List of active 3D models with spec sheets
  const models = [
    {
      name: lang === 'es' ? 'Portalápices Grooved' : 'Architectural Penholder',
      url: '/models/001-BASE + VASO-PORTALAPICES X2.stl',
      specs: {
        material: 'PLA PRO',
        resolution: '0.2 mm',
        infill: '15%',
        time: lang === 'es' ? '18 horas' : '18 hours',
        dimensions: '180 x 95 x 110 mm',
        weight: '160g',
        strength: lang === 'es' ? 'Media' : 'Medium'
      }
    },
    {
      name: lang === 'es' ? 'Bandeja de Diseño' : 'Design Tray',
      url: '/models/bandeja.stl',
      specs: {
        material: 'PETG PRO',
        resolution: '0.28 mm',
        infill: '20%',
        time: lang === 'es' ? '8 horas' : '8 hours',
        dimensions: '220 x 140 x 30 mm',
        weight: '110g',
        strength: lang === 'es' ? 'Alta' : 'High'
      }
    },
    {
      name: lang === 'es' ? 'Cuerpo Estructural' : 'Structural Core',
      url: '/models/cuerpo.stl',
      specs: {
        material: 'ABS HT',
        resolution: '0.15 mm',
        infill: '40%',
        time: lang === 'es' ? '14 horas' : '14 hours',
        dimensions: '90 x 90 x 120 mm',
        weight: '180g',
        strength: lang === 'es' ? 'Extrema' : 'Extreme'
      }
    },
    {
      name: lang === 'es' ? 'Boquilla Mecánica' : 'Mechanical Nozzle',
      url: '/models/vengala pieza.stl',
      specs: {
        material: 'FLEX',
        resolution: '0.2 mm',
        infill: '100%',
        time: lang === 'es' ? '6 horas' : '6 hours',
        dimensions: '60 x 60 x 85 mm',
        weight: '75g',
        strength: lang === 'es' ? 'Flexible' : 'Elastic'
      }
    }
  ];

  // Set default model on mount if not already loaded
  useEffect(() => {
    if (!selectedModel) {
      setSelectedModel(models[0].url);
    }
  }, [selectedModel]);

  // Section visibility observer for active indicators
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const height = window.innerHeight;
    
    // Snapping index matching section positions
    const index = Math.round(scrollTop / height);
    const sections = [
      'home', 
      'about', 
      'products', 
      'materials', 
      'production', 
      'budget', 
      'worldcup', 
      'calculator'
    ];
    
    if (sections[index] && sections[index] !== activeSection) {
      setActiveSection(sections[index]);
    }
  };

  return (
    <>
      {/* Background grain noise layer for high aesthetics */}
      <div className="grain" />

      {/* Snap vertical container */}
      <main 
        ref={containerRef}
        onScroll={handleScroll}
        className="snap-container no-scrollbar bg-[#FAF5EF]"
      >
        {/* Slide 01: Hero */}
        <section id="home" className="snap-section">
          <HeroSection />
        </section>

        {/* Slide 02: Presentation Brand statement */}
        <section id="about" className="snap-section">
          <PresentationSection />
        </section>

        {/* Slide 03: Interactive 3D Product Slider */}
        <section id="products" className="snap-section">
          <ProductsSection 
            t={t}
            models={models}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            isFichaOpen={isFichaOpen}
            setIsFichaOpen={setIsFichaOpen}
            handleScrollTo={(id) => {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* Slide 05: Materials Catalog Grid */}
        <section id="materials" className="snap-section">
          <CircularArchive t={t} setSelectedMaterial={setSelectedMaterial} />
        </section>

        {/* Slide 07: Presupuesto B2B scale */}
        <section id="production" className="snap-section">
          <ProductionSection />
        </section>

        {/* Slide 08: Formulario de Contacto / Cotización */}
        <section id="budget" className="snap-section">
          <BudgetSection />
        </section>

        {/* Slide 09: Special Mundial 2026 */}
        <section id="worldcup" className="snap-section">
          <WorldCupSection />
        </section>


        {/* Slide 11: Calculadora de Costos Emprendedor */}
        <section id="calculator" className="snap-section">
          <CalculatorSection />
        </section>
      </main>

      {/* Materials modular popup panel sheet overlays */}
      <AnimatePresence>
        {selectedMaterial && (
          <MaterialModal 
            material={selectedMaterial} 
            onClose={() => setSelectedMaterial(null)} 
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
