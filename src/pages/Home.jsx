import VisionCard from '../components/ui/VisionCard';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="relative h-screen flex items-center justify-center bg-midnight text-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071')] bg-cover bg-center animate-subtle-zoom" />
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <span className="inline-block mb-4 text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold">Thetis APS</span>
        <h1 className="text-6xl md:text-[120px] font-serif mb-8 leading-none italic">L’Arte vive.</h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl font-light mb-12 opacity-80 leading-relaxed">
          Spazio alla cultura, voce alle idee. Siamo una comunità dedicata a promuovere la bellezza attraverso eventi e visioni.
        </p>
        <Link to="/visioni" className="px-12 py-5 bg-gold-custom text-white uppercase tracking-[0.2em] text-xs hover:bg-gold-light transition-all rounded-sm">
          Entra nel mondo Thetis
        </Link>
      </div>
    </section>

    {/* Sezione Citazione (Filler di impatto) */}
    <section className="py-32 bg-ivory text-center px-6">
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
    </section>
  </div>
);

export default Home;