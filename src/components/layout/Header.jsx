import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Gestione Scroll per background e colori
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chiude il menu mobile al cambio pagina
  useEffect(() => setMobileMenuOpen(false), [location]);

  // 2. Logica Colore: Se siamo in Home (con hero blu) e non abbiamo scrollato, il testo è BIANCO
  // Se abbiamo scrollato o siamo in altre pagine, il testo è BLU NOTTE (midnight)
  const isHomePage = location.pathname === '/';
  const textColor = (isHomePage && !isScrolled) ? 'text-ivory' : 'text-midnight';
  const logoColor = (isHomePage && !isScrolled) ? 'text-ivory' : 'text-midnight';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Visioni', path: '/visioni' },
    { name: 'Articoli', path: '/articoli' },
    { name: 'Programmazione', path: '/programmazione' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
  ];

  return (
    <header className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-ivory/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className={`text-2xl font-serif font-bold tracking-tighter transition-colors ${logoColor}`}>
          THETIS<span className="text-gold-custom">.</span>
        </Link>
        
        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors hover:text-gold-custom ${
                location.pathname === link.path ? 'text-gold-custom' : textColor
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden p-2 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-midnight" size={28} />
          ) : (
            <Menu className={textColor} size={28} />
          )}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-ivory z-[-1] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 md:hidden ${
        mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-xl uppercase tracking-[0.3em] font-serif italic ${
              location.pathname === link.path ? 'text-gold-custom' : 'text-midnight'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};