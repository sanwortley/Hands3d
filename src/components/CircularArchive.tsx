import React from 'react';
import { motion } from 'framer-motion';
import NavbarOverlay from './NavbarOverlay';

interface MaterialSpec {
  t: string;
  s: string;
  d: string;
  img: string;
  density: string;
  hardness: string;
  ld: string;
}

interface CircularArchiveProps {
  t: any;
  setSelectedMaterial: (mat: any) => void;
}

const CircularArchive: React.FC<CircularArchiveProps> = ({ t, setSelectedMaterial }) => {
  const materials = t.materia.items;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#FAF5EF]">
      {/* Cropped responsive widescreen bounding box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
        style={{ aspectRatio: '1920/980' }}
      >
        {/* Exact Slide 5 mockup template image */}
        <img 
          src="/slides/slide_5.webp" 
          alt="Hands3D Materials Catalog" 
          className="w-full h-full object-contain pointer-events-none select-none z-10"
        />

        {/* Four transparent hoverable trigger zones overlaying PLA, ABS, PETG, and FLEX cards respectively */}
        <div className="absolute top-[25%] left-[4%] w-[92%] h-[57%] grid grid-cols-2 lg:grid-cols-4 gap-4 z-20">
          {materials.map((mat: MaterialSpec, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedMaterial(mat)}
              className="w-full h-full bg-transparent hover:bg-black/[0.02] active:scale-[0.99] rounded-[24px] cursor-pointer border-none outline-none transition-all"
              title={`Ver ficha de ${mat.t}`}
            />
          ))}
        </div>

        <NavbarOverlay />
      </motion.div>
    </div>
  );
};

export default CircularArchive;
