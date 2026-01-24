import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ArticoloSingolo = () => {
  const { id } = useParams();
  const [articolo, setArticolo] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    supabase.from('articoli').select('*').eq('id', id).single()
      .then(({ data }) => {
        if (data) {
          // Proviamo a parsare il contenuto come JSON, se fallisce lo trattiamo come testo normale
          try {
            data.blocchi = JSON.parse(data.contenuto);
          } catch (e) {
            data.blocchi = [{ tipo: 'testo', valore: data.contenuto }];
          }
          setArticolo(data);
        }
      });
  }, [id]);

  if (!articolo) return <div className="h-screen bg-white" />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/articoli" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-16 hover:-translate-x-2 transition-transform">
          <ArrowLeft size={14} /> Torna all'archivio
        </Link>

        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-serif italic text-[#1A1A1A] mb-10 leading-tight">{articolo.titolo}</h1>
          <div className="h-[1px] w-20 bg-[#D4AF37] mb-10"></div>
        </header>

        {/* RENDERING SEQUENZIALE DEI BLOCCHI */}
        <div className="article-body">
          {articolo.blocchi.map((blocco, idx) => (
            blocco.tipo === 'testo' ? (
              <p key={idx} className="font-serif text-xl leading-loose text-[#1A1A1A]/80 mb-8 whitespace-pre-wrap">
                {blocco.valore}
              </p>
            ) : (
              <motion.figure 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="my-16 -mx-4 md:-mx-12 group"
              >
                <img 
                  src={blocco.valore} 
                  className="w-full h-auto cursor-zoom-in shadow-lg" 
                  onClick={() => setSelectedImg(blocco.valore)}
                />
              </motion.figure>
            )
          ))}
        </div>

        <footer className="mt-32 pt-12 border-t border-black/5 flex justify-between items-center opacity-40 text-[10px] font-bold uppercase tracking-widest">
          <span>Thetis APS — Cultura Critica</span>
          <Share2 size={16} className="cursor-pointer hover:text-[#D4AF37]" />
        </footer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10"><X size={32} strokeWidth={1} /></button>
            <img src={selectedImg} className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticoloSingolo;