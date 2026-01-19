import VisionCard from '../components/ui/VisionCard';

const Visioni = () => {
  const galleria = [
    { id: 1, title: "Oltre il Muro", desc: "Mostra fotografica itinerante", img: "https://images.unsplash.com/photo-1494173853114-c284ba9a74d4?q=80&w=2000" },
    { id: 2, title: "Sinfonie Murali", desc: "Documentario sulla street art", img: "https://images.unsplash.com/photo-1561059488-916d69792237?q=80&w=2000" },
    // Aggiungi altri elementi...
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-6">
      <div className="mb-16 border-l-4 border-gold-custom pl-6">
        <h1 className="text-5xl font-serif mb-4 text-midnight">Visioni</h1>
        <p className="text-slate-500 max-w-xl">Il nostro archivio visivo: installazioni, performance e produzioni multimediali firmate Thetis.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {galleria.map(item => <VisionCard key={item.id} title={item.title} description={item.desc} image={item.img} />)}
      </div>
    </div>
  );
};

export default Visioni;