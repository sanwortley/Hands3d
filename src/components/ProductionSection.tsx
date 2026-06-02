import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';


const ProductionSection: React.FC = () => {
  const { lang } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    file: '',
    jobType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', file: '', jobType: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative overflow-hidden bg-[#FAF5EF] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/brand/warm_beige_texture.webp')" }}
    >

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between pt-20 pb-4 md:pt-24 md:pb-4 relative z-10">
        
        {/* Symmetric 2-Column Split Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch flex-grow max-h-none md:max-h-[500px] lg:max-h-[520px] xl:max-h-[560px] max-w-5xl mx-auto w-full mb-3 md:mb-4">
          
          {/* Column 1: Slate Blue Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#3E5F8A] rounded-[2.5rem] pt-4 px-6 pb-4 md:pt-5 md:px-8 md:pb-4 flex flex-col justify-between text-[#FAF5EF] relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-cover bg-center bg-no-repeat w-full max-w-[400px] justify-self-center h-full"
            style={{ backgroundImage: "url('/brand/slate_blue_texture.webp')" }}
          >
            {/* Header Title */}
            <div className="text-center mb-2 md:mb-2.5 select-none">
              <h2 className="font-unbounded text-xs md:text-sm lg:text-base font-black tracking-tight border-b border-[#FAF5EF]/20 pb-1.5 w-full">
                {lang === 'es' ? 'SOLICITA TU PRESUPUESTO' : 'REQUEST YOUR BUDGET'}
              </h2>
            </div>

            {/* Interactive Form */}
            <div className="flex-grow flex flex-col justify-center my-1 md:my-1.5">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                     key="budget-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 md:gap-2.5 text-left"
                  >
                    {/* Field 1: Name */}
                    <div>
                      <label className="text-[9px] md:text-[9.5px] text-[#B58E45] font-space font-bold uppercase tracking-wider mb-1 block select-none">
                        {lang === 'es' ? 'Nombre y apellido' : 'Name and surname'}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border border-[#FAF5EF]/45 rounded-full px-5 py-1.5 md:py-1.5 text-[11px] md:text-[11.5px] text-[#FAF5EF] focus:outline-none focus:border-[#FAF5EF] placeholder-[#FAF5EF]/30 font-outfit"
                        placeholder="..."
                      />
                    </div>

                    {/* Field 2: Mail */}
                    <div>
                      <label className="text-[9px] md:text-[9.5px] text-[#B58E45] font-space font-bold uppercase tracking-wider mb-1 block select-none">
                        {lang === 'es' ? 'Mail' : 'Email'}
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border border-[#FAF5EF]/45 rounded-full px-5 py-1.5 md:py-1.5 text-[11px] md:text-[11.5px] text-[#FAF5EF] focus:outline-none focus:border-[#FAF5EF] placeholder-[#FAF5EF]/30 font-outfit"
                        placeholder="..."
                      />
                    </div>

                    {/* Field 3: Phone */}
                    <div>
                      <label className="text-[9px] md:text-[9.5px] text-[#B58E45] font-space font-bold uppercase tracking-wider mb-1 block select-none">
                        {lang === 'es' ? 'Número celular' : 'Phone number'}
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border border-[#FAF5EF]/45 rounded-full px-5 py-1.5 md:py-1.5 text-[11px] md:text-[11.5px] text-[#FAF5EF] focus:outline-none focus:border-[#FAF5EF] placeholder-[#FAF5EF]/30 font-outfit"
                        placeholder="..."
                      />
                    </div>

                    {/* Field 4: STL Format File */}
                    <div>
                      <label className="text-[9px] md:text-[9.5px] text-[#B58E45] font-space font-bold uppercase tracking-wider mb-1 block select-none">
                        {lang === 'es' ? 'Archivo formato .stl' : 'STL file format'}
                      </label>
                      <input 
                        type="text" 
                        value={formData.file}
                        onChange={(e) => setFormData({ ...formData, file: e.target.value })}
                        className="w-full bg-transparent border border-[#FAF5EF]/45 rounded-full px-5 py-1.5 md:py-1.5 text-[11px] md:text-[11.5px] text-[#FAF5EF] focus:outline-none focus:border-[#FAF5EF] placeholder-[#FAF5EF]/30 font-outfit"
                        placeholder={lang === 'es' ? 'Enlace a tu archivo (Drive, Dropbox, etc.)' : 'Link to your file (Drive, Dropbox, etc.)'}
                      />
                    </div>

                    {/* Field 5: Job Type */}
                    <div>
                      <label className="text-[9px] md:text-[9.5px] text-[#B58E45] font-space font-bold uppercase tracking-wider mb-1 block select-none">
                        {lang === 'es' ? 'Tipo de trabajo solicitante' : 'Requesting job type'}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.jobType}
                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                        className="w-full bg-transparent border border-[#FAF5EF]/45 rounded-full px-5 py-1.5 md:py-1.5 text-[11px] md:text-[11.5px] text-[#FAF5EF] focus:outline-none focus:border-[#FAF5EF] placeholder-[#FAF5EF]/30 font-outfit"
                        placeholder="..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-[#2E4A72] hover:bg-[#203554] disabled:opacity-50 text-white font-unbounded text-[10px] md:text-[10.5px] font-black uppercase py-2 px-8 rounded-full cursor-pointer transition-all active:scale-95 shadow-md w-full max-w-[180px] mx-auto select-none focus:outline-none mt-2.5 md:mt-3"
                    >
                      {isSubmitting ? (lang === 'es' ? 'ENVIANDO...' : 'SENDING...') : (lang === 'es' ? 'ENVIAR' : 'SUBMIT')}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full text-center py-6 flex flex-col items-center justify-center space-y-3 font-outfit"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-unbounded font-black text-sm uppercase text-[#B58E45]">
                      {lang === 'es' ? '¡Presupuesto Solicitado!' : 'Budget Requested!'}
                    </h3>
                    <p className="text-[11px] md:text-[12px] text-[#FAF5EF]/80 font-light leading-relaxed max-w-xs px-2">
                      {lang === 'es' 
                        ? 'Hemos recibido los detalles de tu consulta. Nuestro equipo técnico analizará tu archivo .stl y te responderá en menos de 2 horas.' 
                        : 'We have received your budget details. Our technical team will analyze your .stl file and get back to you within 2 hours.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Column 2: Brand Text Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center h-full px-6 md:px-12 text-[#3E5F8A] justify-self-center w-full max-w-[440px] mt-6 md:mt-0"
          >
            <p className="font-outfit text-[11px] sm:text-[12px] md:text-[13px] xl:text-[14px] leading-relaxed opacity-95 select-text font-light text-center md:text-left">
              {lang === 'es' 
                ? 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.' 
                : 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.'}
            </p>
          </motion.div>

        </div>

        {/* Symmetrical Footer Row */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] font-space text-[#767676] tracking-widest pt-2.5 border-t border-[#111111]/5 gap-3 sm:gap-4 mt-8 pb-6 md:mt-0 md:pb-0 select-text">
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

export default ProductionSection;
