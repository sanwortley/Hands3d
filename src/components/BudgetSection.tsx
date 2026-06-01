import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../lib/store';
import NavbarOverlay from './NavbarOverlay';

const BudgetSection: React.FC = () => {
  const { lang } = useAppStore();

  const socialLinks = [
    { label: 'Whatsapp', href: 'https://wa.me/5491111111111', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'Instagram', href: 'https://instagram.com/hands3d', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'Mail', href: 'mailto:info@hands3d.studio', target: '_self' }
  ];

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative overflow-hidden bg-[#FAF5EF] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
    >
      {/* Real HTML header bar */}
      <NavbarOverlay isHero={false} />

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between pt-20 pb-2 md:pt-24 md:pb-4 relative z-10">
        
        {/* Symmetric 2-Column Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch flex-grow max-h-[460px] md:max-h-[500px] lg:max-h-[520px] xl:max-h-[560px] max-w-5xl mx-auto w-full mb-3 md:mb-4">
          
          {/* Column 1: Float Hand & Symmetrical Pill Link Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center h-full w-full max-w-[400px] justify-self-center select-none"
          >
            {/* Grayscale Rock Hand */}
            <div className="h-[100px] md:h-[130px] flex items-end justify-center mb-4 md:mb-6 relative w-full">
              <motion.img 
                src="/brand/hand_rock.png" 
                alt="Rock Hand"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-auto object-contain pointer-events-none select-none z-20"
              />
            </div>

            {/* Capsules Links List */}
            <div className="w-full flex flex-col gap-3 items-center">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-[260px] md:max-w-[300px] h-[40px] md:h-[45px] border border-[#111111]/70 rounded-full flex items-center justify-center font-unbounded text-xs md:text-sm font-bold text-[#111111] hover:bg-[#3E5F8A] hover:text-[#FAF5EF] hover:border-[#3E5F8A] transition-all duration-300 shadow-sm cursor-pointer select-none text-center"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Brand Text Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center h-full px-6 md:px-12 text-[#3E5F8A] justify-self-center w-full max-w-[440px]"
          >
            <p className="font-outfit text-[11px] sm:text-[12px] md:text-[13px] xl:text-[14px] leading-relaxed opacity-95 select-text font-light text-center md:text-left">
              {lang === 'es' 
                ? 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.' 
                : 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.'}
            </p>
          </motion.div>

        </div>

        {/* Symmetrical Footer Row with enlarged Smiley face */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] font-space text-[#767676] tracking-widest pt-2.5 border-t border-[#111111]/5 gap-4 select-text">
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
    </div>
  );
};

export default BudgetSection;
