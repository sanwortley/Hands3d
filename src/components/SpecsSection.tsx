import React from 'react';
import { motion } from 'framer-motion';
import NavbarOverlay from './NavbarOverlay';

const SpecsSection: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#FAF5EF]">
      {/* Cropped aspect-ratio container fitting widescreen slides */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
        style={{ aspectRatio: '1920/980' }}
      >
        <img 
          src="/slides/slide_6.webp" 
          alt="Hands3D Detailed Specs" 
          className="w-full h-full object-contain pointer-events-none select-none z-10"
        />
        <NavbarOverlay />
      </motion.div>
    </div>
  );
};

export default SpecsSection;
