import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';

interface MaterialSpec {
  t: string;
  s: string;
  d: string;
  img: string;
  density: string;
  hardness: string;
  ld: string;
}

interface CircularArchiveProps {
  t: any;
  setSelectedMaterial: (mat: any) => void;
  isActive?: boolean;
}

const CircularArchive: React.FC<CircularArchiveProps> = ({ t }) => {
  const { lang } = useAppStore();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const materials = t.materia.items;
  const currentMaterial = materials[selectedIdx];

  useEffect(() => {
    setZoom(1);
  }, [selectedIdx]);

  const handlePrev = () => {
    setSelectedIdx((prevIdx) => (prevIdx - 1 + materials.length) % materials.length);
  };

  const handleNext = () => {
    setSelectedIdx((prevIdx) => (prevIdx + 1) % materials.length);
  };

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative overflow-hidden bg-[#FAF5EF] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
    >
      {/* Active Material Image in the center of the viewport stage */}
      <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center pointer-events-none p-6 md:p-12">
        <div className="w-full max-w-5xl h-full flex items-center justify-center pt-24 pb-48 md:pt-28 md:pb-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center justify-center max-h-[42dvh] md:max-h-[52dvh]"
            >
              <motion.img
                drag={zoom > 1}
                dragConstraints={{ left: -250, right: 250, top: -250, bottom: 250 }}
                dragElastic={0.15}
                whileTap={{ cursor: 'grabbing' }}
                onDoubleClick={() => setZoom(prev => prev === 1 ? 2 : 1)}
                src={currentMaterial.img}
                alt={currentMaterial.t}
                animate={{ 
                  scale: zoom,
                  x: zoom === 1 ? 0 : undefined,
                  y: zoom === 1 ? 0 : undefined
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] pointer-events-auto cursor-grab select-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Zoom Controls - Ultra Minimalist & Borderless */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-[26%] md:bottom-[22%] z-30 pointer-events-auto items-center gap-5 select-none opacity-40 hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setZoom(prev => Math.max(1, prev - 0.5))}
          className="w-5 h-5 flex items-center justify-center text-[#3E5F8A] hover:scale-125 active:scale-90 transition-all font-light text-base focus:outline-none cursor-pointer"
          title={lang === 'es' ? 'Disminuir zoom' : 'Zoom out'}
        >
          -
        </button>
        
        <button 
          onClick={() => setZoom(1)}
          className="font-space text-[8px] font-black tracking-[0.25em] text-[#3E5F8A] hover:underline focus:outline-none cursor-pointer uppercase"
          title={lang === 'es' ? 'Restablecer' : 'Reset'}
        >
          {zoom === 1 ? '1.0x' : `${zoom.toFixed(1)}x`}
        </button>

        <button 
          onClick={() => setZoom(prev => Math.min(3, prev + 0.5))}
          className="w-5 h-5 flex items-center justify-center text-[#3E5F8A] hover:scale-125 active:scale-90 transition-all font-light text-base focus:outline-none cursor-pointer"
          title={lang === 'es' ? 'Aumentar zoom' : 'Zoom in'}
        >
          +
        </button>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between pt-24 pb-4 md:pt-28 md:pb-6 relative z-20 pointer-events-none">
        
        {/* Top Right: Materials Gallery Subtitle */}
        <div className="w-full flex justify-end select-none pointer-events-auto">
          <span className="font-space text-[10px] md:text-[11px] text-[#767676] tracking-widest uppercase font-bold">
            {lang === 'es' ? 'Galería de Materiales' : 'Materials Gallery'}
          </span>
        </div>

        {/* Minimalist Prev Arrow Floating on Left Edge */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer text-[#3e5f8a]/40 hover:text-[#3e5f8a] active:scale-90 transition-all hover:scale-110 focus:outline-none z-30 pointer-events-auto"
          title={lang === 'es' ? 'Material anterior' : 'Previous material'}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Minimalist Next Arrow Floating on Right Edge */}
        <button 
          onClick={handleNext}
          className="absolute right-14 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer text-[#3e5f8a]/40 hover:text-[#3e5f8a] active:scale-90 transition-all hover:scale-110 focus:outline-none z-30 pointer-events-auto"
          title={lang === 'es' ? 'Siguiente material' : 'Next material'}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Elements: Title & Dots */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end mt-auto pb-4 gap-4">
          
          {/* Active Material Name at the Bottom-Left */}
          <div className="flex flex-col text-left pointer-events-auto max-w-[70%] select-text">
            <span className="font-space text-[10px] md:text-[11px] text-[#B58E45] font-bold tracking-widest uppercase mb-1">
              {currentMaterial.s}
            </span>
            <h3 className="font-unbounded text-2xl md:text-4xl font-black text-[#111111] uppercase tracking-tighter leading-none select-text">
              {currentMaterial.t}
            </h3>
            <p className="font-outfit text-xs text-[#767676] font-light max-w-md mt-2 leading-relaxed">
              {currentMaterial.d}
            </p>
          </div>

          {/* Dynamic dot indicators */}
          <div className="flex justify-center items-center gap-2 select-none pointer-events-auto mx-auto md:mx-0">
            {materials.map((m: MaterialSpec, idx: number) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={m.t}
                  onClick={() => setSelectedIdx(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    isActive 
                      ? 'w-2.5 h-2.5 bg-[#3e5f8a] scale-110 shadow-sm' 
                      : 'w-1.5 h-1.5 border border-[#3e5f8a]/60 bg-transparent hover:bg-[#3e5f8a]/20'
                  }`}
                  title={`Material ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Symmetrical Footer Row */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] font-space text-[#767676] tracking-widest pt-2.5 border-t border-[#111111]/5 gap-4 select-text pointer-events-auto">
          <span>{lang === 'es' ? '©HANDS 3D 2026' : '© HANDS 3D 2026'}</span>
          
          <span className="font-bold text-[#B58E45] uppercase hidden md:inline">
            {lang === 'es' ? 'TE DAMOS UNA MANO CON TU IDEA' : 'WE GIVE YOU A HAND WITH YOUR IDEA'}
          </span>
          
          <motion.div 
            whileHover={{ scale: 1.06, rotate: 10 }}
            className="cursor-pointer select-none"
          >
            <img 
              src="/brand/hand_drawn_smiley.png" 
              alt="Smiley Badge" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain pointer-events-none select-none"
            />
          </motion.div>
        </div>

      </div>

      {/* Slide-Out Specs Drawer Panel */}
      <div 
        className={`absolute right-0 top-[20%] h-[68%] max-h-[480px] z-45 flex items-center transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-[320px] md:translate-x-[380px]'
        }`}
      >
        {/* Rounded Vertical Tab Trigger (Beige Background, Blue Border, Vertical Text) */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="w-[50px] h-[220px] flex flex-col items-center justify-between py-6 bg-[#FAF5EF] border-l border-y border-[#3E5F8A]/25 rounded-l-[2rem] shadow-2xl cursor-pointer select-none focus:outline-none z-50 -mr-[1px] hover:bg-white transition-colors pointer-events-auto"
        >
          {/* Toggle Arrow Icon */}
          <div className="text-[#3E5F8A] mt-1">
            <svg 
              className={`w-5 h-5 transition-transform duration-500 ${isDrawerOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          {/* Vertical Text rotated bottom-to-top */}
          <span 
            className="font-unbounded font-black text-[10px] md:text-[11px] tracking-[0.2em] text-[#3E5F8A] select-none whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {lang === 'es' ? 'FICHA TECNICA' : 'SPEC SHEET'}
          </span>

          {/* Vertical spacing spacer */}
          <div className="h-5" />
        </button>

        {/* Drawer Slate Blue Textured Content Card */}
        <div 
          className="bg-[#3E5F8A] rounded-l-[2.5rem] p-6 text-[#FAF5EF] flex flex-col justify-between bg-cover bg-center bg-no-repeat shadow-2xl h-full border-l border-y border-[#FAF5EF]/15 w-[320px] md:w-[380px] z-40 relative pointer-events-auto"
          style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
        >
          {/* Card Top Header */}
          <div className="flex flex-col items-center text-center">
            <span className="font-space text-[10px] text-[#B58E45] uppercase tracking-widest font-bold mb-1 select-none">
              {lang === 'es' ? 'Propiedades del Material' : 'Material Properties'}
            </span>
            <h2 className="font-unbounded text-sm md:text-base font-black mb-3 select-text tracking-tight border-b border-[#FAF5EF]/20 pb-1.5 w-full truncate">
              {currentMaterial.t}
            </h2>
          </div>

          {/* Card Middle: Detailed Specs List */}
          <div className="flex-grow flex flex-col justify-center my-3">
            <div className="grid grid-cols-1 gap-2.5 text-[11px] md:text-[12px] font-outfit">
              <div className="flex justify-between border-b border-[#FAF5EF]/15 pb-1">
                <span className="opacity-75">{lang === 'es' ? 'Categoría:' : 'Category:'}</span>
                <span className="font-bold text-[#B58E45]">{currentMaterial.s}</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF5EF]/15 pb-1">
                <span className="opacity-75">{lang === 'es' ? 'Densidad:' : 'Density:'}</span>
                <span className="font-bold">{currentMaterial.density}</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF5EF]/15 pb-1">
                <span className="opacity-75">{lang === 'es' ? 'Dureza:' : 'Hardness:'}</span>
                <span className="font-bold">{currentMaterial.hardness}</span>
              </div>
            </div>

            {/* Long description text */}
            <div className="text-[10.5px] md:text-[11.5px] font-outfit opacity-90 leading-relaxed border-t border-[#FAF5EF]/15 pt-3 mt-3 select-text text-left font-light">
              {currentMaterial.ld}
            </div>
          </div>

          {/* Card Bottom Description */}
          <div className="text-[10px] md:text-[11px] text-center font-outfit opacity-80 leading-relaxed border-t border-[#FAF5EF]/15 pt-2 px-1 select-text">
            {lang === 'es' 
              ? 'Materiales seleccionados para alta durabilidad y estética.' 
              : 'Materials selected for high durability and aesthetics.'}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CircularArchive;
