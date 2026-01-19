import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import Programmazione from './pages/Programmazione';
import ChiSiamo from './pages/ChiSiamo';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula il caricamento per l'animazione d'entrata
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-midnight z-[999] flex items-center justify-center">
        <div className="text-center overflow-hidden">
          <h2 className="text-ivory font-serif italic text-3xl tracking-[0.8em] animate-reveal-text">
            THETIS
          </h2>
          <div className="h-[1px] bg-gold-custom w-0 animate-grow-line mt-4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root>
      <Router>
        <div className="flex flex-col min-h-screen bg-ivory selection:bg-gold-custom selection:text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visioni" element={<Visioni />} />
              <Route path="/articoli" element={<Articoli />} />
              <Route path="/programmazione" element={<Programmazione />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;