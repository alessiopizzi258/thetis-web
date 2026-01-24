import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const Programmazione = () => {
  const [eventi, setEventi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('eventi').select('*').order('created_at', { ascending: false });
      setEventi(data || []);
    };
    fetch();
  }, []);

  const filteredItems = eventi.filter(ev => 
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ev.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8">
        <div>
          <span className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold">Agenda</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mt-4 text-midnight">Programmazione.</h1>
        </div>
        <div className="w-full max-w-xs relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-midnight/20 group-focus-within:text-gold-custom transition-colors" size={14} />
          <input 
            type="text"
            placeholder="Cerca per titolo o luogo..."
            className="w-full bg-transparent border-b border-black/10 py-2 pl-6 outline-none focus:border-gold-custom font-serif italic text-sm"
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage + searchTerm} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-16 col-span-full">
            {currentItems.length > 0 ? currentItems.map((ev) => (
              <Link key={ev.id} to={`/programmazione/${ev.id}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden mb-8 shadow-2xl relative">
                  <img src={ev.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt="" />
                </div>
                <h3 className="text-3xl font-serif italic text-midnight group-hover:text-gold-custom transition-colors">{ev.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gold-custom font-bold mt-4">{ev.date} — {ev.location}</p>
              </Link>
            )) : <p className="col-span-full text-center opacity-30 italic font-serif">Nessun evento trovato.</p>}
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

export default Programmazione;