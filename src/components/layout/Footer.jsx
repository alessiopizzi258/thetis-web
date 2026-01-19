const Footer = () => (
  <footer className="bg-midnight text-ivory py-16 px-6 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="font-serif text-2xl mb-4">Thetis APS</h3>
        <p className="text-sm opacity-60">Associazione di Promozione Sociale<br />C.F. 12345678901</p>
      </div>
      <div>
        <h4 className="uppercase tracking-widest text-xs font-bold mb-4 text-gold-custom">Contatti</h4>
        <p className="text-sm">info@thetis-aps.it</p>
        <p className="text-sm">+39 012 345 6789</p>
      </div>
      <div>
        <h4 className="uppercase tracking-widest text-xs font-bold mb-4 text-gold-custom">Seguici</h4>
        <div className="flex gap-4">
          <span className="hover:text-gold-custom cursor-pointer transition-colors text-sm">Instagram</span>
          <span className="hover:text-gold-custom cursor-pointer transition-colors text-sm">Facebook</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;