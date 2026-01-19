import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import delle pagine (Assicurati che i percorsi siano corretti)
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import ChiSiamo from './pages/ChiSiamo';
import Programmazione from './pages/Programmazione';

// Componente Header con gestione stato Active e Mobile Menu
const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Effetto per cambiare background allo scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Visioni', path: '/visioni' },
    { name: 'Articoli', path: '/articoli' },
    { name: 'Programmazione', path: '/programmazione' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-ivory/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-midnight">
          THETIS<span className="text-gold-custom">.</span>
        </Link>
        
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors hover:text-gold-custom ${
                location.pathname === link.path ? 'text-gold-custom' : 'text-midnight/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

// Componente Footer Istituzionale
const Footer = () => (
  <footer className="bg-midnight text-ivory py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
      <div>
        <h3 className="text-2xl font-serif italic mb-6">Thetis APS</h3>
        <p className="text-xs opacity-50 leading-loose uppercase tracking-widest">
          Associazione di Promozione Sociale<br />
          Sede Legale: Via delle Arti, 12<br />
          C.F. 90012345678
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <span className="text-gold-custom tracking-widest text-[10px] font-bold uppercase">Contatti</span>
        <a href="mailto:info@thetis-aps.it" className="text-sm hover:text-gold-custom transition-colors italic">info@thetis-aps.it</a>
        <p className="text-sm">+39 012 345 6789</p>
      </div>
      <div className="md:text-right flex flex-col justify-between">
        <div className="space-x-6 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-gold-custom">Instagram</a>
          <a href="#" className="hover:text-gold-custom">Facebook</a>
        </div>
        <p className="text-[9px] opacity-30 uppercase tracking-tighter mt-8 md:mt-0">
          © 2026 Thetis APS - Tutti i diritti riservati
        </p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        {/* Main Content Area */}
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
  );
}

export default App;