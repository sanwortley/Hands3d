import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavbarOverlay from './NavbarOverlay';

const CalculatorSection: React.FC = () => {
  // Calculator States
  const [weight, setWeight] = useState<number>(250); // grams
  const [spoolCost, setSpoolCost] = useState<number>(28); // $ per kg
  const [printTime, setPrintTime] = useState<number>(12); // hours
  const [margin, setMargin] = useState<number>(2.0); // profit margin multiplier
  
  // Computed Output Costs
  const [filamentCost, setFilamentCost] = useState<number>(0);
  const [baseCost, setBaseCost] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const filCost = (weight / 1000) * spoolCost;
    const pwrCost = (printTime * 150 / 1000) * 0.18;
    const wearCost = printTime * 0.25;
    const bCost = filCost + pwrCost + wearCost;
    const fPrice = bCost * margin;

    setFilamentCost(filCost);
    setBaseCost(bCost);
    setFinalPrice(fPrice);
  }, [weight, spoolCost, printTime, margin]);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#111111] text-white">
      {/* Cropped responsive widescreen bounding box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
        style={{ aspectRatio: '1920/980' }}
      >
        {/* Exact Slide 11 mockup template image */}
        <img 
          src="/slides/slide_11.webp" 
          alt="Hands3D Printing Cost Calculator" 
          className="w-full h-full object-contain pointer-events-none select-none z-10"
        />

        {/* Dynamic Cost Sliders overlaying visual positions in Slide 11 */}
        <div className="absolute top-[25%] left-[4%] w-[42%] h-[62%] z-20 flex flex-col justify-between">
          
          {/* Part weight slider */}
          <div className="w-full relative flex flex-col">
            <div className="flex justify-between items-baseline pr-4">
              <span className="text-[7px] uppercase font-bold text-white/40">PESO ESTIMADO</span>
              <span className="text-xs font-mono font-black text-[#B58E45]">{weight}g</span>
            </div>
            <input 
              type="range" min="10" max="2000" step="5" value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B58E45]"
            />
          </div>

          {/* Filament spool cost slider */}
          <div className="w-full relative flex flex-col mt-4">
            <div className="flex justify-between items-baseline pr-4">
              <span className="text-[7px] uppercase font-bold text-white/40">COSTO DEL ROLLO ($/KG)</span>
              <span className="text-xs font-mono font-black text-[#B58E45]">${spoolCost}</span>
            </div>
            <input 
              type="range" min="10" max="150" step="1" value={spoolCost} 
              onChange={(e) => setSpoolCost(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B58E45]"
            />
          </div>

          {/* Printing duration hours slider */}
          <div className="w-full relative flex flex-col mt-4">
            <div className="flex justify-between items-baseline pr-4">
              <span className="text-[7px] uppercase font-bold text-white/40">TIEMPO DE IMPRESIÓN</span>
              <span className="text-xs font-mono font-black text-[#B58E45]">{printTime}h</span>
            </div>
            <input 
              type="range" min="1" max="120" step="1" value={printTime} 
              onChange={(e) => setPrintTime(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B58E45]"
            />
          </div>

          {/* Business margin multiplier slider */}
          <div className="w-full relative flex flex-col mt-4">
            <div className="flex justify-between items-baseline pr-4">
              <span className="text-[7px] uppercase font-bold text-white/40">MARGEN DE GANANCIA</span>
              <span className="text-xs font-mono font-black text-[#B58E45]">{margin.toFixed(1)}x</span>
            </div>
            <input 
              type="range" min="1.1" max="4.0" step="0.1" value={margin} 
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B58E45]"
            />
          </div>

        </div>

        {/* Real-time Math Output Display Boxes overlaying visual positions in Slide 11 */}
        <div className="absolute top-[25%] left-[54%] w-[42%] h-[62%] z-20 flex flex-col justify-between select-none text-left">
          
          {/* Direct filament price breakdown */}
          <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
            <div>
              <span className="block text-[8px] font-bold text-white/50">COSTO MATERIAL</span>
              <span className="block text-[7px] text-white/30">Plástico consumido</span>
            </div>
            <span className="font-mono font-bold text-xs text-white/90">${filamentCost.toFixed(2)}</span>
          </div>

          {/* Production power & machinery wear summation */}
          <div className="flex justify-between items-center border-b border-white/[0.04] pb-2 mt-2">
            <div>
              <span className="block text-[8px] font-bold text-white/50">OPERACIÓN & ENERGÍA</span>
              <span className="block text-[7px] text-white/30">Desgaste boquilla + electricidad</span>
            </div>
            <span className="font-mono font-bold text-xs text-white/90">
              ${(printTime * (0.25 + (150 * 0.18 / 1000))).toFixed(2)}
            </span>
          </div>

          {/* Sum base cost net */}
          <div className="flex justify-between items-center border-b border-white/[0.04] pb-2 mt-2">
            <div>
              <span className="block text-[8px] font-bold text-white/50">COSTO BASE NETO</span>
              <span className="block text-[7px] text-white/30">Costo total de fabricación</span>
            </div>
            <span className="font-mono font-bold text-xs text-white/90">${baseCost.toFixed(2)}</span>
          </div>

          {/* ColossalSuggested finalquote display */}
          <div className="bg-[#B58E45]/15 border border-[#B58E45]/30 rounded-xl p-3 flex justify-between items-center mt-4">
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-[#B58E45] font-black">COTIZACIÓN RECOMENDADA</span>
              <span className="block text-[7px] text-white/60">Precio final con margen del {((margin - 1) * 100).toFixed(0)}%</span>
            </div>
            <span className="font-mono font-black text-xl text-[#FAF5EF]">
              ${finalPrice.toFixed(2)}
            </span>
          </div>

        </div>

        <NavbarOverlay />
      </motion.div>
    </div>
  );
};

export default CalculatorSection;
