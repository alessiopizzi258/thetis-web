import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const Programmazione = () => {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventi = async () => {
      const { data, error } = await supabase
        .from('eventi')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setEventi(data);
      setLoading(false);
    };
    fetchEventi();
  }, []);

  if (loading) return <div className="h-screen bg-ivory" />;

  return (
    <div className="py-32 max-w-7xl mx-auto px-6 animate-fade-in text-midnight">
      <div className="mb-24">
        <span className="text-gold-custom tracking-[0.4em] uppercase text-[10px] font-bold">Agenda</span>
        <h1 className="text-6xl font-serif italic mt-4">Prossimi appuntamenti.</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {eventi.map(ev => (
          <Link to={`/programmazione/${ev.id}`} key={ev.id} className="group block">
            <div className="relative overflow-hidden aspect-[4/5] shadow-2xl rounded-sm">
              <img 
                src={ev.img || 'https://images.unsplash.com/photo-1459749411177-042180ce673c'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-midnight/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="mt-10 border-l border-gold-custom/30 pl-6">
              <p className="text-gold-custom font-mono text-xs uppercase tracking-widest">
                {ev.date} — {ev.location}
              </p>
              <h3 className="text-4xl font-serif italic mt-3 group-hover:text-gold-custom transition-colors">
                {ev.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Programmazione;