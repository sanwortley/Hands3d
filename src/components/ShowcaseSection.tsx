import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

interface ShowcaseImage {
  url: string;
  category: string;
}

interface ShowcaseSectionProps {
  allShowcaseImages: ShowcaseImage[];
  activeCatIndex: number;
  setActiveCatIndex: (idx: number | ((prev: number) => number)) => void;
  isMobile: boolean;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ 
  allShowcaseImages, 
  activeCatIndex, 
  setActiveCatIndex, 
  isMobile 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveCatIndex(prev => Math.max(0, (prev as number) - 1));
  };

  const handleNext = () => {
    setActiveCatIndex(prev => Math.min(allShowcaseImages.length - 1, (prev as number) + 1));
  };

  return (
    <div ref={containerRef} className="flex flex-col min-h-dvh w-full bg-[#0a0a0a] text-white font-outfit select-none relative overflow-hidden py-16 md:py-24">
      
      {/* Visual Header row */}
      <div className="w-full flex items-center justify-center relative px-6 md:px-24 mb-10 shrink-0">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="text-[#C5A059] text-[9px] font-black uppercase tracking-[0.8em] mb-3 block opacity-60">Portfolio Archive</span>
            <h2 className="font-space font-black text-5xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none text-white opacity-25 select-none">
              Gallery
            </h2>
          </div>
        </Reveal>
      </div>

      {/* Carousel visual slider area */}
      <div className="w-full flex-1 flex flex-col justify-center relative z-10 px-6 md:px-24">
        {/* Count Bar metadata tracker */}
        <div className="w-full max-w-6xl mx-auto mb-6 flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[#C5A059] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">
              {(activeCatIndex + 1).toString().padStart(2, '0')} / {allShowcaseImages.length.toString().padStart(2, '0')}
            </span>
            <div className="w-32 h-px bg-[#C5A059]/30" />
          </div>
          <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold hidden md:block">Click images to select or use arrows</p>
        </div>

        {/* Dynamic sliding cards drawer strip */}
        <div className="relative h-[300px] md:h-[400px] flex items-center w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="w-full h-px bg-white/5" />
          </div>
          
          <div className="w-full overflow-visible">
            <motion.div 
              className="flex gap-4 md:gap-8 px-[5%] md:px-[20%]"
              animate={{ 
                x: isMobile 
                  ? `calc(50% - ${(activeCatIndex * 196) + 98}px)`
                  : `calc(35vw - ${activeCatIndex * 260}px)` 
              }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            >
              {allShowcaseImages.map((img, i) => {
                const isActive = i === activeCatIndex;
                const distance = Math.abs(i - activeCatIndex);
                
                return (
                  <motion.div
                    key={i}
                    onClick={() => setActiveCatIndex(i)}
                    className={`relative shrink-0 cursor-pointer transition-all duration-500 ${isActive ? 'z-20' : 'z-10'}`}
                    animate={{ 
                      scale: isActive ? 1.35 : 0.8,
                      opacity: isActive ? 1 : (distance > 3 ? 0 : 0.35),
                      filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                      y: isActive ? -10 : 0
                    }}
                  >
                    <div className={`w-[180px] md:w-[240px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl border ${isActive ? 'border-[#C5A059]/40' : 'border-transparent'}`}>
                      <img 
                        src={img.url} 
                        alt={img.category} 
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        {/* Navigation control arrows */}
        <div className="flex justify-center items-center gap-12 md:gap-16 mt-8 md:mt-12 shrink-0">
          <button 
            onClick={handlePrev}
            className="text-white/20 hover:text-[#C5A059] active:scale-90 transition-all hover:scale-110 disabled:opacity-0 cursor-pointer"
            disabled={activeCatIndex === 0}
            title="Anterior"
          >
            <svg className="w-8 h-8 md:w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            className="text-white/20 hover:text-[#C5A059] active:scale-90 transition-all hover:scale-110 disabled:opacity-0 cursor-pointer"
            disabled={activeCatIndex === allShowcaseImages.length - 1}
            title="Siguiente"
          >
            <svg className="w-8 h-8 md:w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
export { ShowcaseSection };
