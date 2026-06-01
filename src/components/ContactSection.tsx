import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';
import { Reveal } from './Reveal';

interface ContactSectionProps {
  t: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-white font-outfit select-none relative overflow-hidden">
      {/* Fixed top section indicator banner */}
      <div className="h-[12%] w-full flex items-center px-6 md:px-16 border-b border-black/5 shrink-0 bg-white z-30">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-[#3e5f8a]/80 font-black">
          10. {t.lang === 'es' ? 'CONECTAR' : 'CONNECT'}
        </span>
      </div>

      {/* Main Grid Area */}
      <div className="h-[88%] w-full bg-white px-6 md:px-16 pt-4 pb-6 flex flex-col justify-between overflow-visible relative">
        <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center max-w-6xl mx-auto w-full">
          
          {/* Left Column: Zod-style functional form */}
          <div className="w-full md:flex-[1.2] space-y-4 text-left">
            <Reveal>
              <h2 className="font-space font-black text-3xl sm:text-5xl md:text-[3.8rem] tracking-tighter uppercase leading-none text-[#111111] mb-2">
                {t.contact.title[0]}<span className="text-[#3e5f8a]/50">{t.contact.title[1]}</span>
              </h2>
            </Reveal>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest text-[#3e5f8a] font-black">
                      {t.lang === 'es' ? 'Nombre Completo' : 'Full Name'}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={t.lang === 'es' ? 'Tu nombre' : 'John Doe'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF5EF] border border-[#3e5f8a]/10 rounded-xl px-4 py-2.5 text-xs text-[#111111] placeholder-[#111111]/30 focus:outline-none focus:border-[#3e5f8a]/40 focus:ring-1 focus:ring-[#3e5f8a]/40 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest text-[#3e5f8a] font-black">
                      {t.lang === 'es' ? 'Correo Electrónico' : 'Email Address'}
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="info@hands3d.studio"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF5EF] border border-[#3e5f8a]/10 rounded-xl px-4 py-2.5 text-xs text-[#111111] placeholder-[#111111]/30 focus:outline-none focus:border-[#3e5f8a]/40 focus:ring-1 focus:ring-[#3e5f8a]/40 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest text-[#3e5f8a] font-black">
                      {t.lang === 'es' ? 'Tu Idea / Mensaje' : 'Your Idea'}
                    </label>
                    <textarea 
                      required
                      rows={3}
                      placeholder={t.lang === 'es' ? 'Cuéntanos tu proyecto en 3D...' : 'Describe your digital fabrication project...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF5EF] border border-[#3e5f8a]/10 rounded-xl px-4 py-2 text-xs text-[#111111] placeholder-[#111111]/30 focus:outline-none focus:border-[#3e5f8a]/40 focus:ring-1 focus:ring-[#3e5f8a]/40 transition-all font-medium resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#3e5f8a] text-white rounded-xl font-neue-machina font-black uppercase text-[9px] tracking-widest hover:bg-[#3e5f8a]/90 active:scale-[0.99] transition-all shadow-sm text-center cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting 
                      ? (t.lang === 'es' ? 'ENVIANDO...' : 'SENDING...') 
                      : (t.lang === 'es' ? 'ENVIAR MENSAJE' : 'SEND INQUIRY')}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#FAF5EF] border border-[#3e5f8a]/10 rounded-[20px] p-6 text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-[#3e5f8a]/10 rounded-full flex items-center justify-center mx-auto text-[#3e5f8a]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-space font-black text-lg text-[#111111]">
                    {t.lang === 'es' ? '¡Muchas Gracias!' : 'Thank You!'}
                  </h3>
                  <p className="text-xs text-[#111111]/60 font-medium leading-relaxed">
                    {t.lang === 'es' 
                      ? 'Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo a la brevedad.' 
                      : 'Your inquiry was sent successfully. We will get back to you shortly.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Three high-contrast premium CTAs (WhatsApp, Instagram, Mail) */}
          <div className="w-full md:flex-[0.8] flex flex-col items-center justify-center py-4 border-t md:border-t-0 md:border-l border-black/5 md:pl-16 space-y-5">
            <Reveal>
              <div className="text-center space-y-4">
                <span className="text-[#3e5f8a] text-[8px] font-black uppercase tracking-[0.4em] block">
                  {t.lang === 'es' ? 'CONTACTO RÁPIDO' : 'FAST CONTACT'}
                </span>
                
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  {/* WhatsApp Button */}
                  <motion.a 
                    href="https://wa.me/5493546513432" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, rotate: -1 }} 
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-5 py-3 font-space font-black text-[11px] uppercase shadow-md rounded-[16px] transition-all duration-300 hover:brightness-105"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                    WhatsApp
                  </motion.a>

                  {/* Instagram Button */}
                  <motion.a 
                    href="https://instagram.com/hands3d" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, rotate: 1 }} 
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white px-5 py-3 font-space font-black text-[11px] uppercase shadow-md rounded-[16px] transition-all duration-300 hover:brightness-105"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    Instagram
                  </motion.a>

                  {/* Mail Button */}
                  <motion.a 
                    href="mailto:info@hands3d.studio" 
                    whileHover={{ scale: 1.03, rotate: -0.5 }} 
                    className="flex items-center justify-center gap-3 bg-[#FAF5EF] border border-[#C5A059]/30 text-[#111111] hover:text-white px-5 py-3 font-space font-black text-[11px] uppercase shadow-md rounded-[16px] transition-all duration-300 hover:bg-[#3e5f8a] hover:border-[#3e5f8a]"
                  >
                    <Mail className="w-4 h-4 text-[#C5A059] hover:text-white shrink-0" strokeWidth={2.5} />
                    info@hands3d.studio
                  </motion.a>
                </div>

                <p className="text-[10px] text-[#111111]/50 font-bold tracking-wider uppercase mt-2">
                  {t.lang === 'es' ? 'Respuesta inmediata' : 'Immediate Response'}
                </p>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Footer Area */}
        <div className="w-full pt-4 border-t border-black/5 select-none z-10 shrink-0">
          <footer className="font-outfit text-[7.5px] md:text-[8px] tracking-[0.6em] md:tracking-[0.8em] opacity-35 uppercase font-black text-[#C5A059] leading-loose text-center px-4">
            {t.contact.footer}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
export { ContactSection };
