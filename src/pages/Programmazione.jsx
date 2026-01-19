import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Programmazione = () => {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('eventi').select('*').order('created_at', { ascending: false });
      setEventi(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="h-screen bg-ivory" />;

  return (
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <span className="text-gold-custom tracking-[0.4em] uppercase text-[10px] font-bold">Agenda</span>
        <h1 className="text-6xl md:text-8xl font-serif italic mt-4 text-midnight">Programmazione.</h1>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {eventi.map((ev, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            key={ev.id}
          >
            <Link to={`/programmazione/${ev.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 rounded-sm shadow-2xl">
                <img 
                  src={ev.img} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out" 
                />
                <div className="absolute inset-0 bg-midnight/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-serif italic text-midnight group-hover:text-gold-custom transition-colors">{ev.title}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mt-2">{ev.location}</p>
                </div>
                <span className="text-gold-custom font-mono text-xs">{ev.date}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Programmazione;