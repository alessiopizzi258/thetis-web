// src/pages/ChiSiamo.jsx
const ChiSiamo = () => (
  <div className="animate-fade-in">
    <section className="py-32 bg-midnight text-ivory px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-serif italic mb-12">Un progetto condiviso.</h1>
        <div className="grid md:grid-cols-2 gap-16 text-left items-center">
          <p className="text-xl font-light leading-relaxed opacity-90">
            Thetis nasce per rendere la cultura un bene alla portata di tutti. Non
            siamo solo un’associazione, ma un laboratorio dove video, musica e arte si
            incontrano.
          </p>
          <p className="text-xl font-light leading-relaxed opacity-70 border-l border-gold-custom pl-8 italic">
            Crediamo nella partecipazione come motore per far nascere nuove idee e trasformare il territorio.
          </p>
        </div>
      </div>
    </section>

    {/* Sezione Valori (Riempe molto bene la pagina) */}
    <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
      {[
        { t: "Inclusione", d: "Abbattiamo le barriere per rendere l'arte accessibile a ogni individuo." },
        { t: "Innovazione", d: "Sperimentiamo nuovi linguaggi multimediali e forme espressive." },
        { t: "Territorio", d: "Radichiamo la cultura negli spazi urbani meno valorizzati." }
      ].map((v, i) => (
        <div key={i} className="border-t border-slate-200 pt-8">
          <span className="text-gold-custom font-mono text-sm">0{i+1}</span>
          <h3 className="text-2xl font-serif italic my-4 text-midnight">{v.t}</h3>
          <p className="text-slate-500 font-light leading-relaxed">{v.d}</p>
        </div>
      ))}
    </section>

    {/* Sezione Soci (Già esistente ma rifinita) */}
    <section className="py-24 bg-white shadow-inner">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif italic mb-12">Il Comitato Scientifico</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {["Elena Rossi", "Marco Verdi", "Sofia Neri"].map(s => (
            <div key={s} className="group cursor-default">
              <div className="text-xl font-serif text-midnight group-hover:text-gold-custom transition-colors">{s}</div>
              <div className="text-[9px] uppercase tracking-widest opacity-40">Socio Onorario</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ChiSiamo;