import VisionCard from '../components/ui/VisionCard';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-midnight text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 animate-fade-in">
            L’Arte vive con <span className="italic">Thetis</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl font-light mb-10 opacity-90">
            Promuoviamo il valore sociale della cultura attraverso progetti visionari e sguardi inediti.
          </p>
          <button className="px-10 py-4 bg-gold-custom text-white uppercase tracking-widest hover:bg-gold-700 transition-all">
            Scopri i nostri progetti
          </button>
        </div>
      </section>

      {/* Anteprima Visioni */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-serif mb-12">Visioni Recenti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <VisionCard title="Echi Mediterranei" description="Un viaggio sensoriale tra le rive del mare." image="https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070" />
          <VisionCard title="Luce Urbana" description="L'estetica del quotidiano nelle metropoli." image="https://images.unsplash.com/photo-1449156059586-760c45b6ad5a?q=80&w=2070" />
          <VisionCard title="Radici" description="Performance coreutica sulla memoria dei luoghi." image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069" />
        </div>
      </section>
    </div>
  );
};

export default Home;