import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ArticleCard from '../components/ui/ArticleCard';

const Articoli = () => {
  const [articoli, setArticoli] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticoli = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('articoli')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) {
        // Mappiamo i dati di Supabase per adattarli alle props di ArticleCard
        const articoliFormattati = data.map(art => ({
          id: art.id,
          // Formattiamo la data in modo leggibile (es: "15 Gen 2026")
          date: new Date(art.created_at).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          title: art.titolo,
          abstract: art.abstract,
          img: art.image_url, // Se ArticleCard supporta l'immagine
          tags: ["Cultura"] // Qui puoi aggiungere una colonna tag su DB se vuoi renderli dinamici
        }));
        setArticoli(articoliFormattati);
      }
      setLoading(false);
    };

    fetchArticoli();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-ivory flex items-center justify-center">
        <div className="text-gold-custom font-serif italic animate-pulse">Caricamento articoli...</div>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-4xl mx-auto px-6 animate-fade-in text-midnight">
      {/* Header Rivista */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12 text-gold-custom/10 text-9xl font-serif italic select-none">
          Thetis
        </div>
        <h1 className="text-7xl font-serif italic mb-4 relative z-10">La Ginestra</h1>
        <div className="w-24 h-[1px] bg-gold-custom mx-auto mb-6"></div>
        <p className="uppercase tracking-[0.5em] text-gold-custom text-[10px] font-bold">
          Rivista di Pensiero Critico
        </p>
      </div>
      
      {/* Lista Articoli */}
      <div className="space-y-16">
        {articoli.length === 0 ? (
          <p className="text-center italic text-slate-400 py-10">Nessun articolo pubblicato al momento.</p>
        ) : (
          articoli.map(art => (
            <ArticleCard key={art.id} {...art} />
          ))
        )}
      </div>
    </div>
  );
};

export default Articoli;