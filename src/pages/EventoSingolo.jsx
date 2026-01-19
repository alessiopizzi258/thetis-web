import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

const EventoSingolo = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('eventi').select('*').eq('id', id).single();
      setEvento(data);
    };
    fetch();
  }, [id]);

  if (!evento) return <div className="h-screen bg-ivory" />;

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-ivory text-midnight">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="animate-fade-in">
          <Link to="/programmazione" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-12">
            <ArrowLeft size={14} /> Torna all'Agenda
          </Link>
          <h1 className="text-6xl font-serif italic leading-tight mb-8">{evento.title}</h1>
          <div className="space-y-6 border-y border-midnight/5 py-10">
            <div className="flex items-center gap-4">
              <Calendar className="text-gold-custom" size={20} />
              <span className="uppercase tracking-widest text-sm font-bold">{evento.date}</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-gold-custom" size={20} />
              <span className="uppercase tracking-widest text-sm font-bold">{evento.location}</span>
            </div>
          </div>
          <p className="mt-10 text-lg font-light leading-loose opacity-70 italic">
            Partecipa a questo appuntamento organizzato dall'associazione Thetis. 
            La cultura è un bene comune che cresce attraverso l'incontro.
          </p>
        </div>
        <div className="shadow-2xl rounded-sm overflow-hidden h-[70vh]">
          <img src={evento.img} className="w-full h-full object-cover" alt={evento.title} />
        </div>
      </div>
    </div>
  );
};

export default EventoSingolo;