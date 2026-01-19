import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ArticoloSingolo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    supabase.from('articoli').select('*').eq('id', id).single().then(({ data }) => setData(data));
  }, [id]);

  if (!data) return <div className="h-screen bg-ivory" />;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-40 pb-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <Link to="/articoli" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-16 hover:-translate-x-2 transition-transform">
          <ArrowLeft size={14} /> La Ginestra
        </Link>

        <header className="mb-20 text-center md:text-left">
          <span className="text-gold-custom font-mono text-xs uppercase tracking-widest">{new Date(data.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-midnight mt-4 mb-10 leading-[1.1]">{data.titolo}</h1>
          <p className="text-2xl text-slate-500 font-serif italic border-l-4 border-gold-custom/20 pl-8 py-2">{data.abstract}</p>
        </header>

        <img src={data.image_url} className="w-full aspect-video object-cover mb-20 shadow-2xl" />

        <div className="prose prose-slate prose-xl max-w-none font-serif leading-loose text-midnight/80 whitespace-pre-wrap first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-gold-custom">
          {data.contenuto}
        </div>

        <footer className="mt-32 pt-12 border-t border-midnight/5 flex justify-between items-center opacity-40 text-[10px] font-bold uppercase tracking-widest">
          <span>Thetis APS — Cultura Critica</span>
          <Share2 size={16} className="cursor-pointer hover:text-gold-custom" />
        </footer>
      </div>
    </motion.div>
  );
};

export default ArticoloSingolo;