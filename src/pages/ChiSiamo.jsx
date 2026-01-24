import { motion } from 'framer-motion';
import { Heart, Users, Target, Award } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

const ChiSiamo = () => {
  const sociOnorari = ["Maria Movilia", "Pina", "Vittoria Altomonte"];
  const sociMemoria = ["Soci alla memoria"];

  return (
    <div className="overflow-hidden bg-ivory">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 bg-midnight text-ivory px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="text-gold-custom tracking-[0.5em] uppercase text-[10px] font-bold mb-6 block">Il Cuore di Thétis</span>
            <h1 className="text-6xl md:text-8xl font-serif italic mb-12">Un progetto <br/> di persone.</h1>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-16 text-left items-start">
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90 font-serif italic">
                Siamo un'Associazione socio-culturale composta da 7 soci fondatori, uniti dalla volontà di promuovere la cultura, l'arte e il sociale nel territorio calabrese e nazionale.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="space-y-6 border-l border-gold-custom pl-8">
                <p className="text-lg font-light leading-relaxed opacity-70 italic">
                  "Non siamo solo un'associazione, ma un laboratorio di solidarietà dove la bellezza dell'arte si sposa con l'impegno civile."
                </p>
                <div className="flex items-center gap-4 text-gold-custom">
                  <Heart size={20} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Vesti la vita, annoda il cancro</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- VALORI & MISSIONE --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { 
              t: "Cultura & Arte", 
              d: "Curiamo la Pinacoteca e la Biblioteca virtuale per promuovere autori e artisti, valorizzando il genio calabrese.",
              icon: <Target size={24} className="mb-6 text-gold-custom" />
            },
            { 
              t: "Solidarietà", 
              d: "Sosteniamo attivamente la ricerca contro i tumori devolvendo il ricavato alla Fondazione AIRC.",
              icon: <Heart size={24} className="mb-6 text-gold-custom" />
            },
            { 
              t: "Educazione", 
              d: "Portiamo la magia delle fiabe negli asili e nelle scuole, credendo nel potere educativo dell'immaginazione.",
              icon: <Award size={24} className="mb-6 text-gold-custom" />
            }
          ].map((v, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-t border-slate-200 pt-8 group hover:border-gold-custom transition-colors duration-500">
                {v.icon}
                <span className="text-gold-custom font-mono text-sm">0{i+1}</span>
                <h3 className="text-2xl font-serif italic my-4 text-midnight">{v.t}</h3>
                <p className="text-slate-500 font-light leading-relaxed">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- SEZIONE SOCI --- */}
      <section className="py-32 bg-white shadow-inner overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <Users className="mx-auto mb-8 text-gold-custom/30" size={40} />
            <h2 className="text-4xl md:text-5xl font-serif italic mb-20 text-midnight">La nostra Comunità</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Soci Onorari */}
            <Reveal delay={0.2}>
              <div className="space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-8">Soci Onorari</h4>
                <div className="flex flex-col gap-6">
                  {sociOnorari.map(s => (
                    <div key={s} className="group">
                      <div className="text-2xl font-serif text-midnight group-hover:text-gold-custom transition-colors italic">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Soci alla Memoria */}
            <Reveal delay={0.4}>
              <div className="space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-custom mb-8">Eredità & Memoria</h4>
                <div className="flex flex-col gap-6">
                  {sociMemoria.map(s => (
                    <div key={s} className="group">
                      <div className="text-2xl font-serif text-midnight opacity-40 italic">{s}</div>
                      <p className="text-[9px] uppercase tracking-widest mt-2 opacity-30">Il loro spirito guida Thétis</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- COLLABORAZIONI --- */}
      <section className="py-24 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400 mb-12 font-bold">In collaborazione con</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-xl font-serif font-bold italic">Fondazione AIRC</span>
              <span className="text-xl font-serif font-bold italic">Pro Loco Bova Marina</span>
              <span className="text-xl font-serif font-bold italic">Ass. Penelope Polveredifata</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;