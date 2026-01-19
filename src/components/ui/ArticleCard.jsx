import { Link } from 'react-router-dom';

const ArticleCard = ({ id, date, title, abstract, tags }) => {
  return (
    <div className="group border-b border-midnight/5 pb-16 last:border-0">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gold-custom font-mono text-xs tracking-tighter">{date}</span>
            <div className="flex gap-2">
              {tags?.map(tag => (
                <span key={tag} className="text-[9px] uppercase tracking-widest px-2 py-1 bg-midnight/5 opacity-50 font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Il Titolo ora è un Link */}
          <Link to={`/articoli/${id}`}>
            <h2 className="text-4xl font-serif italic mb-6 group-hover:text-gold-custom transition-colors cursor-pointer leading-tight">
              {title}
            </h2>
          </Link>
          
          <p className="text-slate-500 font-light leading-relaxed mb-8 max-w-2xl text-lg">
            {abstract}
          </p>
          
          <Link 
            to={`/articoli/${id}`}
            className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-gold-custom pb-2 hover:text-gold-custom transition-all"
          >
            Leggi l'articolo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;