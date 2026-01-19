const ChiSiamo = () => {
  const sociOnorari = ["Dr. Elena Rossi", "Prof. Marco Verdi", "Arch. Sofia Neri"];

  return (
    <div className="pb-24">
      <section className="py-24 bg-midnight text-ivory px-6 text-center">
        <h1 className="text-5xl font-serif mb-8 italic">La nostra Mission</h1>
        <p className="max-w-3xl mx-auto text-xl font-light leading-relaxed opacity-80">
          Thetis nasce per dare voce a chi usa l'arte come linguaggio di inclusione. 
          Siamo un'Associazione di Promozione Sociale che crede nel potere trasformativo 
          della bellezza, intesa come bene comune e accessibile.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl font-serif mb-6 border-b border-gold-custom pb-2 inline-block">Chi Siamo</h2>
          <p className="text-slate-600 leading-loose">
            Fondata nel 2020, Thetis aggrega artisti, educatori e professionisti della cultura. 
            Operiamo sul territorio nazionale per creare ponti tra istituzioni e cittadini.
          </p>
        </div>
        
        <div className="bg-slate-50 p-10 rounded-lg">
          <h3 className="text-2xl font-serif mb-6">Soci Onorari</h3>
          <ul className="space-y-4 italic text-slate-700">
            {sociOnorari.map(socio => (
              <li key={socio} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gold-custom rounded-full"></span>
                {socio}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;