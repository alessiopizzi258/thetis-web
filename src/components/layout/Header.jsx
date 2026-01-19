// components/layout/Header.jsx
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Visioni', path: '/visioni' },
    { name: 'Articoli', path: '/articoli' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
  ];

  return (
    <header className="fixed w-full z-50 bg-ivory/90 backdrop-blur-md border-b border-gold-custom/10">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif font-bold tracking-tighter text-midnight">
          THETIS<span className="text-gold-custom">.</span>
        </Link>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm uppercase tracking-widest transition-colors ${
                location.pathname === link.path 
                ? 'text-gold-custom font-bold' 
                : 'text-midnight/70 hover:text-midnight'
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

export default Header;

