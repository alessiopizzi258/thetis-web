import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-ivory pt-24 pb-12 px-6 mt-auto border-t border-ivory/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-6">Thetis<span className="text-gold-custom">.</span></h3>
            <p className="text-sm opacity-50 font-light leading-relaxed">
              Associazione di Promozione Sociale dedicata alla diffusione della cultura, 
              dell'arte e del pensiero critico come strumenti di emancipazione collettiva.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gold-custom">Navigazione</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li><Link to="/visioni" className="hover:text-gold-custom transition-colors">Visioni Multimedia</Link></li>
              <li><Link to="/articoli" className="hover:text-gold-custom transition-colors">La Ginestra Rivista</Link></li>
              <li><Link to="/programmazione" className="hover:text-gold-custom transition-colors">Prossimi Eventi</Link></li>
              <li><Link to="/chi-siamo" className="hover:text-gold-custom transition-colors">Il Progetto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gold-custom">Contatti</h4>
            <div className="space-y-4 text-sm font-light opacity-70">
              <p>Via dell'Arte, 25<br />00100 Roma (RM)</p>
              <p className="hover:text-gold-custom"><a href="mailto:info@thetis-aps.it">info@thetis-aps.it</a></p>
              <p>+39 06 123 4567</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gold-custom">Seguici</h4>
            <div className="flex flex-col space-y-4 text-sm font-light opacity-70">
              <a href="#" className="hover:text-gold-custom transition-colors flex items-center gap-2">Instagram</a>
              <a href="#" className="hover:text-gold-custom transition-colors flex items-center gap-2">Facebook</a>
              <a href="#" className="hover:text-gold-custom transition-colors flex items-center gap-2">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] uppercase tracking-widest opacity-40">
            © {currentYear} THETIS APS — Tutti i diritti riservati
          </div>
          <div className="text-[9px] uppercase tracking-widest opacity-40 flex gap-8">
            <span className="hover:text-gold-custom cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-custom cursor-pointer">Cookie Policy</span>
            <Link to="/login" className="hover:text-gold-custom transition-colors">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;