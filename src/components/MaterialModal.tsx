import React from 'react';
import { motion } from 'framer-motion';

interface MaterialSpec {
  t: string;
  s: string;
  d: string;
  img: string;
  density: string;
  hardness: string;
  ld: string;
}

interface MaterialModalProps {
  material: MaterialSpec | null;
  onClose: () => void;
  t: any;
}

const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose, t }) => {
  if (!material) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-white/80 backdrop-blur-3xl"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="relative w-full max-w-4xl bg-white border border-black/5 rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col h-full max-h-[85vh] md:max-h-[600px] shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-[#FAF5EF] text-[#111111] px-5 py-2 rounded-full font-space font-black text-[9px] uppercase tracking-widest hover:scale-105 hover:bg-[#3e5f8a] hover:text-white transition-all shadow-md cursor-pointer border border-[#3e5f8a]/10"
        >
          {t.modal.close}
        </button>

        <div className="flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-hidden bg-white">
          {/* Left image column */}
          <div className="w-full md:flex-[0.9] h-[25vh] md:h-full relative overflow-hidden bg-white border-b md:border-b-0 md:border-r border-black/5 shrink-0">
            <img 
              src={material.img} 
              alt={material.t} 
              className="w-full h-full object-cover grayscale opacity-90 contrast-125" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-white/80" />
          </div>

          {/* Right info column */}
          <div className="w-full md:flex-[1.1] p-6 md:p-12 flex flex-col justify-center space-y-4 md:space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-[#3e5f8a] font-space font-black tracking-[0.4em] text-[8px] md:text-[9px] uppercase opacity-70">
                {material.s}
              </span>
              <h2 className="font-space font-black text-3xl md:text-5xl tracking-tighter uppercase leading-none text-[#111111]">
                {material.t}
              </h2>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-outfit text-[#3e5f8a]/40 font-bold uppercase tracking-[0.3em] text-[8px]">
                {t.modal.spec}
              </h3>
              <p className="text-sm md:text-lg font-light leading-relaxed text-[#111111]/70">
                {material.ld}
              </p>
            </div>

            <div className="pt-4 border-t border-black/5">
              <div className="flex gap-10 mt-2">
                <div className="space-y-0.5">
                  <span className="block text-[7px] font-black opacity-45 uppercase tracking-[0.25em] text-[#111111]">Density</span>
                  <span className="font-space font-bold text-base text-[#3e5f8a]">{material.density}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[7px] font-black opacity-45 uppercase tracking-[0.25em] text-[#111111]">Hardness</span>
                  <span className="font-space font-bold text-base text-[#3e5f8a]">{material.hardness}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MaterialModal;
export { MaterialModal };
