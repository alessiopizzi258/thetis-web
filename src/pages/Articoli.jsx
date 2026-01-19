import ArticleCard from '../components/ui/ArticleCard';

const Articoli = () => {
  const articoli = [
    { id: 1, date: "15 Gen 2026", title: "L'estetica della cura nelle APS", abstract: "Un'analisi su come la bellezza possa diventare strumento di coesione sociale e rigenerazione urbana.", tags: ["Sociale", "Cultura"] },
    { id: 2, date: "02 Gen 2026", title: "La Ginestra: un anno di resistenza", abstract: "Editoriale di inizio anno sulle sfide del terzo settore nel panorama artistico contemporaneo.", tags: ["Editoriale", "Visioni"] },
  ];

  return (
    <div className="py-20 max-w-4xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-serif italic mb-4">La Ginestra</h1>
        <p className="uppercase tracking-[0.3em] text-gold-custom text-sm">Rivista di Pensiero Critico</p>
      </div>
      <div className="space-y-4">
        {articoli.map(art => <ArticleCard key={art.id} {...art} />)}
      </div>
    </div>
  );
};

export default Articoli;