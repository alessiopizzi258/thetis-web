import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Footer = () => (
  <footer className="py-20 border-t border-gray-100 mt-20">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-gray-400 uppercase">
      <p>© 2026 Associazione Thetis. All rights reserved.</p>
      <p>C.F. {siteData.contatti.cf}</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-[#1A1A1A]">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visioni" element={<Visioni />} />
            <Route path="/articoli" element={<Articoli />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}