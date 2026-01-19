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

  const isDarkPage = 
    location.pathname === '/' || 
    location.pathname === '/chi-siamo' || 
    location.pathname.startsWith('/visioni/');

  const useWhiteText = isDarkPage && !isScrolled;

  return (
    <header className={`fixed w-full z-[100] transition-all duration-700 ${
      isScrolled ? 'bg-ivory/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`group flex items-center gap-2 text-2xl font-serif font-bold tracking-tighter ${useWhiteText ? 'text-ivory' : 'text-midnight'}`}>
          THETIS<span className="text-gold-custom group-hover:scale-150 transition-transform">.</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-10">
          // Sostituisci la parte dei navLinks in Header.jsx
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

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X size={28} /> : <Menu className={useWhiteText ? 'text-ivory' : 'text-midnight'} size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "-100%" }} 
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-midnight z-[105] flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-ivory text-4xl font-serif italic">
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;