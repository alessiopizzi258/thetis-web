import VisionCard from '../components/ui/VisionCard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-midnight text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070')] bg-cover bg-center scale-105" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">
            L’Arte vive con <span className="text-gold-custom">Thetis</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light mb-12 opacity-90 leading-relaxed">
            Spazio alla cultura, voce alle idee. Siamo una comunità dedicata a
            promuovere la bellezza attraverso eventi, visioni e incontri.
          </p>
          <Link 
            to="/visioni" 
            className="inline-block px-12 py-5 bg-gold-custom text-white uppercase tracking-[0.2em] text-sm hover:bg-gold-light transition-all shadow-2xl rounded-sm"
          >
            Entra nel mondo Thetis
          </Link>
        </div>
      </section>

      {/* Anteprima Visioni */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-gold-custom tracking-[0.3em] uppercase text-xs font-bold">Esplora</span>
            <h2 className="text-4xl font-serif italic mt-2">Visioni Recenti</h2>
          </div>
          <Link to="/visioni" className="text-sm uppercase tracking-widest border-b border-gold-custom pb-1 hover:text-gold-custom transition-colors">
            Vedi tutto
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <VisionCard 
            title="Echi Mediterranei" 
            description="Un viaggio sensoriale tra le rive del mare." 
            image="https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070" 
          />
          <VisionCard 
            title="Luce Urbana" 
            description="L'estetica del quotidiano nelle metropoli." 
            image="https://images.unsplash.com/photo-1449156059586-760c45b6ad5a?q=80&w=2070" 
          />
          <VisionCard 
            title="Radici" 
            description="Performance coreutica sulla memoria dei luoghi." 
            image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069" 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;