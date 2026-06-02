import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';

interface NavbarOverlayProps {
  theme?: 'blue' | 'black' | 'transparent';
}

// Confetti Solid Paper SVG Component
const ConfettiSolidItem: React.FC<{ color: 'white' | 'gold' }> = ({ color }) => {
  const fillColor = color === 'gold' ? '#B58E45' : '#FFFFFF';
  return (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="opacity-90">
      <rect width="12" height="7" rx="1" fill={fillColor} />
    </svg>
  );
};

const NavbarOverlay: React.FC<NavbarOverlayProps> = ({ theme }) => {
  const { lang, setLang, activeSection } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  // Derive theme from activeSection when not explicitly passed
  const resolvedTheme: 'blue' | 'black' | 'transparent' =
    theme
    ?? (activeSection === 'home'
      ? 'transparent'
      : activeSection === 'calculator'
        ? 'black'
        : 'blue');

  const handleNav = (id: string) => {
    setIsOpen(false);
    // Small delay so drawer can close before scroll — important on iOS
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const navItems = [
    { label: lang === 'es' ? 'Quienes somos?' : 'Who are we?', target: 'about' },
    { label: lang === 'es' ? 'Experiencia' : 'Experience', target: 'products' },
    { label: lang === 'es' ? 'materiales' : 'materials', target: 'materials' },
    { label: lang === 'es' ? 'Presupuesto' : 'Budget', target: 'production' },
    { label: lang === 'es' ? 'contactos' : 'contacts', target: 'budget' },
    { label: lang === 'es' ? 'MUNDIAL 2026' : 'WORLD CUP 2026', target: 'worldcup' },
    { label: lang === 'es' ? 'AREA EMPRENDEDOR 3D' : '3D ENTREPRENEUR AREA', target: 'calculator' },
  ];

  let headerBgClass = '';
  let headerStyle: React.CSSProperties = {};

  if (resolvedTheme === 'transparent') {
    headerBgClass = 'bg-transparent border-b-0 shadow-none';
  } else if (resolvedTheme === 'black') {
    headerBgClass = 'bg-[#111111] border-b border-white/5 shadow-md';
    headerStyle = { backgroundImage: "url('/brand/matte_black_texture.webp')" };
  } else {
    headerBgClass = 'bg-[#3E5F8A] border-b border-[#FAF5EF]/10 shadow-md';
    headerStyle = { backgroundImage: "url('/brand/slate_blue_texture.webp')" };
  }

  return (
    <>
      {/* Fixed global header — always on top, never clipped by scroll containers */}
      <header
        className={`fixed top-0 left-0 w-full h-[60px] md:h-[75px] z-[200] flex items-center justify-between px-6 md:px-12 select-none bg-cover bg-center transition-all duration-300 ${headerBgClass}`}
        style={headerStyle}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="font-unbounded text-lg md:text-xl font-black text-[#FAF5EF] cursor-pointer hover:opacity-90 active:scale-95 transition-all focus:outline-none lowercase tracking-tighter"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          hands3d
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-space text-[12px] xl:text-[13px] font-medium tracking-wide">
          {navItems.map((item) => {
            const isWorldCup = item.target === 'worldcup';
            if (isWorldCup) {
              return (
                <button
                  key={item.target}
                  onClick={() => handleNav(item.target)}
                  className="text-[#FAF5EF]/90 hover:text-white cursor-pointer relative py-1 focus:outline-none transition-colors font-extrabold tracking-widest group"
                >
                  <span className="absolute -top-3.5 -left-3.5 opacity-90 animate-[bounce_2s_infinite] rotate-[15deg]">
                    <ConfettiSolidItem color="white" />
                  </span>
                  <span className="absolute -bottom-3.5 -left-4 opacity-95 animate-[bounce_2.5s_infinite] rotate-[-25deg]">
                    <ConfettiSolidItem color="gold" />
                  </span>
                  <span className="absolute -top-4 right-6 opacity-85 animate-[pulse_1.8s_infinite] rotate-[45deg]">
                    <ConfettiSolidItem color="white" />
                  </span>
                  <span className="absolute top-1.5 -right-4 opacity-95 animate-[bounce_3s_infinite] rotate-[30deg]">
                    <ConfettiSolidItem color="gold" />
                  </span>
                  <span className="absolute -bottom-3 right-4 opacity-90 animate-[pulse_2.2s_infinite] rotate-[-15deg]">
                    <ConfettiSolidItem color="white" />
                  </span>
                  <span className="relative z-10 text-white font-extrabold tracking-widest">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </button>
              );
            }
            return (
              <button
                key={item.target}
                onClick={() => handleNav(item.target)}
                className="text-[#FAF5EF]/85 hover:text-[#FAF5EF] cursor-pointer relative py-1 focus:outline-none transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            );
          })}

          {/* Language switcher pill */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1 bg-[#FAF5EF]/10 hover:bg-[#FAF5EF]/20 text-[#FAF5EF] rounded-full px-3 py-1 cursor-pointer focus:outline-none transition-all active:scale-95 text-[11px] font-semibold border border-[#FAF5EF]/15"
          >
            <span className={lang === 'es' ? 'text-[#B58E45]' : 'text-white'}>ES</span>
            <span className="text-[#FAF5EF]/30">|</span>
            <span className={lang === 'en' ? 'text-[#B58E45]' : 'text-white'}>EN</span>
          </button>
        </nav>

        {/* Mobile: language pill + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="bg-[#FAF5EF]/10 text-white rounded-full px-2.5 py-1 text-[10px] font-semibold focus:outline-none border border-[#FAF5EF]/15"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="w-11 h-11 flex items-center justify-center text-white focus:outline-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="flex flex-col gap-[5px] pointer-events-none">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-current rounded-full"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer — rendered in a portal-like manner at root level */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[190] bg-[#111111]/98 backdrop-blur-md flex flex-col items-center justify-center p-10 text-white"
            onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
          >
            <div className="flex flex-col items-center space-y-7 w-full max-w-sm font-space font-bold">
              {navItems.map((item) => {
                const isWorldCup = item.target === 'worldcup';
                const isCalculator = item.target === 'calculator';

                if (isCalculator) {
                  return (
                    <button
                      key={item.target}
                      onClick={() => handleNav(item.target)}
                      className="w-full py-4 bg-[#B58E45] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg transition-transform active:scale-95 focus:outline-none mt-2"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.target}
                    onClick={() => handleNav(item.target)}
                    className={`text-base font-bold uppercase tracking-wider transition-colors focus:outline-none active:opacity-70 ${
                      isWorldCup ? 'text-[#B58E45]' : 'text-white/85'
                    }`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarOverlay;
