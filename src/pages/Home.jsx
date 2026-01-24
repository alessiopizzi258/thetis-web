import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
import VisionCard from '../components/ui/VisionCard';
import { Reveal } from '../components/ui/Reveal';

const Home = () => {
  const [latestVisioni, setLatestVisioni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestData = async () => {
      // Recuperiamo le ultime 3 visioni caricate dinamicamente
      const { data, error } = await supabase
        .from('visioni')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (!error) setLatestVisioni(data || []);
      setLoading(false);
    };
    fetchLatestData();
  }, []);

  return (
    <div className="overflow-hidden bg-ivory">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center bg-midnight overflow-hidden">
        
        {/* Sfondo Dinamico con Zoom Animato */}
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-midnight z-10" /> 
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Thetis Vision"
          />
        </motion.div>

        {/* Contenuto Hero */}
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold mb-8 block"
          >
            Associazione Socio-Culturale
          </motion.span>

          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[140px] font-serif text-ivory leading-none italic"
            >
              L’Arte vive
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[100px] font-serif text-gold-custom leading-none"
            >
              con Thétis.
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center"
          >
            <p className="max-w-2xl mx-auto text-ivory/80 text-lg md:text-xl font-serif italic mb-12 tracking-wide leading-relaxed">
              "Ricerca, cultura e sociale: un ponte tra la tradizione e <br className="hidden md:block"/> l'impegno collettivo per il territorio."
            </p>
            
            <Link to="/visioni" className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-ivory transition duration-300 ease-out border border-ivory/30 rounded-sm shadow-md hover:border-gold-custom">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded bg-gold-custom -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative uppercase tracking-[0.3em] text-[10px]">Entra nel mondo Thetis</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-ivory to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* --- SEZIONE IN EVIDENZA: PROGETTO AIRC --- */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                alt="AIRC Project"
              />
              <div className="absolute top-6 left-6 bg-gold-custom text-ivory px-4 py-2 text-[8px] uppercase font-bold tracking-[0.2em]">
                Progetto Solidale
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="space-y-8">
              <Heart className="text-gold-custom" size={32} strokeWidth={1.5} />
              <h2 className="text-5xl md:text-6xl font-serif italic text-midnight leading-tight">
                Vesti la vita, <br/> annoda il cancro.
              </h2>
              <p className="text-lg text-midnight/60 font-light leading-relaxed">
                Dal 2021 sosteniamo la ricerca con il progetto autorizzato da <strong>Fondazione AIRC</strong>. 
                Un impegno che unisce creatività e solidarietà, girato e raccontato tra le persone e il cuore della Calabria.
              </p>
              <div className="pt-6">
                <Link to="/visioni" className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-midnight group">
                  Scopri il progetto <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- ANTEPRIMA VISIONI DINAMICHE --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-gold-custom tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">Archivio</span>
              <h2 className="text-6xl font-serif italic text-midnight">Visioni<br/>Recenti</h2>
            </div>
            <Link to="/visioni" className="text-midnight/40 hover:text-gold-custom transition-colors uppercase text-[10px] tracking-widest font-bold">
              Esplora tutta la gallery
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {loading ? (
             <div className="col-span-3 text-center py-20 italic opacity-20">Caricamento progetti...</div>
          ) : (
            latestVisioni.map((item, index) => (
              <div key={item.id} className={index === 1 ? "md:mt-32" : ""}>
                <Reveal delay={index * 0.2}>
                  <VisionCard 
                    title={item.title} 
                    description={item.anno || "Progetto Multimediale"} 
                    image={item.img} 
                    link={`/visioni/${item.id}`}
                  />
                </Reveal>
              </div>
            ))
          )}
        </div>
      </section>

      {/* --- STATISTICHE DINAMICHE (Basate sulla missione Thétis) --- */}
      <section className="bg-midnight py-32 text-ivory">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 text-center">
          {[
            { n: "7", t: "Soci Fondatori" },
            { n: "2021", t: "Inizio Progetto AIRC" },
            { n: "3", t: "Fiabe negli Asili" },
            { n: "1", t: "Panchina Rossa" }
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group">
                <div className="text-5xl font-serif text-gold-custom mb-3 group-hover:scale-110 transition-transform duration-500">{s.n}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">{s.t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- CTA FINALE --- */}
      <section className="py-40 px-6 text-center bg-white">
        <Reveal>
          <Sparkles className="mx-auto mb-8 text-gold-custom/40" size={40} />
          <h2 className="text-5xl md:text-7xl font-serif italic mb-12 text-midnight max-w-4xl mx-auto leading-tight">
            Partecipa alla cultura. <br/> Raccontiamo insieme il territorio.
          </h2>
          <Link to="/chi-siamo" className="text-[10px] uppercase tracking-[0.5em] font-bold text-midnight border-b border-gold-custom pb-4 hover:text-gold-custom transition-colors">
            Conosci i soci e la missione
          </Link>
        </Reveal>
      </section>

    </div>
  );
};

export default Home;