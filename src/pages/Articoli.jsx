import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Articoli = () => {
  const [articoli, setArticoli] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('articoli').select('*').order('created_at', { ascending: false });
      setArticoli(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="pt-40 pb-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-32 relative">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} className="absolute -top-20 left-1/2 -translate-x-1/2 text-[15rem] font-serif italic pointer-events-none">T</motion.div>
        <h1 className="text-7xl md:text-8xl font-serif italic text-midnight mb-6 relative z-10">La Ginestra</h1>
        <div className="w-20 h-[1px] bg-gold-custom mx-auto mb-6"></div>
        <p className="uppercase tracking-[0.6em] text-gold-custom text-[10px] font-bold font-sans">Rivista di Pensiero Critico</p>
      </div>

      <div className="space-y-32">
        {articoli.map((art) => (
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            key={art.id} 
            className="group"
          >
            <Link to={`/articoli/${art.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <span className="text-[10px] font-mono text-gold-custom mb-4 block uppercase">
                  {new Date(art.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-midnight mb-6 group-hover:text-gold-custom transition-colors duration-500 leading-tight">
                  {art.titolo}
                </h2>
                <p className="text-slate-500 font-light text-lg leading-relaxed mb-8 line-clamp-3">
                  {art.abstract}
                </p>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-gold-custom/30 pb-2 group-hover:border-gold-custom transition-all">Leggi l'articolo</span>
              </div>
              <div className="md:col-span-5 aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src={art.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Articoli;