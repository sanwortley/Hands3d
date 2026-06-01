import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { lang, setLang, activeSection, setActiveSection } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const sectionStr = activeSection as any;

  const handleNav = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Hide the real HTML navbar when scrolling away from home (Slide 1) to let template overlays take over
  if (sectionStr !== 'home') return null;

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[100] h-[12%] px-6 md:px-16 flex justify-between items-center bg-transparent pointer-events-auto border-none outline-none select-none font-outfit"
      >
        {/* Brand Logo in Classic Editorial Blue */}
        <div 
          onClick={() => handleNav('home')}
          className="font-neue-machina font-black text-2xl md:text-3xl tracking-[-0.06em] text-[#3e5f8a] cursor-pointer hover:opacity-85 flex items-baseline lowercase select-none"
        >
          <span>hands</span>
          <span className="text-[#B58E45] ml-0.5 font-bold">3d</span>
        </div>

        {/* Navigation links structured exactly like Slide 1 printed navbar */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 pr-12">
          {/* Quienes somos? */}
          <button 
            onClick={() => handleNav('about')} 
            className="text-[11.5px] font-bold text-[#faf5ef]/80 hover:text-white transition-colors cursor-pointer relative group py-2 focus:outline-none"
          >
            {lang === 'es' ? 'Quienes somos?' : 'About us?'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* Experiencia */}
          <button 
            onClick={() => handleNav('products')} 
            className="text-[11.5px] font-bold text-[#faf5ef]/80 hover:text-white transition-colors cursor-pointer relative group py-2 focus:outline-none"
          >
            {lang === 'es' ? 'Experiencia' : 'Experience'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* materiales */}
          <button 
            onClick={() => handleNav('materials')} 
            className="text-[11.5px] font-bold text-[#faf5ef]/80 hover:text-white transition-colors cursor-pointer relative group py-2 focus:outline-none lowercase"
          >
            {lang === 'es' ? 'materiales' : 'materials'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* Presupuesto */}
          <button 
            onClick={() => handleNav('production')} 
            className="text-[11.5px] font-bold text-[#faf5ef]/80 hover:text-white transition-colors cursor-pointer relative group py-2 focus:outline-none"
          >
            {lang === 'es' ? 'Presupuesto' : 'Estimate'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* contactos */}
          <button 
            onClick={() => handleNav('budget')} 
            className="text-[11.5px] font-bold text-[#faf5ef]/80 hover:text-white transition-colors cursor-pointer relative group py-2 focus:outline-none lowercase"
          >
            {lang === 'es' ? 'contactos' : 'contact'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* "MUNDIAL 2026" */}
          <button 
            onClick={() => handleNav('worldcup')} 
            className="text-[11.5px] font-bold text-[#faf5ef]/80 hover:text-white transition-colors cursor-pointer relative group py-2 focus:outline-none"
          >
            {lang === 'es' ? '"MUNDIAL 2026"' : '"WORLD CUP 2026"'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* AREA EMPRENDEDOR 3D */}
          <button 
            onClick={() => handleNav('entrepreneur')} 
            className="text-[11px] font-black text-[#B58E45] hover:text-[#faf5ef] transition-colors cursor-pointer relative group py-2 focus:outline-none uppercase"
          >
            {lang === 'es' ? 'AREA EMPRENDEDOR 3D' : '3D ENTREPRENEUR AREA'}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#faf5ef] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>
        </div>

        {/* Translation Switch Pill (ES EN) */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center p-0.5 rounded-full border border-white/10 bg-[#FAF5EF]/10 h-7 w-14 select-none shrink-0">
            <motion.div 
              className="absolute h-5 w-[24px] rounded-full bg-[#B58E45] shadow-sm"
              animate={{ x: lang === 'es' ? 0 : 26 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
            <button 
              onClick={() => setLang('es')} 
              className={`relative z-10 flex-1 text-[8px] font-black text-center transition-colors duration-300 cursor-pointer ${lang === 'es' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              ES
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`relative z-10 flex-1 text-[8px] font-black text-center transition-colors duration-300 cursor-pointer ${lang === 'en' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          {/* Burger menu toggle button for mobile overlays */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex lg:hidden items-center justify-center rounded-full text-white hover:text-[#B58E45] transition-colors focus:outline-none"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6.5 : 0 }} className="w-5 h-0.5 bg-current rounded-full" />
              <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-5 h-0.5 bg-current rounded-full" />
              <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6.5 : 0 }} className="w-5 h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Snapping Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-[#111111] flex flex-col items-center justify-center p-10 text-white"
          >
            <div className="flex flex-col items-center space-y-6 w-full max-w-sm select-none">
              <button onClick={() => handleNav('about')} className="text-xl font-bold uppercase tracking-wider text-white/80 hover:text-[#B58E45] transition-colors">
                {lang === 'es' ? 'Quienes somos?' : 'About us?'}
              </button>
              <button onClick={() => handleNav('products')} className="text-xl font-bold uppercase tracking-wider text-white/80 hover:text-[#B58E45] transition-colors">
                {lang === 'es' ? 'Experiencia' : 'Experience'}
              </button>
              <button onClick={() => handleNav('materials')} className="text-xl font-bold uppercase tracking-wider text-white/80 hover:text-[#B58E45] transition-colors">
                {lang === 'es' ? 'materiales' : 'materials'}
              </button>
              <button onClick={() => handleNav('budget')} className="text-xl font-bold uppercase tracking-wider text-white/80 hover:text-[#B58E45] transition-colors">
                {lang === 'es' ? 'Presupuesto' : 'Estimate'}
              </button>
              
              <div className="w-16 h-px bg-white/10 my-2" />

              <span 
                onClick={() => handleNav('worldcup')}
                className="text-sm font-black text-[#B58E45] tracking-[0.2em] cursor-pointer hover:text-white"
              >
                "MUNDIAL 2026"
              </span>

              <button 
                onClick={() => handleNav('entrepreneur')} 
                className="w-full py-4 bg-[#B58E45] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all cursor-pointer text-center"
              >
                {lang === 'es' ? 'AREA EMPRENDEDOR 3D' : '3D ENTREPRENEUR AREA'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
