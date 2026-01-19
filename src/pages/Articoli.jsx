import ArticleCard from '../components/ui/ArticleCard';

const Articoli = () => {
  const articoli = [
    { 
      id: 1, 
      date: "15 Gen 2026", 
      title: "L'estetica della cura nelle APS", 
      abstract: "Un'analisi su come la bellezza possa diventare strumento di coesione sociale e rigenerazione urbana nelle piccole comunità.", 
      tags: ["Sociale", "Cultura"] 
    },
    { 
      id: 2, 
      date: "02 Gen 2026", 
      title: "La Ginestra: un anno di resistenza", 
      abstract: "Editoriale di inizio anno sulle sfide del terzo settore e l'importanza di mantenere vivi gli spazi di pensiero critico.", 
      tags: ["Editoriale", "Visioni"] 
    },
  ];

  return (
    <div className="py-24 max-w-4xl mx-auto px-6 animate-fade-in">
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12 text-gold-custom/10 text-9xl font-serif italic select-none">Thetis</div>
        <h1 className="text-7xl font-serif italic mb-4 relative z-10">La Ginestra</h1>
        <div className="w-24 h-[1px] bg-gold-custom mx-auto mb-6"></div>
        <p className="uppercase tracking-[0.5em] text-gold-custom text-[10px] font-bold">Rivista di Pensiero Critico</p>
      </div>
      
      <div className="space-y-16">
        {articoli.map(art => (
          <ArticleCard key={art.id} {...art} />
        ))}
      </div>
    </div>
  );
};

export default Articoli;