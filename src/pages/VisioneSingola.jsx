import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft } from 'lucide-react';

const VisioneSingola = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('visioni').select('*').eq('id', id).single();
      setData(data);
    };
    fetch();
  }, [id]);

  if (!data) return <div className="h-screen bg-midnight" />;

  return (
    <div className="bg-midnight min-h-screen text-ivory pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/visioni" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-16">
          <ArrowLeft size={14} /> Archivio Visioni
        </Link>
        
        <div className="aspect-video w-full shadow-2xl mb-16 bg-black/20">
          <img src={data.img} className="w-full h-full object-cover rounded-sm" alt={data.title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 border-r border-ivory/10">
            <h1 className="text-4xl font-serif italic pr-6">{data.title}</h1>
            <p className="text-gold-custom text-[10px] uppercase tracking-widest mt-4">Documentazione Visiva</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl font-light leading-relaxed opacity-60 font-serif">
              {data.desc_text}
            </p>
            <div className="mt-12 w-10 h-[1px] bg-gold-custom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisioneSingola;