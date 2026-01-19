const ChiSiamo = () => {
  const sociOnorari = ["Dr. Elena Rossi", "Prof. Marco Verdi", "Arch. Sofia Neri"];

  return (
    <div className="pb-24 animate-fade-in">
      {/* Hero Mission */}
      <section className="py-32 bg-midnight text-ivory px-6 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif mb-8 italic">Un progetto condiviso.</h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed opacity-80 italic">
            "Thetis nasce per rendere la cultura un bene alla portata di tutti. Non
            siamo solo un’associazione, ma un laboratorio dove video, musica e arte si
            incontrano."
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-custom/10 blur-3xl rounded-full -mr-32 -mb-32"></div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-20 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-serif mb-6 border-b border-gold-custom pb-2 inline-block italic text-midnight">La nostra Mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-light">
              Fondata nel 2020, Thetis aggrega artisti, educatori e professionisti della cultura. 
              Operiamo sul territorio nazionale per creare ponti tra istituzioni e cittadini.
            </p>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed font-light">
            Crediamo nella partecipazione come motore per far nascere nuove idee. Il nostro 
            impegno quotidiano è volto a trasformare la fruizione passiva in protagonismo culturale.
          </p>
        </div>
        
        <div className="bg-white p-12 rounded-sm shadow-xl border-t-4 border-gold-custom">
          <h3 className="text-xs tracking-[0.3em] font-bold uppercase text-gold-custom mb-8">Comitato d'Onore</h3>
          <ul className="space-y-6">
            {sociOnorari.map(socio => (
              <li key={socio} className="flex items-center gap-4 group">
                <span className="w-8 h-[1px] bg-gold-custom group-hover:w-12 transition-all"></span>
                <span className="text-xl font-serif italic text-midnight">{socio}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;