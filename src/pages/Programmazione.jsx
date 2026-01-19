const Programmazione = () => {
  const eventi = [
    { 
      id: 1,
      title: "Sinfonia di Primavera", 
      date: "24 Maggio 2026", 
      location: "Teatro Civico",
      img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070" 
    },
    { 
      id: 2,
      title: "Workshop: L'occhio Sociale", 
      date: "12 Giugno 2026", 
      location: "Laboratorio Thetis",
      img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070" 
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 animate-fade-in">
      <div className="mb-20">
        <span className="text-gold-custom tracking-[0.3em] uppercase text-xs font-bold">Agenda</span>
        <h1 className="text-5xl font-serif mb-6 italic text-midnight mt-2">Prossimi appuntamenti.</h1>
        <p className="text-slate-500 text-lg font-light max-w-xl">
          Sfoglia le locandine e scopri cosa abbiamo in programma. Ogni evento è
          un’occasione per incontrarsi e far circolare nuova cultura.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {eventi.map(ev => (
          <div key={ev.id} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4] shadow-2xl rounded-sm">
              <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-midnight/20 group-hover:bg-midnight/0 transition-colors"></div>
            </div>
            <div className="mt-8">
              <span className="text-gold-custom font-mono text-sm tracking-tighter">{ev.date} — {ev.location}</span>
              <h3 className="text-3xl font-serif italic text-midnight mt-2 group-hover:text-gold-custom transition-colors">{ev.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programmazione;