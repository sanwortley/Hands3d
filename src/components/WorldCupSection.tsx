import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../lib/store';
import NavbarOverlay from './NavbarOverlay';

// Confetti SVG Component - renders a gorgeous vector soccer ball spinning slowly
const ConfettiItem: React.FC<{ color: 'white' | 'gold'; rot: number; scale: number }> = ({ color, rot, scale }) => {
  const strokeColor = color === 'gold' ? '#B58E45' : '#FFFFFF';
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={strokeColor} 
      strokeWidth="1.2"
      style={{ transform: `rotate(${rot}deg) scale(${scale})` }}
      className="opacity-70 animate-[spin_60s_linear_infinite]"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="12,9 15,11.5 14,15.5 10,15.5 9,11.5" strokeLinejoin="round" />
      <line x1="12" y1="9" x2="12" y2="2" />
      <line x1="15" y1="11.5" x2="21" y2="10" />
      <line x1="14" y1="15.5" x2="18" y2="21" />
      <line x1="10" y1="15.5" x2="6" y2="21" />
      <line x1="9" y1="11.5" x2="3" y2="10" />
    </svg>
  );
};

const WorldCupSection: React.FC = () => {
  const { lang } = useAppStore();

  // Position coordinates for floating confetti particles positioned in the middle band (25% - 60% of viewport)
  const confettiParticles = [
    // Left Zone (5% to 25%)
    { top: '30%', left: '5%', rot: 15, scale: 0.8, color: 'white' },
    { top: '45%', left: '12%', rot: -25, scale: 1.1, color: 'gold' },
    { top: '58%', left: '7%', rot: 35, scale: 0.7, color: 'white' },
    { top: '28%', left: '20%', rot: 45, scale: 0.9, color: 'white' },
    { top: '52%', left: '18%', rot: -15, scale: 1.0, color: 'gold' },
    
    // Left-Center Zone (25% to 45%)
    { top: '38%', left: '28%', rot: 60, scale: 0.8, color: 'gold' },
    { top: '56%', left: '32%', rot: -30, scale: 1.0, color: 'white' },
    { top: '26%', left: '36%', rot: 10, scale: 0.9, color: 'white' },
    { top: '48%', left: '40%', rot: 75, scale: 0.7, color: 'gold' },
    
    // Center Zone (45% to 65%)
    { top: '32%', left: '46%', rot: -20, scale: 1.2, color: 'white' },
    { top: '54%', left: '50%', rot: 40, scale: 0.9, color: 'gold' },
    { top: '28%', left: '56%', rot: -45, scale: 0.8, color: 'white' },
    { top: '46%', left: '60%', rot: 15, scale: 1.1, color: 'gold' },
    { top: '58%', left: '64%', rot: -10, scale: 0.7, color: 'white' },
    
    // Center-Right Zone (65% to 80%)
    { top: '34%', left: '68%', rot: 50, scale: 1.0, color: 'white' },
    { top: '50%', left: '72%', rot: -35, scale: 0.8, color: 'gold' },
    { top: '26%', left: '76%', rot: 25, scale: 0.9, color: 'white' },
    { top: '44%', left: '80%', rot: 65, scale: 1.1, color: 'gold' },
    
    // Right Zone (80% to 95%)
    { top: '30%', left: '84%', rot: -15, scale: 0.8, color: 'white' },
    { top: '56%', left: '87%', rot: 55, scale: 0.7, color: 'gold' },
    { top: '42%', left: '92%', rot: 30, scale: 1.0, color: 'white' },
    { top: '28%', left: '95%', rot: -50, scale: 0.9, color: 'gold' },
    { top: '50%', left: '96%', rot: 20, scale: 0.8, color: 'white' }
  ];

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative overflow-hidden bg-[#FAF5EF] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
    >
      {/* Real HTML header bar */}
      <NavbarOverlay isHero={false} />

      {/* Native background stripes to match the Canva theme perfectly, dynamically, and with gorgeous grain texture */}
      <div className="absolute inset-0 w-full h-full flex flex-col z-0 pointer-events-none select-none">
        {/* Top slate blue textured stripe */}
        <div 
          className="w-full h-[52%] bg-[#3E5F8A] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
        />
        {/* Middle warm beige textured stripe */}
        <div 
          className="w-full h-[10%] bg-[#FAF5EF] bg-cover bg-center"
          style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
        />
        {/* Bottom slate blue textured stripe (darkened subtly to match the layout) */}
        <div 
          className="w-full h-[38%] bg-[#2E4C74] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
        >
          {/* Subtle overlay to increase contrast in the bottom zone */}
          <div className="absolute inset-0 bg-[#233857]/20 backdrop-brightness-90" />
        </div>
      </div>

      {/* Dynamic Outlined Confetti Particles scattered in the middle background area */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {confettiParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: p.top, left: p.left }}
            animate={{ 
              y: [0, -6, 0], 
              rotate: [p.rot, p.rot + 5, p.rot] 
            }}
            transition={{ 
              duration: 3 + (i % 3), 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ConfettiItem color={p.color as 'white' | 'gold'} rot={p.rot} scale={p.scale} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout Grid */}
      <div className="relative flex-grow flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-20 md:pt-24 md:pb-24 z-10 flex flex-col justify-between overflow-hidden">
        
        {/* DESKTOP VIEWPORT: Original layout intact */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center h-full w-full">
          {/* Left Column: Title & Products */}
          <div className="col-span-7 xl:col-span-8 flex flex-col justify-between h-full py-4 text-left">
            <div className="relative z-10 mt-2">
              <motion.h1 
                className="font-unbounded text-5xl lg:text-6xl xl:text-7xl font-black text-[#B58E45] tracking-tight uppercase select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                MUNDIAL 2026
              </motion.h1>
            </div>

            <div className="flex items-end justify-start gap-6 md:gap-10 lg:gap-12 xl:gap-16 w-full mt-auto mb-4 select-none">
              {/* Keychain Capsule Card */}
              <motion.div 
                className="flex flex-col items-center gap-2 cursor-pointer group"
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-[125px] h-[200px] bg-white border border-[#3E5F8A]/40 rounded-[2.5rem] p-3 flex flex-col items-center justify-between shadow-md hover:shadow-lg transition-all duration-300">
                  <img 
                    src="/brand/wc_keychain.png" 
                    alt="Llaveros" 
                    className="h-[130px] w-auto object-contain pointer-events-none select-none filter contrast-[1.05] saturate-[1.1]"
                  />
                  <span className="font-unbounded text-[10px] font-black text-[#3E5F8A] tracking-wider uppercase mb-1">
                    {lang === 'es' ? 'Llaveros' : 'Keychains'}
                  </span>
                </div>
              </motion.div>

              {/* 3D Trophy Product */}
              <motion.div 
                className="flex flex-col items-center text-center group"
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-[260px] lg:h-[280px] xl:h-[310px] flex items-end justify-center">
                  <img 
                    src="/brand/wc_trophy.png" 
                    alt="Copa 3D" 
                    className="h-full w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)] drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)] contrast-[1.08] saturate-[1.15] brightness-[1.02] pointer-events-none select-none group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <span 
                  className="font-unbounded text-[11px] font-black text-white tracking-widest uppercase mt-3"
                  style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.95)' }}
                >
                  {lang === 'es' ? 'Copa del Mundo 3D' : '3D World Cup'}
                </span>
              </motion.div>

              {/* Cup/Vase Product */}
              <motion.div 
                className="flex flex-col items-center text-center group"
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-[260px] lg:h-[280px] xl:h-[310px] flex items-end justify-center">
                  <img 
                    src="/brand/wc_cup.png" 
                    alt="Vaso Copa" 
                    className="h-full w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)] drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)] contrast-[1.08] saturate-[1.15] brightness-[1.02] pointer-events-none select-none group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <span 
                  className="font-unbounded text-[11px] font-black text-white tracking-widest uppercase mt-3"
                  style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.95)' }}
                >
                  {lang === 'es' ? 'Vaso Copa del Mundo' : 'World Cup Cup'}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Symmetrical Info Card & Messi */}
          <div className="col-span-5 xl:col-span-4 flex flex-col items-center justify-center h-full py-4 relative z-10">
            <motion.div 
              className="w-full max-w-[380px] lg:max-w-[420px] h-[80%] lg:h-[87%] bg-white border border-[#3E5F8A]/10 rounded-[3rem] shadow-xl p-6 md:p-8 flex flex-col justify-start items-center relative overflow-hidden backdrop-blur-sm bg-white/95 mb-10 lg:mb-16"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center w-full select-none border-b border-[#3E5F8A]/5 pb-3">
                <img 
                  src="/brand/wc_ball.png" 
                  alt="Soccer Ball Icon" 
                  className="w-8 h-8 md:w-9 md:h-9 object-contain select-none pointer-events-none mr-2 filter animate-[spin_60s_linear_infinite]"
                />
                <h2 className="font-unbounded text-base md:text-lg font-black text-[#3E5F8A] uppercase tracking-tight ml-2">
                  {lang === 'es' ? 'Edición Mundial' : 'World Edition'}
                </h2>
              </div>
              <p className="font-outfit text-[11px] md:text-xs xl:text-[13px] leading-relaxed text-[#767676] text-center md:text-left mt-4 select-text font-light">
                {lang === 'es' 
                  ? 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.' 
                  : 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.'}
              </p>
            </motion.div>

            <motion.img 
              src="/brand/wc_messi.png" 
              alt="Messi raising trophy"
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-24 h-[56%] sm:h-[60%] md:h-[64%] lg:h-[68%] xl:h-[70%] w-auto object-contain z-20 pointer-events-none select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] drop-shadow-[0_5px_15px_rgba(0,0,0,0.35)] contrast-[1.08] saturate-[1.15] brightness-[1.02]"
            />
          </div>
        </div>

        {/* MOBILE VIEWPORT: Redesigned layout surrounding the centered card with zero Messi overlap */}
        <div className="flex lg:hidden flex-col w-full h-full relative z-10">
          
          {/* Centered Title */}
          <div className="absolute top-[12%] left-0 w-full text-center z-20">
            <h1 className="font-unbounded text-3xl font-black text-[#B58E45] tracking-tight uppercase select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
              MUNDIAL 2026
            </h1>
          </div>

          {/* Middle Row (Symmetrical 3 products on the horizontal stripe) */}
          <div className="absolute top-[48%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-sm px-1.5 z-20 grid grid-cols-3 justify-items-center items-center">
            
            {/* Column 1: Llaveros */}
            <div className="flex shrink-0">
              <motion.div 
                className="flex flex-col items-center justify-between w-[90px] xs:w-[110px] h-[165px] xs:h-[195px] text-center"
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-[126px] xs:h-[154px] flex items-end justify-center w-full">
                  <img 
                    src="/brand/wc_keychain.png" 
                    alt="Llaveros" 
                    className="h-full w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] pointer-events-none select-none"
                  />
                </div>
                <span 
                  className="font-unbounded text-[8px] xs:text-[9px] font-black text-white tracking-widest uppercase text-center mt-2 leading-none"
                  style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.95)' }}
                >
                  {lang === 'es' ? 'Llaveros' : 'Keychains'}
                </span>
              </motion.div>
            </div>

            {/* Column 2: Copa 3D (Raised and resized to match Vaso perfectly) */}
            <div className="flex shrink-0">
              <motion.div 
                className="flex flex-col items-center justify-between w-[90px] xs:w-[110px] h-[190px] xs:h-[225px] text-center"
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-[150px] xs:h-[182px] flex items-end justify-center w-full">
                  <img 
                    src="/brand/wc_trophy.png" 
                    alt="Copa 3D" 
                    className="h-full w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] pointer-events-none select-none"
                  />
                </div>
                <span 
                  className="font-unbounded text-[8px] xs:text-[9px] font-black text-white tracking-widest uppercase text-center mt-2 leading-none"
                  style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.95)' }}
                >
                  {lang === 'es' ? 'Copa 3D' : '3D Cup'}
                </span>
              </motion.div>
            </div>

            {/* Column 3: Vaso */}
            <div className="flex shrink-0">
              <motion.div 
                className="flex flex-col items-center justify-between w-[90px] xs:w-[110px] h-[190px] xs:h-[225px] text-center"
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-[150px] xs:h-[182px] flex items-end justify-center w-full">
                  <img 
                    src="/brand/wc_cup.png" 
                    alt="Vaso Copa" 
                    className="h-full w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] pointer-events-none select-none"
                  />
                </div>
                <span 
                  className="font-unbounded text-[8px] xs:text-[9px] font-black text-white tracking-widest uppercase text-center mt-2 leading-none"
                  style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.95), 0 0 1px rgba(0,0,0,0.95)' }}
                >
                  {lang === 'es' ? 'Vaso' : 'Cup'}
                </span>
              </motion.div>
            </div>
            
          </div>

          {/* Bottom Row: Free-floating Description Text (At the bottom of the screen) */}
          <div className="absolute top-[85%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-[290px] xs:max-w-[330px] z-20 flex flex-col items-center justify-center">
            <h2 
              className="font-unbounded text-[10px] xs:text-[11px] font-black text-[#B58E45] uppercase tracking-wider text-center mb-2 select-none"
            >
              {lang === 'es' ? 'EDICIÓN MUNDIAL' : 'WORLD EDITION'}
            </h2>
            <p 
              className="font-outfit text-[10.5px] xs:text-[11.5px] leading-relaxed text-[#FAF5EF] text-center font-light select-text"
            >
              {lang === 'es' 
                ? 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.' 
                : 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.'}
            </p>
          </div>

        </div>

      </div>

      {/* Symmetrical Footer Row with enlarged Smiley face */}
      <div className="absolute bottom-4 left-0 w-full px-6 md:px-12 flex justify-between items-center text-[9px] sm:text-[10px] font-space text-white/50 tracking-widest z-20 select-text">
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
            className="w-12 h-12 md:w-16 md:h-16 object-contain pointer-events-none select-none invert opacity-80 hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WorldCupSection;
