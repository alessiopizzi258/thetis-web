
// --- CHI SIAMO ---
export const ChiSiamo = () => (
  <PageWrapper>
    <div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-4xl mb-12 italic">La Nostra Storia</h2>
      <p className="font-sans text-lg leading-loose mb-20">
        Thetis nasce come spazio di intersezione tra la classicità e le avanguardie...
      </p>
      <h3 className="font-sans text-xs tracking-widest uppercase mb-10 text-[#D4AF37]">Soci Onorari</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {['Elena Rossi', 'Marco Bianchi', 'Sofia Neri'].map(name => (
          <div key={name} className="border-t border-gray-100 pt-4">
            <p className="font-serif italic text-lg">{name}</p>
            <p className="text-xs text-gray-400 uppercase mt-1">Curatore</p>
          </div>
        ))}
      </div>
    </div>
  </PageWrapper>
);