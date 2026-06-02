import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../lib/store';


// Soccer Field Confetti - 4 different shape types
type ConfettiShape = 'field' | 'corner' | 'goal' | 'whistle' | 'trophy' | 'star';

const ConfettiItem: React.FC<{ color: 'white' | 'gold'; rot: number; scale: number; shape: ConfettiShape }> = ({ color, rot, scale, shape }) => {
  const strokeColor = color === 'gold' ? '#B58E45' : 'rgba(255,255,255,0.9)';
  const fillColor   = color === 'gold' ? '#B58E45' : 'rgba(255,255,255,0.15)';

  const sharedProps = {
    width: '22',
    height: '22',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: strokeColor,
    strokeWidth: '1.3',
    style: { transform: `rotate(${rot}deg) scale(${scale})` },
    className: 'opacity-75',
  };

  // Mini soccer field top-down view
  if (shape === 'field') return (
    <svg {...sharedProps}>
      <rect x="2" y="5" width="20" height="14" rx="1" fill={fillColor} />
      <line x1="12" y1="5" x2="12" y2="19" />
      <circle cx="12" cy="12" r="3" />
      <rect x="2" y="9" width="4" height="6" />
      <rect x="18" y="9" width="4" height="6" />
    </svg>
  );

  // Corner flag
  if (shape === 'corner') return (
    <svg {...sharedProps}>
      <line x1="8" y1="20" x2="8" y2="4" />
      <polygon points="8,4 18,8 8,12" fill={color === 'gold' ? '#B58E45' : 'rgba(255,255,255,0.6)'} />
    </svg>
  );

  // Goal post front view
  if (shape === 'goal') return (
    <svg {...sharedProps}>
      <line x1="5" y1="18" x2="5" y2="8" />
      <line x1="19" y1="18" x2="19" y2="8" />
      <line x1="5" y1="8" x2="19" y2="8" />
      <line x1="5" y1="10" x2="3" y2="8" />
      <line x1="19" y1="10" x2="21" y2="8" />
    </svg>
  );

  // Referee whistle
  if (shape === 'whistle') return (
    <svg {...sharedProps}>
      <path d="M4 12 Q4 8 8 8 L18 8 Q20 8 20 10 Q20 12 18 12 L10 12" fill={fillColor} />
      <circle cx="7" cy="15" r="3" fill={fillColor} />
      <line x1="10" y1="15" x2="14" y2="12" />
    </svg>
  );

  // Trophy silhouette (mini)
  if (shape === 'trophy') return (
    <svg {...sharedProps}>
      <path d="M8 4 h8 v5 q0 5-4 7 q-4-2-4-7z" fill={fillColor} />
      <line x1="12" y1="16" x2="12" y2="19" />
      <line x1="8" y1="19" x2="16" y2="19" />
      <path d="M8 6 Q5 6 5 9 Q5 12 8 12" />
      <path d="M16 6 Q19 6 19 9 Q19 12 16 12" />
    </svg>
  );

  // Star (celebration)
  return (
    <svg {...sharedProps}>
      <polygon points="12,2 14.5,9.5 22,9.5 16,14 18.5,21.5 12,17 5.5,21.5 8,14 2,9.5 9.5,9.5" fill={fillColor} />
    </svg>
  );
};

const WorldCupSection: React.FC = () => {
  const { lang } = useAppStore();

  // Massive dense confetti field - 42 particles covering the entire background
  const confettiParticles: { top: string; left: string; rot: number; scale: number; color: 'white' | 'gold'; shape: ConfettiShape }[] = [
    // Top band (5% - 20%)
    { top: '8%',  left: '3%',  rot: 12,  scale: 0.65, color: 'white', shape: 'field' },
    { top: '12%', left: '10%', rot: -20, scale: 0.7,  color: 'gold',  shape: 'star' },
    { top: '7%',  left: '18%', rot: 35,  scale: 0.6,  color: 'white', shape: 'corner' },
    { top: '15%', left: '27%', rot: -8,  scale: 0.75, color: 'gold',  shape: 'goal' },
    { top: '9%',  left: '38%', rot: 55,  scale: 0.6,  color: 'white', shape: 'trophy' },
    { top: '14%', left: '48%', rot: -30, scale: 0.7,  color: 'gold',  shape: 'star' },
    { top: '8%',  left: '57%', rot: 15,  scale: 0.65, color: 'white', shape: 'field' },
    { top: '13%', left: '67%', rot: 45,  scale: 0.7,  color: 'gold',  shape: 'corner' },
    { top: '7%',  left: '76%', rot: -22, scale: 0.6,  color: 'white', shape: 'whistle' },
    { top: '15%', left: '86%', rot: 30,  scale: 0.75, color: 'gold',  shape: 'goal' },
    { top: '10%', left: '94%', rot: -45, scale: 0.65, color: 'white', shape: 'star' },

    // Upper-middle band (20% - 38%)
    { top: '22%', left: '6%',  rot: -18, scale: 0.8,  color: 'gold',  shape: 'goal' },
    { top: '28%', left: '14%', rot: 40,  scale: 0.7,  color: 'white', shape: 'star' },
    { top: '35%', left: '22%', rot: -55, scale: 0.85, color: 'gold',  shape: 'field' },
    { top: '24%', left: '31%', rot: 20,  scale: 0.7,  color: 'white', shape: 'whistle' },
    { top: '33%', left: '42%', rot: -15, scale: 0.8,  color: 'gold',  shape: 'corner' },
    { top: '25%', left: '52%', rot: 65,  scale: 0.7,  color: 'white', shape: 'trophy' },
    { top: '36%', left: '63%', rot: -28, scale: 0.85, color: 'gold',  shape: 'star' },
    { top: '23%', left: '73%', rot: 10,  scale: 0.7,  color: 'white', shape: 'goal' },
    { top: '32%', left: '82%', rot: -40, scale: 0.8,  color: 'gold',  shape: 'field' },
    { top: '26%', left: '91%', rot: 50,  scale: 0.7,  color: 'white', shape: 'corner' },

    // Middle band (38% - 62%) 
    { top: '40%', left: '2%',  rot: -10, scale: 0.9,  color: 'white', shape: 'whistle' },
    { top: '50%', left: '9%',  rot: 35,  scale: 1.0,  color: 'gold',  shape: 'star' },
    { top: '42%', left: '19%', rot: -60, scale: 0.85, color: 'white', shape: 'goal' },
    { top: '58%', left: '28%', rot: 25,  scale: 0.9,  color: 'gold',  shape: 'field' },
    { top: '44%', left: '35%', rot: -35, scale: 0.8,  color: 'white', shape: 'corner' },
    { top: '55%', left: '44%', rot: 50,  scale: 1.0,  color: 'gold',  shape: 'trophy' },
    { top: '41%', left: '54%', rot: -15, scale: 0.85, color: 'white', shape: 'star' },
    { top: '57%', left: '65%', rot: 40,  scale: 0.9,  color: 'gold',  shape: 'whistle' },
    { top: '43%', left: '75%', rot: -50, scale: 0.8,  color: 'white', shape: 'field' },
    { top: '52%', left: '84%', rot: 20,  scale: 1.0,  color: 'gold',  shape: 'goal' },
    { top: '46%', left: '93%', rot: -30, scale: 0.85, color: 'white', shape: 'star' },

    // Lower band (62% - 80%)
    { top: '65%', left: '4%',  rot: 15,  scale: 0.75, color: 'gold',  shape: 'corner' },
    { top: '72%', left: '15%', rot: -25, scale: 0.8,  color: 'white', shape: 'trophy' },
    { top: '68%', left: '25%', rot: 45,  scale: 0.7,  color: 'gold',  shape: 'star' },
    { top: '74%', left: '37%', rot: -55, scale: 0.75, color: 'white', shape: 'field' },
    { top: '66%', left: '48%', rot: 30,  scale: 0.8,  color: 'gold',  shape: 'whistle' },
    { top: '75%', left: '58%', rot: -10, scale: 0.7,  color: 'white', shape: 'goal' },
    { top: '63%', left: '69%', rot: 55,  scale: 0.75, color: 'gold',  shape: 'corner' },
    { top: '73%', left: '79%', rot: -40, scale: 0.8,  color: 'white', shape: 'star' },
    { top: '67%', left: '89%', rot: 20,  scale: 0.7,  color: 'gold',  shape: 'field' },
    { top: '76%', left: '97%', rot: -20, scale: 0.75, color: 'white', shape: 'trophy' },
  ];

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative overflow-hidden bg-[#FAF5EF] lg:bg-[#3E5F8A] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
    >

      {/* Native background stripes — mobile only (hidden on desktop to keep trophy images clean) */}
      <div className="lg:hidden absolute inset-0 w-full h-full flex flex-col z-0 pointer-events-none select-none">
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

      {/* Dynamic Outlined Confetti Particles scattered in the background */}
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
            <ConfettiItem color={p.color as 'white' | 'gold'} rot={p.rot} scale={p.scale} shape={p.shape} />
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
