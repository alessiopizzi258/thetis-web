import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, MapPin, Calendar, Share2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventoSingolo = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('eventi').select('*').eq('id', id).single();
      if (!error) setEvento(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="h-screen bg-[#F9F8F6] flex items-center justify-center italic font-serif opacity-30">Caricamento evento...</div>;
  if (!evento) return <div className="h-screen bg-[#F9F8F6] flex items-center justify-center"><Link to="/programmazione" className="font-serif italic border-b border-black">Torna all'agenda.</Link></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-24 px-6 min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link to="/programmazione" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-12 hover:-translate-x-2 transition-transform">
              <ArrowLeft size={14} /> Torna all'Agenda
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif italic leading-[1.1] mb-8">{evento.title}</h1>
            <div className="space-y-6 border-y border-black/5 py-10">
              <div className="flex items-center gap-4">
                <Calendar className="text-[#D4AF37]" size={20} strokeWidth={1.5} />
                <span className="uppercase tracking-[0.1em] text-sm font-bold">{evento.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-[#D4AF37]" size={20} strokeWidth={1.5} />
                <span className="uppercase tracking-[0.1em] text-sm font-bold">{evento.location}</span>
              </div>
            </div>
            <p className="mt-10 text-lg font-light leading-loose opacity-70 italic font-serif">
              {evento.desc_text || "Partecipa a questo appuntamento organizzato dall'associazione Thetis."}
            </p>
          </motion.div>

          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="shadow-2xl rounded-sm overflow-hidden h-[60vh] md:h-[70vh] relative group">
            <img src={evento.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={evento.title} />
          </motion.div>
        </div>

        {/* --- SEZIONE GALLERIA MULTIPLA --- */}
        {evento.gallery && evento.gallery.length > 0 && (
          <section className="pt-24 border-t border-black/5">
            <h2 className="font-serif italic text-3xl mb-12 text-center">Momenti dell'incontro</h2>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {evento.gallery.map((url, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="relative group cursor-zoom-in break-inside-avoid shadow-lg" onClick={() => setSelectedImg(url)}>
                  <img src={url} alt={`Gallery ${i}`} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" size={24} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[300] bg-white/95 backdrop-blur-md flex items-center justify-center p-4">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImg} className="max-w-full max-h-full object-contain shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventoSingolo;