import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteData } from './data/data';
import ReactPlayer from 'react-player';

// Componente Navbar elegante
const Navbar = () => (
  <nav className="p-8 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50">
    <Link to="/" className="text-2xl font-serif tracking-[0.2em] font-bold">THETIS</Link>
    <div className="space-x-8 text-xs uppercase tracking-widest text-gray-500">
      <Link to="/" className="hover:text-black transition">Home</Link>
      <Link to="/visioni" className="hover:text-black transition">Visioni</Link>
      <Link to="/articoli" className="hover:text-black transition">Articoli</Link>
    </div>
  </nav>
);

// PAGINA HOME
const Home = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[80vh] flex flex-col justify-center items-center px-6">
    <h1 className="text-6xl md:text-9xl font-serif italic text-center mb-6">{siteData.hero.title}</h1>
    <p className="text-sm uppercase tracking-[0.5em] text-gray-400">{siteData.hero.subtitle}</p>
  </motion.div>
);

// PAGINA VISIONI (Video)
const Visioni = () => (
  <div className="p-12 max-w-7xl mx-auto">
    <h2 className="text-4xl font-serif mb-12 italic">Visioni</h2>
    <div className="grid md:grid-cols-2 gap-16">
      {siteData.visioni.map(item => (
        <div key={item.id} className="group">
          <div className="aspect-video bg-gray-100 overflow-hidden mb-4">
            <ReactPlayer url={item.videoUrl} width="100%" height="100%" light={item.poster} playIcon={<button className="text-white text-xs tracking-widest uppercase bg-black px-6 py-2">Play</button>} />
          </div>
          <h3 className="text-lg font-serif">{item.title}</h3>
        </div>
      ))}
    </div>
  </div>
);

// PAGINA ARTICOLI
const Articoli = () => (
  <div className="p-12 max-w-4xl mx-auto">
    <h2 className="text-4xl font-serif mb-12 italic">Articoli</h2>
    {siteData.articoli.map(art => (
      <div key={art.id} className="mb-20 border-b border-gray-100 pb-10">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{art.date}</span>
        <h3 className="text-2xl font-serif mt-2 mb-4 hover:italic cursor-pointer transition-all">{art.title}</h3>
        <p className="text-gray-600 leading-relaxed font-light">{art.text}</p>
      </div>
    ))}
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visioni" element={<Visioni />} />
          <Route path="/articoli" element={<Articoli />} />
        </Routes>
        <footer className="p-12 text-center text-[10px] text-gray-400 tracking-widest border-t border-gray-50 uppercase">
          © 2026 Thetis Associazione Culturale • C.F. 90012345678
        </footer>
      </div>
    </Router>
  );
}