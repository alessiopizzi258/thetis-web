import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VisioneSingola = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('visioni').select('*').eq('id', id).single();
      setData(data);
    };
    fetch();
  }, [id]);

  if (!data) return <div className="h-screen bg-midnight flex items-center justify-center text-ivory/20 italic font-serif">Caricamento visione...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-midnight min-h-screen text-ivory pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigazione */}
        <Link to="/visioni" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-16 hover:-translate-x-2 transition-transform">
          <ArrowLeft size={14} /> Archivio Visioni
        </Link>
        
        {/* Immagine Hero */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="aspect-video w-full shadow-2xl mb-24 bg-black/40 overflow-hidden">
          <img src={data.img} className="w-full h-full object-cover" alt={data.title} />
        </motion.div>

        {/* Info Progetto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
          
          {/* Colonna Tecnica */}
          <div className="md:col-span-1 border-r border-ivory/10 space-y-10 pr-10">
            <div>
              <h1 className="text-5xl font-serif italic leading-tight mb-4">{data.title}</h1>
              <div className="h-[1px] w-12 bg-gold-custom" />
            </div>

            <div className="space-y-6 pt-4">
              {data.anno && (
                <div>
                  <span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Periodo</span>
                  <span className="text-sm font-serif italic text-gold-custom">{data.anno}</span>
                </div>
              )}
              {data.curatore && (
                <div>
                  <span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">A cura di</span>
                  <span className="text-sm font-serif italic">{data.curatore}</span>
                </div>
              )}
              {data.crediti && (
                <div>
                  <span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Crediti</span>
                  <span className="text-xs opacity-70 leading-relaxed uppercase tracking-tighter">{data.crediti}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Colonna Narrativa */}
          <div className="md:col-span-2">
            <p className="text-2xl font-light leading-relaxed opacity-80 font-serif whitespace-pre-wrap">
              {data.desc_text}
            </p>
          </div>
        </div>

        {/* Galleria Mosaico */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="pt-24 border-t border-ivory/10">
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-12 text-center">Documentazione Visiva</span>
            <div className="columns-1 md:columns-3 gap-8 space-y-8">
              {data.gallery.map((url, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-zoom-in break-inside-avoid shadow-2xl"
                  onClick={() => setSelectedImg(url)}
                >
                  <img src={url} alt={`Dettaglio ${i}`} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 rounded-sm" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-gold-custom" size={24} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox per ingrandire le foto */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={selectedImg} className="max-w-full max-h-full object-contain" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VisioneSingola;