import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

const ArticoloSingolo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await supabase.from('articoli').select('*').eq('id', id).single();
      setData(data);
    };
    fetchItem();
  }, [id]);

  if (!data) return <div className="h-screen bg-ivory" />;

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-ivory">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/articoli" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Torna Indietro
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-4 text-midnight/40 text-[10px] uppercase tracking-widest font-bold mb-6">
            <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(data.created_at).toLocaleDateString('it-IT')}</span>
            <span>—</span>
            <span className="text-gold-custom italic">La Ginestra</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic text-midnight leading-[1.1] mb-8 italic">
            {data.titolo}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed italic border-l-4 border-gold-custom/30 pl-8">
            {data.abstract}
          </p>
        </header>

        {/* Featured Image */}
        {data.image_url && (
          <div className="mb-20 aspect-video overflow-hidden shadow-2xl">
            <img src={data.image_url} className="w-full h-full object-cover" alt={data.titolo} />
          </div>
        )}

        {/* Body Content */}
        <div className="prose prose-slate max-w-none">
          <div className="font-serif text-lg md:text-xl leading-loose text-midnight/80 whitespace-pre-wrap">
            {data.contenuto}
          </div>
        </div>

        {/* Footer Article */}
        <footer className="mt-32 pt-12 border-t border-midnight/5 flex justify-between items-center">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 italic">© Thetis — Progetto Cultura</div>
          <button className="text-gold-custom hover:text-midnight transition-colors"><Share2 size={18}/></button>
        </footer>
      </div>
    </div>
  );
};

export default ArticoloSingolo;