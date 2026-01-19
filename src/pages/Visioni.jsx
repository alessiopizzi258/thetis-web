import VisionCard from '../components/ui/VisionCard';

const Visioni = () => {
  const galleria = [
    { id: 1, title: "Oltre il Muro", desc: "Mostra fotografica itinerante sulle periferie.", img: "https://images.unsplash.com/photo-1494173853114-c284ba9a74d4?q=80&w=2000" },
    { id: 2, title: "Sinfonie Murali", desc: "Documentario sulla street art e l'identità urbana.", img: "https://images.unsplash.com/photo-1561059488-916d69792237?q=80&w=2000" },
    { id: 3, title: "Intervista al Maestro", desc: "Riflessioni sulla pittura moderna e sociale.", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000" },
    { id: 4, title: "Thetis Live Sessions", desc: "Performance musicale registrata dal vivo.", img: "https://images.unsplash.com/photo-1514525253344-99a4299946cb?q=80&w=2000" },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 animate-fade-in">
      <div className="mb-20 max-w-2xl">
        <span className="text-gold-custom tracking-[0.4em] uppercase text-[10px] font-bold">Multimedia</span>
        <h1 className="text-5xl font-serif mb-6 italic text-midnight mt-2">Il racconto visivo.</h1>
        <p className="text-slate-500 text-lg font-light leading-relaxed">
          Qui raccogliamo le storie, le interviste e i momenti più belli dei nostri
          progetti. Un archivio dinamico per rivivere insieme le emozioni dei nostri
          incontri.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {galleria.map(item => (
          <VisionCard 
            key={item.id} 
            title={item.title} 
            description={item.desc} 
            image={item.img} 
          />
        ))}
      </div>
    </div>
  );
};

export default Visioni;