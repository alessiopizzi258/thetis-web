import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VisionCard from '../components/ui/VisionCard';
import { Reveal } from '../components/ui/Reveal'; // Assicurati di aver creato questo componente

const Home = () => {
  return (
    <div className="overflow-hidden bg-ivory">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center bg-midnight overflow-hidden">
        
        {/* Sfondo con Zoom Animato */}
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> 
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071" 
            className="w-full h-full object-cover"
            alt="Thetis Background"
          />
        </motion.div>

        {/* Contenuto Hero */}
        <div className="relative z-20 text-center px-6">
          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[140px] font-serif text-ivory leading-none italic"
            >
              L’Arte vive
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[100px] font-serif text-gold-custom leading-none"
            >
              con Thetis.
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center"
          >
            <p className="max-w-xl mx-auto text-ivory/80 text-lg md:text-xl font-light mb-12 tracking-wide leading-relaxed">
              Spazio alla cultura, voce alle idee. <br/>
              Siamo una comunità dedicata alla bellezza e al pensiero critico.
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

      {/* --- SEZIONE CITAZIONE --- */}
      <section className="bg-ivory py-40 px-6 text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <span className="text-6xl font-serif text-gold-custom opacity-30 block mb-8">“</span>
            <p className="text-3xl md:text-5xl font-serif italic text-midnight leading-tight">
              La cultura non è un lusso, ma una necessità <br className="hidden md:block"/> dello spirito umano.
            </p>
            <div className="w-16 h-[1px] bg-gold-custom mx-auto mt-12 opacity-50"></div>
          </div>
        </Reveal>
      </section>

      {/* --- ANTEPRIMA VISIONI --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-gold-custom tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">Archivio</span>
              <h2 className="text-6xl font-serif italic text-midnight">Visioni<br/>Recenti</h2>
            </div>
            <p className="max-w-md text-slate-500 font-light text-lg leading-relaxed">
              Esplora gli ultimi progetti multimediali. Dal documentario sociale alla performance d'avanguardia che scuote l'anima.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <Reveal delay={0.2}>
            <VisionCard title="Echi Mediterranei" description="Performance sonora" image="https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070" />
          </Reveal>
          
          <div className="md:mt-32">
            <Reveal delay={0.4}>
              <VisionCard title="Luce Urbana" description="Fotografia sociale" image="https://images.unsplash.com/photo-1449156059586-760c45b6ad5a?q=80&w=2070" />
            </Reveal>
          </div>
          
          <Reveal delay={0.6}>
            <VisionCard title="Radici" description="Danza e memoria" image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069" />
          </Reveal>
        </div>
      </section>

      {/* --- STATISTICHE --- */}
      <section className="bg-midnight py-32 text-ivory">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {[
            { n: "50+", t: "Eventi l'anno" },
            { n: "12k", t: "Partecipanti" },
            { n: "200", t: "Artisti coinvolti" },
            { n: "15", t: "Progetti attivi" }
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
          <h2 className="text-5xl md:text-7xl font-serif italic mb-12 text-midnight">Partecipa al cambiamento.</h2>
          <Link to="/chi-siamo" className="text-[10px] uppercase tracking-[0.5em] font-bold text-midnight border-b border-gold-custom pb-4 hover:text-gold-custom transition-colors">
            Scopri chi siamo
          </Link>
        </Reveal>
      </section>

    </div>
  );
};

export default Home;