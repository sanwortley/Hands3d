import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../lib/store';
import { translations } from '../translations';
import NavbarOverlay from './NavbarOverlay';

const HeroSection: React.FC = () => {
  const { lang } = useAppStore();
  const t = translations[lang];

  // Animated hands configuration
  const hands = [
    { src: '/brand/hand_ok.png', alt: 'Hand OK', delay: 0.1 },
    { src: '/brand/hand_middle.png', alt: 'Hand Pointing', delay: 0.2 },
    { src: '/brand/hand_rock.png', alt: 'Hand Rock', delay: 0.3 },
  ];

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {/* 1. Upper Half: Blue Editorial Slate Background with Texture (63% / 68% Height) */}
      <div 
        className="h-[60dvh] lg:h-[68dvh] w-full bg-[#3E5F8A] relative flex flex-col justify-end pb-6 md:pb-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
      >
        
        {/* Render fully functional real HTML Navbar Overlay */}
        <NavbarOverlay isHero={true} />

        {/* Gray hand illustrations centered horizontally at the bottom of the blue container */}
        <div className="w-full max-w-5xl mx-auto px-2 lg:px-6 h-[85%] lg:h-[70%] flex items-end justify-center gap-2.5 sm:gap-12 md:gap-24 relative z-20 translate-y-[42px]">
          {hands.map((hand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: hand.delay, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                filter: "brightness(1.08) contrast(1.03)"
              }}
              className="h-[100%] sm:h-[105%] md:h-full w-[31%] sm:w-[26%] lg:w-[25%] flex items-end justify-center cursor-pointer select-none group"
            >
              {/* High-resolution transparent gray hand illustration */}
              <img 
                src={hand.src} 
                alt={hand.alt} 
                className="h-full w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Lower Half: Warm Beige Branding & Copy Background with Texture (37% / 32% Height) */}
      <div 
        className="h-[40dvh] lg:h-[32dvh] w-full bg-[#FAF5EF] relative flex flex-col justify-between pt-4 pb-2.5 px-6 md:p-8 xl:p-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-6 items-center flex-1">
          
          {/* Colossal Brand Typography (Left Side) - span 6 */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-unbounded text-[#3E5F8A] font-black text-4xl sm:text-5xl md:text-7xl xl:text-8xl leading-none select-text lowercase tracking-tighter"
            >
              {t.hero.title}
            </motion.h1>
            
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-space text-[#B58E45] font-bold text-[10px] sm:text-[12px] md:text-[13px] tracking-widest mt-2 md:mt-3 uppercase"
            >
              {lang === 'es' ? 'TE DAMOS UNA MANO CON TU IDEA' : 'WE GIVE YOU A HAND WITH YOUR IDEA'}
            </motion.span>
          </div>

          {/* Description Copy (Middle Side) - span 4 */}
          <div className="lg:col-span-4 flex items-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-outfit text-[#111111]/90 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed font-normal select-text"
            >
              {t.hero.desc}
            </motion.p>
          </div>

          {/* Smiley Badge Icon (Right Side) - span 2 */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.06, rotate: 10 }}
              className="cursor-pointer group select-none"
            >
              {/* Custom Transparent Hand-Drawn Smiley Badge from Canva design */}
              <img 
                src="/brand/hand_drawn_smiley.png" 
                alt="Smiley Badge" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain pointer-events-none select-none"
              />
            </motion.div>
          </div>

        </div>

        {/* Symmetrical Copyright Footer Row (Bleed Outlines) */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] font-space text-[#767676] tracking-widest pt-2.5 border-t border-[#111111]/5 gap-2 select-text mt-auto">
          <span>{lang === 'es' ? '©HANDS 3D 2026' : '© HANDS 3D 2026'}</span>
          <div className="flex gap-4">
            <span>{t.hero.footer.email}</span>
            <span className="hidden sm:inline">|</span>
            <span>{t.hero.footer.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
