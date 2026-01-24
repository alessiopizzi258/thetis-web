import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-ivory pt-24 pb-12 px-6 mt-auto border-t border-ivory/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-6">Thétis<span className="text-gold-custom">.</span></h3>
            <p className="text-sm opacity-50 font-light leading-relaxed italic">
              "Vesti la vita, annoda il cancro". Promuoviamo la cultura, l'arte e il sociale 
              nel cuore della Calabria e oltre.
            </p>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gold-custom">Navigazione</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li><Link to="/visioni" className="hover:text-gold-custom">Visioni</Link></li>
              <li><Link to="/articoli" className="hover:text-gold-custom">Rivista La Ginestra</Link></li>
              <li><Link to="/programmazione" className="hover:text-gold-custom">Agenda</Link></li>
              <li><Link to="/chi-siamo" className="hover:text-gold-custom">Chi Siamo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gold-custom">Contatti</h4>
            <div className="space-y-4 text-sm font-light opacity-70">
              <p>Area Grecanica<br />Reggio Calabria (RC)</p>
              <p className="hover:text-gold-custom font-mono text-xs">thetis.associazioneculturale@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gold-custom">Seguici</h4>
            <div className="flex flex-col space-y-4 text-sm font-light opacity-70">
              <a href="https://www.facebook.com/associazionethetis" target="_blank" className="hover:text-gold-custom">Facebook</a>
              <a href="#" className="hover:text-gold-custom">Instagram</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] uppercase tracking-widest opacity-40 italic">
            © {currentYear} THETIS APS — Progetto "Vesti la vita, annoda il cancro" for AIRC
          </div>
          <div className="text-[9px] uppercase tracking-widest opacity-40 flex gap-8">
            <Link to="/login" className="hover:text-gold-custom transition-colors border-b border-gold-custom/20">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;