import React from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Mail, Info } from 'lucide-react';
import { content } from './data/data';

const Section = ({ children, title }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-16 px-6 max-w-6xl mx-auto"
  >
    {title && <h2 className="text-3xl font-serif mb-12 border-b border-gray-100 pb-4">{title}</h2>}
    {children}
  </motion.section>
);

export default function App() {
  return (
    <div className="font-sans">
      {/* HEADER */}
      <nav className="p-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <h1 className="text-2xl font-serif font-bold tracking-widest text-thetis-gold">THETIS</h1>
        <div className="space-x-8 hidden md:flex text-sm uppercase tracking-widest text-gray-500">
          <a href="#" className="hover:text-thetis-gold transition">Home</a>
          <a href="#visioni" className="hover:text-thetis-gold transition">Visioni</a>
          <a href="#articoli" className="hover:text-thetis-gold transition">Articoli</a>
          <a href="#chisiamo" className="hover:text-thetis-gold transition">Chi Siamo</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-slate-50">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-serif mb-6"
        >
          {content.hero.title}
        </motion.h2>
        <p className="text-xl text-gray-600 max-w-2xl">{content.hero.subtitle}</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-10 px-8 py-3 bg-thetis-gold text-white rounded-full tracking-widest text-sm uppercase"
        >
          Esplora i progetti
        </motion.button>
      </header>

      {/* VISIONI (Video e Locandine) */}
      <Section title="Visioni" id="visioni">
        <div className="grid md:grid-cols-2 gap-12">
          {content.visioni.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-xl aspect-[4/5]">
                <img src={item.image} alt={item.title} className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play className="text-white w-16 h-16" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Calendar size={14} /> {item.date}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ARTICOLI (Vblog) */}
      <Section title="Articoli" id="articoli">
        <div className="space-y-12">
          {content.articoli.map((post) => (
            <article key={post.id} className="border-l-2 border-thetis-gold pl-6 hover:bg-slate-50 p-4 transition">
              <span className="text-xs text-thetis-gold font-bold uppercase tracking-widest">{post.date}</span>
              <h3 className="text-2xl font-serif my-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button className="text-sm font-bold underline">Leggi tutto</button>
            </article>
          ))}
        </div>
      </Section>

      {/* CHI SIAMO */}
      <Section title="Chi Siamo" id="chisiamo">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-gray-700">
            Thetis nasce come spazio aperto. La nostra associazione si fonda sul contributo dei **Soci Onorari**, 
            scelti per la loro dedizione alla cultura e alla visione artistica. Non siamo una struttura chiusa, 
            ma un organismo in continua evoluzione che mette il pensiero e l'arte al centro del vivere comune.
          </p>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif text-thetis-gold mb-2">THETIS</h2>
            <p className="text-gray-400 text-sm">Associazione Culturale No-Profit</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-400">
            <p className="flex items-center gap-2"><Mail size={16} /> {content.footer.email}</p>
            <p className="flex items-center gap-2"><Info size={16} /> CF: {content.footer.cf}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}