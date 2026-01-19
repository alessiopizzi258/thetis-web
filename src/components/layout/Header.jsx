import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Visioni', path: '/visioni' },
    { name: 'Articoli', path: '/articoli' },
    { name: 'Programmazione', path: '/programmazione' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
  ];

  // Identifica le pagine con sfondo Midnight (Hero o Gallery scure)
  const isDarkPage = 
    location.pathname === '/' || 
    location.pathname === '/chi-siamo' || 
    location.pathname.startsWith('/visioni/');

  const useWhiteText = isDarkPage && !isScrolled;

  return (
    <header className={`fixed w-full z-[100] transition-all duration-700 ease-in-out ${
      isScrolled ? 'bg-ivory/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link to="/" className={`group flex items-center gap-2 text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${useWhiteText ? 'text-ivory' : 'text-midnight'}`}>
          {/* Se carichi un file logo.svg, mettilo qui sotto e gestisci la visibilità col CSS */}
          THETIS<span className="text-gold-custom group-hover:scale-150 transition-transform duration-500">.</span>
        </Link>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-[10px] uppercase tracking-[0.3em] font-bold group h-6 overflow-hidden ${
                location.pathname === link.path ? 'text-gold-custom' : useWhiteText ? 'text-ivory' : 'text-midnight'
              }`}
            >
              <div className="flex flex-col transition-transform duration-500 ease-[0.76, 0, 0.24, 1] group-hover:-translate-y-1/2">
                <span className="h-6 flex items-center">{link.name}</span>
                <span className="h-6 flex items-center text-gold-custom italic font-serif lowercase tracking-[0.1em]">
                  {link.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottone Mobile */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden z-[110] p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X size={28} className="text-ivory" />
          ) : (
            <Menu className={`${useWhiteText ? 'text-ivory' : 'text-midnight'} transition-colors duration-500`} size={28} />
          )}
        </button>
      </nav>

      {/* Overlay Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: "100%" }} 
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-midnight z-[105] flex flex-col items-center justify-center space-y-10"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-ivory text-4xl font-serif italic hover:text-gold-custom transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Elemento decorativo nel mobile menu */}
            <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.5em] text-gold-custom opacity-50">
              Thetis — Progetto Cultura
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;