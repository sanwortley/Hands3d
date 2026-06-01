import React from 'react';
import { useAppStore } from '../lib/store';

interface NavbarOverlayProps {
  isHero?: boolean;
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

const NavbarOverlay: React.FC<NavbarOverlayProps> = ({ isHero = false, theme = isHero ? 'transparent' : 'blue' }) => {
  const { lang, setLang } = useAppStore();

  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Nav Items lists
  const heroItems = [
    { label: lang === 'es' ? 'Quienes somos?' : 'Who are we?', target: 'about' },
    { label: lang === 'es' ? 'Experiencia' : 'Experience', target: 'products' },
    { label: lang === 'es' ? 'materiales' : 'materials', target: 'materials' },
    { label: lang === 'es' ? 'Presupuesto' : 'Budget', target: 'production' },
    { label: lang === 'es' ? 'contactos' : 'contacts', target: 'budget' },
    { label: lang === 'es' ? 'MUNDIAL 2026' : 'WORLD CUP 2026', target: 'worldcup' },
    { label: lang === 'es' ? 'AREA EMPRENDEDOR 3D' : '3D ENTREPRENEUR AREA', target: 'entrepreneur' },
  ];

  // Use the exact same 7 mixed-case nav items on all pages/slides
  const activeItems = heroItems;

  let headerBgClass = '';
  let headerStyle = {};

  if (theme === 'transparent') {
    headerBgClass = 'bg-transparent border-b-0 shadow-none';
  } else if (theme === 'black') {
    headerBgClass = 'bg-[#111111] border-b border-white/5 shadow-md';
    headerStyle = { backgroundImage: "url('/brand/matte_black_texture.webp')" };
  } else {
    headerBgClass = 'bg-[#3E5F8A] border-b border-[#FAF5EF]/10 shadow-md';
    headerStyle = { backgroundImage: "url('/brand/slate_blue_texture.webp')" };
  }

  return (
    <header 
      className={`absolute top-0 left-0 w-full h-[60px] md:h-[75px] z-50 flex items-center justify-between px-6 md:px-12 select-none bg-cover bg-center transition-all duration-300 ${headerBgClass}`}
      style={headerStyle}
    >
      {/* Brand Logo */}
      <button 
        onClick={() => handleNav('home')} 
        className="font-unbounded text-lg md:text-xl font-black text-[#FAF5EF] cursor-pointer hover:opacity-90 active:scale-95 transition-all focus:outline-none lowercase tracking-tighter"
      >
        hands3d
      </button>

      {/* Nav Menu */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-space text-[12px] xl:text-[13px] font-medium tracking-wide">
        {activeItems.map((item) => {
          const isWorldCup = item.target === 'worldcup';
          if (isWorldCup) {
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.target)}
                className="text-[#FAF5EF]/90 hover:text-white cursor-pointer relative py-1 focus:outline-none transition-colors font-extrabold tracking-widest group"
              >
                {/* Tiny absolute confetti items floating around/inside the button */}
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

                <span className="relative z-10 text-white font-extrabold tracking-widest">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B58E45] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            );
          }
          return (
            <button
              key={item.label}
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

      {/* Mobile menu trigger button - simple and clean */}
      <div className="lg:hidden flex items-center gap-4">
        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="bg-[#FAF5EF]/10 text-white rounded-full px-2 py-0.5 cursor-pointer text-[10px] font-semibold focus:outline-none"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button 
          onClick={() => handleNav('about')}
          className="text-white hover:text-white/80 active:scale-95 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default NavbarOverlay;
