import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CircularArchive = ({ t, setSelectedMaterial }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 0.2, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 0.2, 1]);
  
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const scale2 = useTransform(scrollYProgress, [0.5, 1], [0.95, 1]);

  const items = [
    { num: '04', title: t.materia.title.join(' '), sub: 'Matter & Form' },
    { num: '05', title: t.archive.title.join(''), sub: 'Advanced Manufacturing' }
  ];

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-white text-[#1a1a1a]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* The Circular Arc Container */}
        <div className="absolute left-0 h-full w-[20%] md:w-[25%] hidden md:flex items-center z-20 pointer-events-none">
          <motion.div 
            style={{ rotate }}
            className="absolute -left-[50vw] md:-left-[20vw] w-[100vw] md:w-[50vw] aspect-square rounded-full border border-black/[0.03] flex items-center justify-end"
          >
            {items.map((item, i) => {
              const angle = i === 0 ? -15 : 15;
              return (
                <motion.div
                  key={i}
                  style={{ 
                    transformOrigin: 'left center',
                    rotate: angle,
                    x: '35vw'
                  }}
                  className="absolute flex items-center gap-4 md:gap-8 pointer-events-auto"
                >
                  <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-[#3e5f8a]/20" />
                  <div className="flex flex-col">
                    <span className="font-space font-black text-4xl md:text-9xl opacity-[0.08] leading-none">{item.num}</span>
                    <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] opacity-60 whitespace-nowrap">{item.sub}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Content Side */}
        <div className="w-full h-full relative z-10 px-6 md:pl-[18%] md:pr-24">
          {/* Section 04 Content */}
          <motion.div 
            style={{ opacity: opacity1, scale: scale1 }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:pl-[18%] md:pr-24"
          >
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-[#3e5f8a]/80">04. Materials</span>
                <h2 className="font-space font-black text-6xl md:text-[10rem] lg:text-[13rem] tracking-tighter uppercase leading-[0.75]">
                  {t.materia.title[0]}<br/><span className="opacity-60">{t.materia.title[1]}</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
                {t.materia.items.map((m, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMaterial(m)}
                    className="bg-black/5 p-5 md:p-8 border border-black/10 rounded-[25px] md:rounded-[35px] hover:bg-black/10 transition-all cursor-pointer group"
                  >
                    <span className="text-[8px] md:text-[10px] tracking-[0.4em] opacity-60 uppercase font-black mb-3 block">{m.s}</span>
                    <h3 className="font-space font-black text-2xl md:text-4xl tracking-tighter text-[#3e5f8a]">{m.t}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 05 Content */}
          <motion.div 
            style={{ opacity: opacity2, scale: scale2 }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:pl-[18%] md:pr-24 pointer-events-none data-[active=true]:pointer-events-auto"
            data-active={useTransform(scrollYProgress, p => p > 0.5 ? "true" : "false")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-[#3e5f8a]/80">05. Archive</span>
                  <h2 className="font-space font-black text-6xl md:text-[10rem] lg:text-[13rem] tracking-tighter uppercase leading-[0.75]">
                    {t.archive.title[0]}<br/><span className="text-[#3e5f8a]/60">{t.archive.title[1]}</span>
                  </h2>
                </div>
                <p className="text-xl md:text-3xl font-light opacity-80 leading-tight max-w-3xl">
                  {t.archive.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {t.archive.tags.map(tag => (
                    <span key={tag} className="px-5 py-2 border border-black/20 rounded-full text-[8px] md:text-[9px] font-black tracking-[0.3em] opacity-60 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative w-full aspect-square rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl bg-[#0A0A0A]">
                <img 
                  src="/brand/pointing_3d_v2.png" 
                  className="w-full h-full object-cover grayscale opacity-80" 
                  alt="Archive"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CircularArchive;
