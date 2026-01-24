import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const Visioni = () => {
  const [visioni, setVisioni] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('visioni').select('*').order('created_at', { ascending: false });
      setVisioni(data || []);
    };
    fetch();
  }, []);

  const filteredItems = visioni.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.anno?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8">
        <div>
          <span className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold">Progetti</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mt-4 text-midnight">Visioni.</h1>
        </div>
        <div className="w-full max-w-xs relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-midnight/20 group-focus-within:text-gold-custom transition-colors" size={14} />
          <input 
            type="text"
            placeholder="Cerca progetti o anni..."
            className="w-full bg-transparent border-b border-black/10 py-2 pl-6 outline-none focus:border-gold-custom font-serif italic text-sm"
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage + searchTerm} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 col-span-full">
            {currentItems.length > 0 ? currentItems.map((item) => (
              <motion.div key={item.id} className="relative aspect-square group overflow-hidden bg-midnight shadow-2xl">
                <Link to={`/visioni/${item.id}`}>
                  <img src={item.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-30 group-hover:scale-110 transition-all duration-[1.5s]" alt="" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-ivory">
                    <h3 className="text-2xl font-serif italic translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-4 h-[1px] bg-gold-custom"></span>
                      <p className="text-[9px] uppercase tracking-widest text-gold-custom font-bold">Vedi Visione</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : <p className="col-span-full text-center opacity-30 italic font-serif py-20">Nessun progetto trovato.</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="mt-32 flex justify-center items-center gap-4 border-t border-black/10 pt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`w-10 h-10 flex items-center justify-center rounded-full border text-[10px] font-bold transition-all ${currentPage === i + 1 ? 'bg-black text-white border-black scale-110' : 'border-black/10 hover:border-gold-custom'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Visioni;