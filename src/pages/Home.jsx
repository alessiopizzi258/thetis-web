import VisionCard from '../components/ui/VisionCard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* HERO SECTION FANTASTICA */}
      <section className="relative h-screen w-full flex items-center justify-center bg-midnight overflow-hidden">
        
        {/* Sfondo Animato */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay per contrasto */}
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071" 
            className="w-full h-full object-cover animate-image-zoom opacity-60"
            alt="Thetis Background"
          />
        </div>

        {/* Contenuto con Entrata Scaglionata */}
        <div className="relative z-20 text-center px-6">
          
          {/* Titolo con effetto "Reveal" */}
          <div className="overflow-hidden mb-4">
            <h1 className="text-6xl md:text-[140px] font-serif text-ivory leading-none italic animate-reveal-text">
              L’Arte vive
            </h1>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 className="text-5xl md:text-[100px] font-serif text-gold-custom leading-none animate-reveal-text [animation-delay:0.3s]">
              con Thetis.
            </h1>
          </div>

          {/* Sottotitolo e Bottone */}
          <div className="animate-fade-in-up [animation-delay:1s] opacity-0 [animation-fill-mode:forwards]">
            <p className="max-w-xl mx-auto text-ivory/80 text-lg md:text-xl font-light mb-12 tracking-wide">
              Spazio alla cultura, voce alle idee. <br/>
              Siamo una comunità dedicata alla bellezza.
            </p>
            
            <Link to="/visioni" className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-ivory transition duration-300 ease-out border border-ivory rounded-sm shadow-md">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded bg-gold-custom -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative uppercase tracking-[0.3em] text-xs">Entra nel mondo Thetis</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator Animato */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-50">
          <div className="w-[1px] h-12 bg-ivory mx-auto"></div>
        </div>
      </section>

      {/* IL RESTO DELLE SEZIONI (Citazioni, Visioni, etc.) */}
      <section className="bg-ivory py-32 px-6">
        {/* Sezione Citazione (Filler di impatto) */}
      <div className="max-w-3xl mx-auto">
        <span className="text-4xl font-serif text-gold-custom">“</span>
        <p className="text-3xl md:text-4xl font-serif italic text-midnight leading-snug">
          La cultura non è un lusso, ma una necessità dello spirito umano.
        </p>
        <div className="w-12 h-[1px] bg-gold-custom mx-auto mt-8"></div>
      </div>
    </section>

    {/* Anteprima Visioni con Layout alternato */}
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
        <h2 className="text-5xl font-serif italic">Visioni<br/>Recenti</h2>
        <p className="max-w-md text-slate-500 font-light">
          Esplora gli ultimi progetti multimediali. Dal documentario sociale alla performance d'avanguardia.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <VisionCard title="Echi Mediterranei" description="Performance sonora" image="https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070" />
        <div className="md:mt-20">
          <VisionCard title="Luce Urbana" description="Fotografia sociale" image="https://images.unsplash.com/photo-1449156059586-760c45b6ad5a?q=80&w=2070" />
        </div>
        <VisionCard title="Radici" description="Danza e memoria" image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069" />
      </div>
    </section>

    {/* Sezione Statistiche (Dà corpo alla pagina) */}
    <section className="bg-midnight py-24 text-ivory">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { n: "50+", t: "Eventi l'anno" },
          { n: "12k", t: "Partecipanti" },
          { n: "200", t: "Artisti coinvolti" },
          { n: "15", t: "Progetti attivi" }
        ].map((s, i) => (
          <div key={i}>
            <div className="text-4xl font-serif text-gold-custom mb-2">{s.n}</div>
            <div className="text-[10px] uppercase tracking-widest opacity-60">{s.t}</div>
          </div>
        ))}
      </div>
          {/* ... qui inserisci le sezioni di prima ... */}
      </section>
    </div>
  );
};

    

export default Home;