import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

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
    <div className="py-24 max-w-7xl mx-auto px-6 animate-fade-in text-midnight">
      <div className="mb-20">
        <span className="text-gold-custom tracking-[0.3em] uppercase text-xs font-bold">Agenda</span>
        <h1 className="text-5xl font-serif mb-6 italic mt-2">Prossimi appuntamenti.</h1>
        <p className="text-slate-500 text-lg font-light max-w-xl">
          Sfoglia le locandine e scopri cosa abbiamo in programma. Ogni evento è
          un’occasione per incontrarsi e far circolare nuova cultura.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {eventi.map(ev => (
          <div key={ev.id} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4] shadow-2xl rounded-sm">
              <img 
                src={ev.img || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070'} 
                alt={ev.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-midnight/20 group-hover:bg-midnight/0 transition-colors"></div>
            </div>
            <div className="mt-8">
              <span className="text-gold-custom font-mono text-sm tracking-tighter">
                {ev.date} — {ev.location}
              </span>
              <h3 className="text-3xl font-serif italic mt-2 group-hover:text-gold-custom transition-colors">
                {ev.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programmazione;