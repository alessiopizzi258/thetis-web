import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CalendarDays } from 'lucide-react';

const Programmazione = () => {
  const [eventi, setEventi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Cambiato da 2 a 4 come richiesto

  useEffect(() => {
    const fetch = async () => {
      // Ordiniamo per data di creazione decrescente: 
      // Gli ultimi eventi aggiunti (i più nuovi/imminenti) appaiono per primi
      const { data } = await supabase
        .from('eventi')
        .select('*')
        .order('created_at', { ascending: false }); 
      
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
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="relative">
          <span className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold">Agenda</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mt-4 text-midnight leading-none">
            Programmazione<span className="text-gold-custom">.</span>
          </h1>
        </div>
        
        <div className="w-full max-w-xs relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-midnight/20 group-focus-within:text-gold-custom transition-colors" size={14} />
          <input 
            type="text"
            placeholder="Cerca evento o località..."
            className="w-full bg-transparent border-b border-black/10 py-2 pl-6 outline-none focus:border-gold-custom font-serif italic text-sm transition-all"
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      
      {/* GRIGLIA EVENTI (4 CARD PER PAGINA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage + searchTerm} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 col-span-full"
          >
            {currentItems.length > 0 ? currentItems.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/programmazione/${ev.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-2xl bg-midnight/5">
                    {/* Badge Imminente (Opzionale per il primo della lista) */}
                    {currentPage === 1 && idx === 0 && !searchTerm && (
                      <div className="absolute top-4 left-4 z-10 bg-gold-custom text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg">
                        Prossimo Incontro
                      </div>
                    )}
                    
                    <img 
                      src={ev.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out" 
                      alt={ev.title} 
                    />
                    <div className="absolute inset-0 bg-midnight/5 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gold-custom font-mono text-[10px] uppercase tracking-tighter">
                      <CalendarDays size={12} strokeWidth={1.5} />
                      {ev.date}
                    </div>
                    <h3 className="text-3xl font-serif italic text-midnight group-hover:text-gold-custom transition-colors duration-500 leading-tight">
                      {ev.title}
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-midnight/30">
                      {ev.location}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <div className="col-span-full py-32 text-center">
                <p className="opacity-30 italic font-serif text-xl">Nessun evento trovato in questa categoria.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINAZIONE NUMERICA CIRCOLARE */}
      {totalPages > 1 && (
        <div className="mt-40 flex justify-center items-center gap-6 border-t border-black/5 pt-12">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30 mr-4">Pagine</span>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => { 
                setCurrentPage(i + 1); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className={`w-12 h-12 flex items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-500 shadow-sm ${
                currentPage === i + 1 
                  ? 'bg-midnight text-ivory border-midnight scale-110 shadow-gold-custom/20' 
                  : 'bg-white border-black/10 text-midnight hover:border-gold-custom hover:text-gold-custom'
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Programmazione;