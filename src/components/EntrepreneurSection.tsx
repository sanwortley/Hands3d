import React from 'react';
import { motion } from 'framer-motion';
import NavbarOverlay from './NavbarOverlay';

const EntrepreneurSection: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#111111]">
      {/* Cropped responsive widescreen bounding box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
        style={{ aspectRatio: '1920/980' }}
      >
        <img 
          src="/slides/slide_10.webp" 
          alt="Hands3D Entrepreneur Area" 
          className="w-full h-full object-contain pointer-events-none select-none z-10"
        />
        <NavbarOverlay theme="black" />
      </motion.div>
    </div>
  );
};

export default EntrepreneurSection;
