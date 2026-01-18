import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
      <Link to="/" className="font-serif text-2xl tracking-[0.2em] font-light">THETIS</Link>
      <div className="flex gap-10 font-sans text-xs uppercase tracking-widest text-[#1A1A1A]">
        {['Visioni', 'Articoli', 'Chi Siamo'].map((item) => (
          <NavLink 
            key={item} 
            to={`/${item.toLowerCase().replace(' ', '-')}`}
            className={({ isActive }) => 
              `hover:text-[#D4AF37] transition-colors ${isActive ? 'text-[#D4AF37]' : ''}`
            }
          >
            {item}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="max-w-7xl mx-auto px-8 py-20"
  >
    {children}
  </motion.div>
);