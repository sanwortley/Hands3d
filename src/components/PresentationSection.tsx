import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../lib/store';
import { translations } from '../translations';


const PresentationSection: React.FC = () => {
  const { lang } = useAppStore();
  const t = translations[lang];

  return (
    <div 
      className="w-full h-full flex flex-col relative overflow-y-auto md:overflow-hidden bg-[#FAF5EF] bg-cover bg-center bg-no-repeat no-scrollbar"
      style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
    >

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between pt-20 pb-4 md:pt-24 md:pb-4 h-auto md:h-full">
        
        {/* Symmetric 2-Column Split Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch flex-grow max-h-none md:max-h-[500px] lg:max-h-[520px] xl:max-h-[560px] max-w-5xl mx-auto w-full mb-3 md:mb-4 py-4 md:py-0">
          
          {/* Card 1: Quiénes Somos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#3E5F8A] rounded-[2.5rem] pt-6 px-6 pb-2.5 md:pt-8 md:px-8 md:pb-3.5 flex flex-col justify-between text-[#FAF5EF] relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-cover bg-center bg-no-repeat w-full max-w-[400px] justify-self-center h-full"
            style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
          >
            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
              <h2 className="font-unbounded text-lg sm:text-xl md:text-2xl font-black mb-3 select-text tracking-tight border-b border-[#FAF5EF]/20 pb-1.5 w-full max-w-[180px]">
                {t.about.titleLeft}
              </h2>
              <p className="font-outfit text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] leading-relaxed opacity-95 select-text font-light px-1 sm:px-2 mt-1">
                {t.about.descLeft}
              </p>
            </div>

            {/* Pointing Hand centered at the bottom, touching the bottom border */}
            <div className="w-full flex justify-center mt-auto h-[140px] md:h-[180px] relative overflow-hidden">
              <motion.img 
                src="/brand/premium_pointing_hand.png" 
                alt="Pointing Hand"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-12px] md:bottom-[-16px] w-auto h-[105%] md:h-[110%] max-h-[180px] object-contain pointer-events-none select-none z-20"
              />
            </div>
          </motion.div>

          {/* Card 2: Qué Hacemos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-[#3E5F8A] rounded-[2.5rem] pt-6 px-6 pb-2.5 md:pt-8 md:px-8 md:pb-3.5 flex flex-col justify-between text-[#FAF5EF] relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-cover bg-center bg-no-repeat w-full max-w-[400px] justify-self-center h-full"
            style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
          >
            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
              <h2 className="font-unbounded text-lg sm:text-xl md:text-2xl font-black mb-3 select-text tracking-tight border-b border-[#FAF5EF]/20 pb-1.5 w-full max-w-[180px]">
                {t.about.titleRight}
              </h2>
              <p className="font-outfit text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] leading-relaxed opacity-95 select-text font-light px-1 sm:px-2 mt-1">
                {t.about.descRight}
              </p>
            </div>

            {/* 3D Renders Collage centered inside a white rounded card */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-[1.75rem] p-2.5 shadow-md w-full max-w-[260px] md:max-w-[285px] mx-auto overflow-hidden mt-auto mb-0 cursor-pointer transition-transform duration-300"
            >
              <img 
                src="/brand/composite_3d_transparent.png" 
                alt="3D Renders Layout"
                className="w-full h-auto object-contain pointer-events-none select-none"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Symmetrical Footer Row */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] font-space text-[#767676] tracking-widest pt-2.5 border-t border-[#111111]/5 gap-4 select-text mt-8 md:mt-0 pb-6 md:pb-0">
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

export default PresentationSection;
