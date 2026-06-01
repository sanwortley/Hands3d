import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';
import NavbarOverlay from './NavbarOverlay';

interface PrintingProfile {
  name: string;
  filamentPrice: number; // $/kg
  kwhPrice: number;      // $
  powerConsumption: number; // W
  machineLifespan: number;  // hours
  sparePartsCost: number;   // $
  errorRate: number;        // %
  profitMargin: number;     // multiplier
}

const PRELOADED_PROFILES: PrintingProfile[] = [
  {
    name: 'PLA Standard',
    filamentPrice: 25000,
    kwhPrice: 140,
    powerConsumption: 120,
    machineLifespan: 4320,
    sparePartsCost: 150000,
    errorRate: 5,
    profitMargin: 4,
  },
  {
    name: 'PETG Premium',
    filamentPrice: 35000,
    kwhPrice: 140,
    powerConsumption: 150,
    machineLifespan: 4000,
    sparePartsCost: 180000,
    errorRate: 7,
    profitMargin: 4,
  },
  {
    name: 'ABS Técnico',
    filamentPrice: 38000,
    kwhPrice: 140,
    powerConsumption: 200,
    machineLifespan: 3600,
    sparePartsCost: 220000,
    errorRate: 10,
    profitMargin: 5,
  },
  {
    name: 'Flex Flexible',
    filamentPrice: 45000,
    kwhPrice: 140,
    powerConsumption: 120,
    machineLifespan: 4320,
    sparePartsCost: 150000,
    errorRate: 8,
    profitMargin: 5,
  }
];

const CalculatorSection: React.FC = () => {
  const { lang } = useAppStore();

  // Profile States
  const [profiles, setProfiles] = useState<PrintingProfile[]>(() => {
    const saved = localStorage.getItem('hands3d_printing_profiles');
    if (saved) {
      try {
        return [...PRELOADED_PROFILES, ...JSON.parse(saved)];
      } catch (e) {
        return PRELOADED_PROFILES;
      }
    }
    return PRELOADED_PROFILES;
  });

  const [selectedProfileName, setSelectedProfileName] = useState<string>('PLA Standard');
  const [newProfileName, setNewProfileName] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Form Inputs (matching Image 1)
  const [filamentPrice, setFilamentPrice] = useState<number>(25000); // $/kg
  const [kwhPrice, setKwhPrice] = useState<number>(140);            // $
  const [powerConsumption, setPowerConsumption] = useState<number>(120); // W
  const [machineLifespan, setMachineLifespan] = useState<number>(4320); // hours
  const [sparePartsCost, setSparePartsCost] = useState<number>(150000); // $
  const [errorRate, setErrorRate] = useState<number>(5);             // %

  const [printHours, setPrintHours] = useState<number>(1);
  const [printMinutes, setPrintMinutes] = useState<number>(50);
  const [filamentWeight, setFilamentWeight] = useState<number>(40);  // grams
  const [extraSupplies, setExtraSupplies] = useState<number>(0);     // $

  const [profitMargin, setProfitMargin] = useState<number>(4);       // multiplier

  // Recruiting Form States
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantMail, setApplicantMail] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantPrinter, setApplicantPrinter] = useState<string>('');
  const [applicantAvailability, setApplicantAvailability] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Outputs
  const [materialCost, setMaterialCost] = useState<number>(0);
  const [electricityCost, setElectricityCost] = useState<number>(0);
  const [wearCost, setWearCost] = useState<number>(0);
  const [errorCost, setErrorCost] = useState<number>(0);
  const [subtotalCost, setSubtotalCost] = useState<number>(0);
  const [insumosMarkedUp, setInsumosMarkedUp] = useState<number>(0);
  const [totalToCollect, setTotalToCollect] = useState<number>(0);
  const [mercadoLibrePrice, setMercadoLibrePrice] = useState<number>(0);

  // Load selected profile values
  useEffect(() => {
    const prof = profiles.find(p => p.name === selectedProfileName);
    if (prof) {
      setFilamentPrice(prof.filamentPrice);
      setKwhPrice(prof.kwhPrice);
      setPowerConsumption(prof.powerConsumption);
      setMachineLifespan(prof.machineLifespan);
      setSparePartsCost(prof.sparePartsCost);
      setErrorRate(prof.errorRate);
      setProfitMargin(prof.profitMargin);
    }
  }, [selectedProfileName, profiles]);

  // Recalculate outputs
  useEffect(() => {
    const totalTimeHours = printHours + (printMinutes / 60);
    const mat = (filamentWeight / 1000) * filamentPrice;
    const elec = (powerConsumption / 1000) * totalTimeHours * kwhPrice;
    const wear = (sparePartsCost / machineLifespan) * totalTimeHours;
    const err = (mat + elec + wear) * (errorRate / 100);
    const subtotal = mat + elec + wear + err;
    const insMarked = extraSupplies * 1.3;
    const collect = (subtotal * profitMargin) + insMarked;
    const ml = collect / (1 - 0.1667);

    setMaterialCost(mat);
    setElectricityCost(elec);
    setWearCost(wear);
    setErrorCost(err);
    setSubtotalCost(subtotal);
    setInsumosMarkedUp(insMarked);
    setTotalToCollect(collect);
    setMercadoLibrePrice(ml);
  }, [
    filamentPrice,
    kwhPrice,
    powerConsumption,
    machineLifespan,
    sparePartsCost,
    errorRate,
    printHours,
    printMinutes,
    filamentWeight,
    extraSupplies,
    profitMargin
  ]);

  // Save new custom profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    const newProfile: PrintingProfile = {
      name: newProfileName.trim(),
      filamentPrice,
      kwhPrice,
      powerConsumption,
      machineLifespan,
      sparePartsCost,
      errorRate,
      profitMargin
    };

    const updatedCustomList = [...profiles.filter(p => !PRELOADED_PROFILES.some(pp => pp.name === p.name)), newProfile];
    localStorage.setItem('hands3d_printing_profiles', JSON.stringify(updatedCustomList));

    setProfiles([...PRELOADED_PROFILES, ...updatedCustomList]);
    setSelectedProfileName(newProfile.name);
    setNewProfileName('');
    setIsSaving(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val).replace('ARS', '$').trim();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantMail.trim() || !applicantPhone.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <div 
      className="w-full h-full flex flex-col relative overflow-y-auto lg:overflow-hidden bg-[#111111] text-white pt-16 pb-3 bg-cover bg-center bg-no-repeat no-scrollbar"
      style={{ backgroundImage: "url('/brand/matte_black_texture.webp')" }}
    >
      <NavbarOverlay theme="black" />

      {/* Main Container constrained to prevent double scrolling */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex-1 flex flex-col justify-between relative z-20 h-auto lg:h-[calc(100vh-80px)] lg:max-h-[820px]">
        
        {/* Symmetrical Grid overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-4 items-stretch w-full flex-grow my-auto py-4 lg:py-0 pb-8 lg:pb-0">
          
          {/* ========================================================================= */}
          {/* COLUMN 1: CONFIG & INPUT PANEL (5/12 columns) - VERY COMPACT              */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-black/45 border border-white/5 rounded-3xl p-3.5 md:p-4 flex flex-col justify-between shadow-xl backdrop-blur-md"
          >
            <div className="flex flex-col h-full justify-between">
              
              {/* Profile Manager */}
              <div className="border-b border-white/5 pb-2.5 mb-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-unbounded text-[10px] font-black tracking-widest text-[#B58E45] uppercase">
                      {lang === 'es' ? 'Perfil de impresión' : 'Print Profile'}
                    </h3>
                    
                    <select
                      value={selectedProfileName}
                      onChange={(e) => setSelectedProfileName(e.target.value)}
                      className="mt-0.5 bg-black/80 border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-[#FAF5EF] focus:outline-none focus:border-[#B58E45] font-outfit font-medium cursor-pointer"
                    >
                      {profiles.map(p => (
                        <option key={p.name} value={p.name} className="bg-[#111111] text-white">
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-[8px] font-bold text-white/30 uppercase tracking-widest text-right">
                      {lang === 'es' ? 'Moneda local' : 'Local Currency'}
                    </span>
                    <select
                      className="mt-0.5 bg-black/80 border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-[#FAF5EF] focus:outline-none font-outfit font-medium"
                      disabled
                    >
                      <option>Pesos argentinos (ARS)</option>
                    </select>
                  </div>
                </div>

                {!isSaving ? (
                  <button
                    onClick={() => setIsSaving(true)}
                    className="mt-2 w-full bg-[#E03B30] hover:bg-[#C83027] text-white font-unbounded text-[9px] font-black py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg select-none cursor-pointer border-none"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                    </svg>
                    {lang === 'es' ? 'GUARDAR NUEVO PERFIL' : 'SAVE NEW PROFILE'}
                  </button>
                ) : (
                  <form onSubmit={handleSaveProfile} className="mt-2 flex gap-1.5">
                    <input
                      type="text"
                      placeholder={lang === 'es' ? 'Nombre...' : 'Name...'}
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="flex-1 bg-black/60 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[#B58E45] font-outfit"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-outfit text-[11px] font-bold px-2.5 rounded-lg cursor-pointer border-none"
                    >
                      {lang === 'es' ? 'Guardar' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSaving(false)}
                      className="bg-white/10 hover:bg-white/20 text-white font-outfit text-[11px] font-bold px-2 rounded-lg cursor-pointer border-none"
                    >
                      X
                    </button>
                  </form>
                )}
              </div>

              {/* 1. Gastos Fijos Panel */}
              <div className="mb-2.5">
                <h4 className="font-unbounded text-[9px] font-black tracking-widest text-[#FAF5EF]/90 uppercase mb-2 flex items-center gap-1 border-l border-[#B58E45] pl-1.5 select-none">
                  {lang === 'es' ? 'Gastos fijos' : 'Fixed Overhead'}
                </h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Filamento ($/kg)' : 'Filament ($/kg)'}
                    </label>
                    <input
                      type="number"
                      value={filamentPrice}
                      onChange={(e) => setFilamentPrice(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Precio del kWh ($)' : 'Electricity /kWh'}
                    </label>
                    <input
                      type="number"
                      value={kwhPrice}
                      onChange={(e) => setKwhPrice(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Consumo impresora (W)' : 'Power consumption (W)'}
                    </label>
                    <input
                      type="number"
                      value={powerConsumption}
                      onChange={(e) => setPowerConsumption(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Vida útil (horas)' : 'Lifespan (hours)'}
                    </label>
                    <input
                      type="number"
                      value={machineLifespan}
                      onChange={(e) => setMachineLifespan(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Costo repuestos ($)' : 'Spare parts budget ($)'}
                    </label>
                    <input
                      type="number"
                      value={sparePartsCost}
                      onChange={(e) => setSparePartsCost(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Margen de error (%)' : 'Error tolerance (%)'}
                    </label>
                    <input
                      type="number"
                      value={errorRate}
                      onChange={(e) => setErrorRate(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Pieza Panel */}
              <div className="mb-2.5">
                <h4 className="font-unbounded text-[9px] font-black tracking-widest text-[#FAF5EF]/90 uppercase mb-2 flex items-center gap-1 border-l border-[#B58E45] pl-1.5 select-none">
                  {lang === 'es' ? 'Pieza' : '3D Printed Piece'}
                </h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Horas de impresión' : 'Print hours'}
                    </label>
                    <input
                      type="number"
                      value={printHours}
                      onChange={(e) => setPrintHours(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Minutos adicionales' : 'Extra minutes'}
                    </label>
                    <input
                      type="number"
                      value={printMinutes}
                      onChange={(e) => setPrintMinutes(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Gramos de filamento' : 'Grams of material'}
                    </label>
                    <input
                      type="number"
                      value={filamentWeight}
                      onChange={(e) => setFilamentWeight(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                      {lang === 'es' ? 'Insumos extra ($)' : 'Extra supplies ($)'}
                    </label>
                    <input
                      type="number"
                      value={extraSupplies}
                      onChange={(e) => setExtraSupplies(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-[#FAF5EF] font-mono focus:outline-none focus:border-[#B58E45]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Ganancia Panel */}
              <div>
                <h4 className="font-unbounded text-[9px] font-black tracking-widest text-[#FAF5EF]/90 uppercase mb-2 flex items-center gap-1 border-l border-[#B58E45] pl-1.5 select-none">
                  {lang === 'es' ? 'Ganancia' : 'Profit Setup'}
                </h4>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline select-none">
                    <span className="text-[7.5px] font-bold text-white/35 uppercase">
                      {lang === 'es' ? 'Margen de ganancia (multiplicador)' : 'Profit multiplier'}
                    </span>
                    <span className="text-[#B58E45] text-xs font-black font-mono">{profitMargin}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.5"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B58E45]"
                  />
                </div>
              </div>

            </div>

            {/* Symmetrical Footnote References */}
            <div className="mt-2.5 border-t border-white/5 pt-2 select-none">
              <span className="block text-[8px] font-bold text-[#B58E45] tracking-widest uppercase mb-1">
                {lang === 'es' ? 'Referencias Sugeridas:' : 'Suggested Multipliers:'}
              </span>
              <div className="flex gap-4 text-[9px] font-space text-white/35">
                <span>{lang === 'es' ? 'Mayorista' : 'Wholesale'} <strong className="text-white/60">→ 3</strong></span>
                <span>{lang === 'es' ? 'Minorista' : 'Retail'} <strong className="text-white/60">→ 4</strong></span>
                <span>{lang === 'es' ? 'Llaveros' : 'Keychains'} <strong className="text-white/60">→ 5</strong></span>
              </div>
            </div>

          </motion.div>

          {/* ========================================================================= */}
          {/* COLUMN 2: REAL-TIME RESULTS PANEL (3/12 columns) - VERY COMPACT            */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 bg-black/45 border border-white/5 rounded-3xl p-3.5 md:p-4 flex flex-col justify-between shadow-xl backdrop-blur-md"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2.5 mb-2.5 select-none">
                <svg className="w-4 h-4 fill-current text-[#E03B30]" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/>
                </svg>
                <h3 className="font-unbounded text-[10px] font-black tracking-widest text-[#FAF5EF] uppercase">
                  {lang === 'es' ? 'Resultados' : 'Results'}
                </h3>
              </div>

              {/* Detailed cost rows */}
              <div className="flex flex-col gap-0.5">
                
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <div>
                    <span className="block text-[7.5px] font-bold text-white/45 uppercase leading-tight">
                      {lang === 'es' ? 'Precio material' : 'Material cost'}
                    </span>
                    <span className="block text-[6.5px] text-white/25 leading-tight">
                      {lang === 'es' ? 'Plástico consumido' : 'Net plastic weight'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/90">{formatCurrency(materialCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <div>
                    <span className="block text-[7.5px] font-bold text-white/45 uppercase leading-tight">
                      {lang === 'es' ? 'Precio luz' : 'Electricity used'}
                    </span>
                    <span className="block text-[6.5px] text-white/25 leading-tight">
                      {lang === 'es' ? 'Potencia consumida' : 'Printer power'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/90">{formatCurrency(electricityCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <div>
                    <span className="block text-[7.5px] font-bold text-white/45 uppercase leading-tight">
                      {lang === 'es' ? 'Desgaste máquina' : 'Printer wear'}
                    </span>
                    <span className="block text-[6.5px] text-white/25 leading-tight">
                      {lang === 'es' ? 'Amortización' : 'Nozzle + fan wear'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/90">{formatCurrency(wearCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <div>
                    <span className="block text-[7.5px] font-bold text-white/45 uppercase leading-tight">
                      {lang === 'es' ? 'Margen de error' : 'Error contingency'}
                    </span>
                    <span className="block text-[6.5px] text-white/25 leading-tight">
                      {lang === 'es' ? 'Fallas imprevistas' : 'Failed prints'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/90">{formatCurrency(errorCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <div>
                    <span className="block text-[8px] font-black text-white/60 uppercase leading-tight">
                      {lang === 'es' ? 'Costo total (sin insumos)' : 'Net cost (excl. supplies)'}
                    </span>
                    <span className="block text-[6.5px] text-white/25 leading-tight">
                      {lang === 'es' ? 'Costo de fabricación neto' : 'Manufacturing cost'}
                    </span>
                  </div>
                  <span className="font-mono text-[11.5px] font-black text-white/90">{formatCurrency(subtotalCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <div>
                    <span className="block text-[7.5px] font-bold text-white/45 uppercase leading-tight">
                      {lang === 'es' ? 'Insumos (+30%)' : 'Supplies (+30%)'}
                    </span>
                    <span className="block text-[6.5px] text-white/25 leading-tight">
                      {lang === 'es' ? 'Agregados + embalaje' : 'Packaging and assembly'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/90">{formatCurrency(insumosMarkedUp)}</span>
                </div>

              </div>
            </div>

            {/* Colossal highlight boxes */}
            <div className="mt-3 flex flex-col gap-2 select-none">
              
              {/* TOTAL A COBRAR */}
              <div className="bg-[#E03B30]/10 border border-[#E03B30]/20 rounded-xl p-2.5 flex flex-col">
                <span className="text-[7.5px] uppercase tracking-wider text-[#E03B30] font-black leading-none mb-0.5">
                  {lang === 'es' ? 'TOTAL A COBRAR' : 'TOTAL TO COLLECT'}
                </span>
                <span className="font-mono text-lg md:text-xl font-black text-[#FAF5EF] leading-tight">
                  {formatCurrency(totalToCollect)}
                </span>
              </div>

              {/* PRECIO MERCADOLIBRE */}
              <div className="bg-[#B58E45]/15 border border-[#B58E45]/35 rounded-xl p-2.5 flex flex-col">
                <span className="text-[7.5px] uppercase tracking-wider text-[#B58E45] font-black leading-none mb-0.5">
                  {lang === 'es' ? 'PRECIO MERCADOLIBRE' : 'MERCADOLIBRE PRICE'}
                </span>
                <span className="font-mono text-lg md:text-xl font-black text-[#B58E45] leading-tight">
                  {formatCurrency(mercadoLibrePrice)}
                </span>
              </div>

            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* COLUMN 3: RECRUITMENT ME SUMO FORM (4/12 columns) - VERY COMPACT          */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 bg-black/45 border border-white/5 rounded-3xl p-3.5 md:p-4 flex flex-col justify-between shadow-xl backdrop-blur-md relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  key="recruitment-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Concise single sentence description saves enormous visual space */}
                    <p className="font-outfit text-[10px] leading-relaxed opacity-55 select-text mb-2.5 text-left">
                      {lang === 'es' 
                        ? 'Hands3D es un estudio de fabricación digital a medida, dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación.'
                        : 'Hands3D is a custom digital manufacturing studio, dedicated to creating exceptional physical experiences that unite creativity and innovation.'}
                    </p>

                    {/* Form fields */}
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-1.5">
                      <div>
                        <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                          {lang === 'es' ? 'Nombre y apellido' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="w-full bg-black/60 border border-white/35 rounded-xl px-3 py-1 text-[11px] focus:outline-none focus:border-[#B58E45] transition-colors font-outfit text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                          {lang === 'es' ? 'Mail' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          value={applicantMail}
                          onChange={(e) => setApplicantMail(e.target.value)}
                          className="w-full bg-black/60 border border-white/35 rounded-xl px-3 py-1 text-[11px] focus:outline-none focus:border-[#B58E45] transition-colors font-outfit text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                          {lang === 'es' ? 'Numero celular' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="w-full bg-black/60 border border-white/35 rounded-xl px-3 py-1 text-[11px] focus:outline-none focus:border-[#B58E45] transition-colors font-outfit text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                          {lang === 'es' ? 'Que impresora tenes?' : '3D printer model'}
                        </label>
                        <input
                          type="text"
                          value={applicantPrinter}
                          onChange={(e) => setApplicantPrinter(e.target.value)}
                          className="w-full bg-black/60 border border-white/35 rounded-xl px-3 py-1 text-[11px] focus:outline-none focus:border-[#B58E45] transition-colors font-outfit text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[7px] font-bold text-white/35 uppercase mb-0.5 select-none">
                          {lang === 'es' ? 'Disponibilidad horaria' : 'Work availability'}
                        </label>
                        <input
                          type="text"
                          value={applicantAvailability}
                          onChange={(e) => setApplicantAvailability(e.target.value)}
                          className="w-full bg-black/60 border border-white/35 rounded-xl px-3 py-1 text-[11px] focus:outline-none focus:border-[#B58E45] transition-colors font-outfit text-white"
                        />
                      </div>

                      {/* ME SUMO submit */}
                      <div className="mt-2">
                        <span className="block text-[9px] font-unbounded font-black tracking-widest text-[#FAF5EF]/80 uppercase text-left mb-1 select-none">
                          {lang === 'es' ? 'ME SUMO!!' : 'JOIN US!!'}
                        </span>
                        
                        <button
                          type="submit"
                          className="w-full bg-[#FAF5EF] hover:bg-[#EBE5DE] text-[#111111] font-unbounded font-black py-2 rounded-full text-center transition-all duration-300 tracking-widest text-[10px] select-none cursor-pointer border-none shadow-sm hover:shadow-md"
                        >
                          {lang === 'es' ? 'ENVIAR' : 'SEND'}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full py-6"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FAF5EF]/10 border border-[#FAF5EF]/20 flex items-center justify-center mb-3 select-none">
                    <svg className="w-6 h-6 text-[#B58E45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  
                  <h4 className="font-unbounded text-xs font-black tracking-widest text-[#FAF5EF] uppercase mb-1.5 select-none">
                    {lang === 'es' ? '¡ENVIADA!' : 'SENT!'}
                  </h4>
                  
                  <p className="font-outfit text-[11px] text-white/50 max-w-[180px] leading-relaxed mb-4 select-text">
                    {lang === 'es' 
                      ? 'Postulación enviada. Te contactaremos a la brevedad.'
                      : 'Application sent. We will reach out shortly.'}
                  </p>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setApplicantName('');
                      setApplicantMail('');
                      setApplicantPhone('');
                      setApplicantPrinter('');
                      setApplicantAvailability('');
                    }}
                    className="bg-white/10 hover:bg-white/20 text-[#FAF5EF] font-unbounded font-black py-1.5 px-4 rounded-full transition-all duration-300 tracking-wider text-[8px] cursor-pointer border-none"
                  >
                    {lang === 'es' ? 'VOLVER A ENVIAR' : 'SUBMIT ANOTHER'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Emerging Hand draw badge floating at the bottom right */}
            <div className="absolute bottom-[-14px] right-[-10px] w-12 h-12 pointer-events-none select-none z-30 opacity-60">
              <motion.img 
                src="/brand/premium_pointing_hand.png" 
                alt="Pointing Hand"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full object-contain transform rotate-[-45deg]"
              />
            </div>

          </motion.div>

        </div>

        {/* Unified Bottom Footer Row */}
        <div className="w-full flex justify-between items-center text-[9px] font-space text-white/20 tracking-widest pt-2 border-t border-white/5 select-none mt-2">
          <span>{lang === 'es' ? '©HANDS 3D 2026' : '© HANDS 3D 2026'}</span>
          <span className="font-bold text-[#B58E45] uppercase hidden md:inline">
            {lang === 'es' ? 'TE DAMOS UNA MANO CON TU IDEA' : 'WE GIVE YOU A HAND WITH YOUR IDEA'}
          </span>
          <span>{lang === 'es' ? 'ÁREA EMPRENDEDOR 3D' : '3D ENTREPRENEUR AREA'}</span>
        </div>

      </div>
    </div>
  );
};

export default CalculatorSection;
