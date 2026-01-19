const ArticleCard = ({ date, title, abstract, tags }) => (
  <div className="group py-12 border-b border-midnight/10 flex flex-col md:flex-row gap-8 items-start hover:bg-gold-custom/[0.02] transition-colors px-4">
    <div className="w-32 pt-1">
      <span className="text-xs font-bold tracking-[0.2em] text-gold-custom uppercase">
        {date}
      </span>
    </div>
    <div className="flex-1">
      <div className="flex gap-2 mb-3">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-widest bg-midnight/5 px-2 py-1 text-midnight/60">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-3xl font-serif text-midnight mb-4 group-hover:text-gold-custom transition-colors">
        {title}
      </h2>
      <p className="text-slate-600 font-light leading-relaxed max-w-2xl">
        {abstract}
      </p>
      <button className="mt-6 text-xs uppercase tracking-widest font-bold border-b border-gold-custom pb-1 hover:text-gold-custom transition-colors">
        Leggi l'articolo
      </button>
    </div>
  </div>
);

export default ArticleCard;