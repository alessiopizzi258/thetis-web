import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

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
    <div className="py-32 max-w-7xl mx-auto px-6 animate-fade-in text-midnight">
      <div className="mb-24 text-center">
        <span className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold">Multimedia</span>
        <h1 className="text-7xl font-serif italic mt-6">Il racconto visivo.</h1>
        <div className="w-20 h-[1px] bg-gold-custom mx-auto mt-8 opacity-30" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {visioni.map(item => (
          <Link to={`/visioni/${item.id}`} key={item.id} className="group relative overflow-hidden aspect-square bg-midnight shadow-xl">
            <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
              <h3 className="text-white text-2xl font-serif italic">{item.title}</h3>
              <p className="text-gold-custom text-[10px] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Vedi Progetto</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Visioni;