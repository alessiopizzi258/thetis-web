import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VisionCard from '../components/ui/VisionCard';

const Visioni = () => {
  const [galleria, setGalleria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisioni = async () => {
      const { data, error } = await supabase
        .from('visioni')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setGalleria(data);
      setLoading(false);
    };
    fetchVisioni();
  }, []);

  if (loading) return <div className="h-screen bg-ivory" />;

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 animate-fade-in text-midnight">
      <div className="mb-20 max-w-2xl">
        <span className="text-gold-custom tracking-[0.4em] uppercase text-[10px] font-bold">Multimedia</span>
        <h1 className="text-5xl font-serif mb-6 italic mt-2">Il racconto visivo.</h1>
        <p className="text-slate-500 text-lg font-light leading-relaxed">
          Qui raccogliamo le storie, le interviste e i momenti più belli dei nostri
          progetti. Un archivio dinamico per rivivere insieme le emozioni dei nostri
          incontri.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {galleria.map(item => (
          <VisionCard 
            key={item.id} 
            title={item.title} 
            description={item.desc_text} 
            image={item.img || 'https://images.unsplash.com/photo-1494173853114-c284ba9a74d4?q=80&w=2000'} 
          />
        ))}
      </div>
    </div>
  );
};

export default Visioni;