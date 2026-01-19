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

  // Chiude il menu mobile quando si cambia pagina
  useEffect(() => setMobileMenuOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Visioni', path: '/visioni' },
    { name: 'Articoli', path: '/articoli' },
    { name: 'Programmazione', path: '/programmazione' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
  ];

  // LOGICA COLORE: Sulle pagine con sfondo blu (Home e Chi Siamo), 
  // se non abbiamo scrollato, il testo deve essere bianco (ivory).
  const isDarkPage = location.pathname === '/' || location.pathname === '/chi-siamo';
  const useWhiteText = isDarkPage && !isScrolled;

  const textColor = useWhiteText ? 'text-ivory' : 'text-midnight';
  const logoColor = useWhiteText ? 'text-ivory' : 'text-midnight';

  return (
    <header className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-ivory/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${logoColor}`}>
          THETIS<span className="text-gold-custom">.</span>
        </Link>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 hover:text-gold-custom ${
                location.pathname === link.path ? 'text-gold-custom' : textColor
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottone Mobile (Hamburger) */}
        <button 
          className="md:hidden p-2 z-[110]" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-midnight" size={28} />
          ) : (
            <Menu className={`${textColor} transition-colors duration-500`} size={28} />
          )}
        </button>
      </nav>

      {/* Overlay Menu Mobile */}
      <div className={`fixed inset-0 bg-ivory z-[105] flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-2xl uppercase tracking-[0.3em] font-serif italic ${
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

export default Header;