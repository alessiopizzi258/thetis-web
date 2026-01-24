import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const Articoli = () => {
  const [articoli, setArticoli] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('articoli').select('*').order('created_at', { ascending: false });
      setArticoli(data || []);
    };
    fetch();
  }, []);

  // Logica Ricerca
  const filteredItems = articoli.filter(art => 
    art.titolo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    art.abstract?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <div className="text-center mb-16 relative">
        <h1 className="text-7xl md:text-8xl font-serif italic text-midnight mb-6">La Ginestra</h1>
        <p className="uppercase tracking-[0.6em] text-gold-custom text-[10px] font-bold">Rivista di Pensiero Critico</p>
      </div>

      {/* BARRA DI RICERCA */}
      <div className="max-w-md mx-auto mb-24 relative group">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-midnight/20 group-focus-within:text-gold-custom transition-colors" size={16} />
        <input 
          type="text"
          placeholder="Cerca nella rivista..."
          className="w-full bg-transparent border-b border-black/10 py-3 pl-8 outline-none focus:border-gold-custom font-serif italic transition-all"
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      <div className="grid grid-cols-1 gap-24">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage + searchTerm} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-32">
            {currentItems.length > 0 ? currentItems.map((art) => (
              <motion.article key={art.id} className="group">
                <Link to={`/articoli/${art.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <div className="md:col-span-7">
                    <h2 className="text-4xl md:text-5xl font-serif italic text-midnight group-hover:text-gold-custom transition-colors duration-500">{art.titolo}</h2>
                    <p className="text-slate-500 mt-6 text-lg font-light leading-relaxed line-clamp-3">{art.abstract}</p>
                    <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold"><span className="w-8 h-[1px] bg-gold-custom"></span>Leggi l'articolo</div>
                  </div>
                  <div className="md:col-span-5 aspect-[4/3] overflow-hidden shadow-2xl">
                    <img src={art.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt="" />
                  </div>
                </Link>
              </motion.article>
            )) : <p className="text-center opacity-30 italic font-serif py-20">Nessun articolo trovato.</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINAZIONE */}
      {totalPages > 1 && (
        <div className="mt-32 flex justify-center items-center gap-4 border-t border-black/10 pt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`w-10 h-10 flex items-center justify-center rounded-full border text-[10px] font-bold transition-all ${currentPage === i + 1 ? 'bg-black text-white border-black' : 'border-black/10 hover:border-gold-custom'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articoli;