import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  const navLinks = [
    { name: 'Visioni', path: '/visioni' },
    { name: 'Articoli', path: '/articoli' },
    { name: 'Programmazione', path: '/programmazione' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
  ];

  // Identifichiamo le pagine che hanno lo sfondo Midnight (blu scuro)
  const isDarkPage = 
    location.pathname === '/' || 
    location.pathname === '/chi-siamo' || 
    location.pathname.startsWith('/visioni/'); // Anche il dettaglio visioni è scuro

  const useWhiteText = isDarkPage && !isScrolled;

  return (
    <header className={`fixed w-full z-[100] transition-all duration-700 ${
      isScrolled ? 'bg-ivory/90 backdrop-blur-lg py-4 shadow-md' : 'bg-transparent py-8'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link to="/" className="group flex items-center gap-3">
          {/* Quando avrai il logo, sostituisci questo div con: 
              <img src="/logo-white.svg" className={`h-8 ${useWhiteText ? 'block' : 'hidden'}`} />
              <img src="/logo-dark.svg" className={`h-8 ${useWhiteText ? 'hidden' : 'block'}`} /> 
          */}
          <div className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${useWhiteText ? 'text-ivory' : 'text-midnight'}`}>
            THETIS<span className="text-gold-custom group-hover:animate-pulse">.</span>
          </div>
        </Link>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:text-gold-custom relative group ${
                location.pathname === link.path ? 'text-gold-custom' : useWhiteText ? 'text-ivory' : 'text-midnight'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-gold-custom transition-all duration-500 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
            </Link>
          ))}
          
          {/* Call to Action opzionale: Sostienici / Area Riservata corta */}
          <Link to="/login" className={`p-2 rounded-full border transition-all ${useWhiteText ? 'border-ivory/20 hover:bg-ivory/10' : 'border-midnight/10 hover:bg-midnight/5'}`}>
             <div className={`w-2 h-2 rounded-full ${useWhiteText ? 'bg-ivory' : 'bg-midnight'}`}></div>
          </Link>
        </div>

        {/* Bottone Mobile */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden z-[110]">
          {mobileMenuOpen ? <X size={28} /> : <Menu className={useWhiteText ? 'text-ivory' : 'text-midnight'} size={28} />}
        </button>
      </nav>

      {/* Menu Mobile */}
      <div className={`fixed inset-0 bg-midnight text-ivory z-[105] flex flex-col items-center justify-center space-y-10 transition-all duration-700 md:hidden ${
        mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className="text-3xl font-serif italic hover:text-gold-custom transition-colors">
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;