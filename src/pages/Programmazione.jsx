import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar } from 'lucide-react';

const Programmazione = () => {
  const [eventi, setEventi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Aumentato perché le schede sono più piccole

  useEffect(() => {
    const fetch = async () => {
      // ORDINAMENTO CRONOLOGICO: dal più vicino nel futuro al più lontano nel passato
      const { data } = await supabase
        .from('eventi')
        .select('*')
        .order('date_db', { ascending: false }); 
      
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
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 min-h-screen bg-[#F9F8F6]">
      
      {/* HEADER & SEARCH COMPATTO */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <span className="text-gold-custom tracking-[0.5em] uppercase text-[9px] font-bold">Agenda Eventi</span>
          <h1 className="text-5xl md:text-7xl font-serif italic mt-2 text-midnight">Programmazione.</h1>
        </div>
        
        <div className="w-full max-w-xs relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-midnight/20 group-focus-within:text-gold-custom" size={14} />
          <input 
            type="text"
            placeholder="Cerca evento..."
            className="w-full bg-transparent border-b border-black/10 py-2 pl-6 outline-none focus:border-gold-custom font-serif italic text-sm transition-all"
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      
      {/* GRIGLIA EVENTI - 3 COLONNE (SCHEDE PIÙ PICCOLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage + searchTerm} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full"
          >
            {currentItems.length > 0 ? currentItems.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/programmazione/${ev.id}`} className="group block bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm">
                  {/* Immagine con altezza fissa più contenuta */}
                  <div className="relative h-64 overflow-hidden mb-6 bg-midnight/5">
                    <img 
                      src={ev.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                      alt={ev.title} 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1">
                        <Calendar size={12} /> {ev.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-serif italic text-midnight group-hover:text-gold-custom transition-colors duration-500 leading-tight line-clamp-2 min-h-[3rem]">
                      {ev.title}
                    </h3>
                    
                    <div className="pt-2 border-t border-black/5 flex items-center gap-2 text-[9px] uppercase tracking-widest text-midnight/40 font-bold">
                      <MapPin size={10} /> {ev.location}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center italic opacity-30 font-serif">Nessun risultato trovato.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINAZIONE NUMERICA IDENTICA AD ARTICOLI */}
      {totalPages > 1 && (
        <div className="mt-24 flex justify-center items-center gap-3 border-t border-black/5 pt-12">
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => { 
                setCurrentPage(i + 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-500 ${
                currentPage === i + 1 
                  ? 'bg-black text-white border-black scale-110 shadow-lg' 
                  : 'bg-white border-black/10 text-midnight hover:border-gold-custom'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Programmazione;