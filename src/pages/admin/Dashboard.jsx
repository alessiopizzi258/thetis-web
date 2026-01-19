import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ModalNuovoArticolo from '../../components/admin/ModalNuovoArticolo'; // Assicurati che il percorso sia corretto
import { LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [articoli, setArticoli] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Recupera articoli dal database
  const fetchArticoli = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articoli')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setArticoli(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticoli();
  }, []);

  const handleElimina = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo articolo?")) {
      const { error } = await supabase.from('articoli').delete().eq('id', id);
      if (!error) fetchArticoli();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Errore logout:', error.message);
  };

  return (
    <div className="p-10 bg-ivory min-h-screen pt-32 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Console */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif italic text-midnight">Console Thetis</h1>
            <p className="text-xs text-gold-custom tracking-[0.3em] uppercase mt-2">Gestione Contenuti</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gold-custom text-white px-6 py-3 rounded-sm text-[10px] uppercase tracking-widest hover:bg-midnight transition-all shadow-lg"
            >
              <Plus size={14} /> Nuovo Articolo
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 border border-midnight/10 text-midnight px-6 py-3 rounded-sm text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut size={14} /> Esci
            </button>
          </div>
        </div>

        {/* Tabella */}
        <div className="bg-white shadow-xl rounded-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-midnight text-ivory text-[10px] uppercase tracking-[0.2em] font-bold">
              <tr>
                <th className="p-6">Titolo Articolo</th>
                <th className="p-6">Data Pubblicazione</th>
                <th className="p-6 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-20 text-center italic text-slate-400">
                    Sincronizzazione con il database...
                  </td>
                </tr>
              ) : articoli.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-20 text-center italic text-slate-400">
                    Nessun articolo trovato. Inizia creandone uno nuovo.
                  </td>
                </tr>
              ) : (
                articoli.map((art) => (
                  <tr key={art.id} className="border-b border-slate-100 hover:bg-ivory/30 transition-colors group">
                    <td className="p-6 font-serif italic text-lg text-midnight group-hover:text-gold-custom transition-colors">
                      {art.titolo}
                    </td>
                    <td className="p-6 opacity-50 font-mono text-xs">
                      {new Date(art.created_at).toLocaleDateString('it-IT', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-6">
                        <button className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 hover:text-midnight transition-colors">
                          Modifica
                        </button>
                        <button 
                          onClick={() => handleElimina(art.id)}
                          className="text-[10px] font-bold uppercase tracking-tighter text-red-300 hover:text-red-600 transition-colors"
                        >
                          Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Componente Modal */}
      <ModalNuovoArticolo 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchArticoli} 
      />
    </div>
  );
};

export default AdminDashboard;