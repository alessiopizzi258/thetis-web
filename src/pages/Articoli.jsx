
// --- ARTICOLI ---
export const Articoli = () => (
  <PageWrapper>
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-4xl mb-20 text-center">Archivio del Pensiero</h2>
      {siteData.articoli.map((art) => (
        <article key={art.id} className="mb-24 group">
          <span className="text-[10px] tracking-widest text-gray-400 uppercase">{art.data}</span>
          <h3 className="font-serif text-3xl mt-2 mb-4 group-hover:italic transition-all duration-300">
            {art.titolo}
          </h3>
          <p className="font-sans leading-relaxed text-gray-600">{art.testo}</p>
          <div className="mt-6 h-[1px] w-12 bg-[#D4AF37]"></div>
        </article>
      ))}
    </div>
  </PageWrapper>
);