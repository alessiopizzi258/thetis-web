import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Visioni = () => {
  const [visioni, setVisioni] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('visioni').select('*').order('created_at', { ascending: false });
      setVisioni(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-24">
        <span className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold">Progetti</span>
        <h1 className="text-6xl md:text-8xl font-serif italic mt-4 text-midnight">Visioni.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visioni.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square group overflow-hidden bg-midnight"
          >
            <Link to={`/visioni/${item.id}`}>
              <img src={item.img} className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-ivory">
                <h3 className="text-2xl font-serif italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <p className="text-[9px] uppercase tracking-widest text-gold-custom mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Esplora Progetto</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Visioni;