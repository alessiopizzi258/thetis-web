import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ModalNuovoContenuto from '../../components/admin/ModalNuovoContenuto';
import { LogOut, Plus, BookOpen, Calendar, Image as ImageIcon, Edit2, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('articoli'); // 'articoli', 'eventi', 'visioni'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const { data: result, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleElimina = async (id) => {
    if (window.confirm(`Vuoi eliminare questo elemento da ${activeTab}?`)) {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  return (
    <div className="p-10 bg-ivory min-h-screen pt-32 text-midnight">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigazione Sezioni */}
        <div className="flex border-b border-midnight/10 mb-10 gap-8 overflow-x-auto pb-2">
          {[
            { id: 'articoli', label: 'Articoli', icon: <BookOpen size={16}/> },
            { id: 'eventi', label: 'Programmazione', icon: <Calendar size={16}/> },
            { id: 'visioni', label: 'Visioni', icon: <ImageIcon size={16}/> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'border-b-2 border-gold-custom text-gold-custom' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif italic capitalize">{activeTab}</h1>
            <p className="text-[10px] uppercase tracking-widest text-gold-custom font-bold mt-1">Gestione Database</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}
              className="bg-gold-custom text-white px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-midnight transition-all flex items-center gap-2"
            >
              <Plus size={14} /> Aggiungi {activeTab.slice(0, -1)}
            </button>
            <button onClick={handleLogout} className="p-3 border border-midnight/10 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Tabella Universale */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-midnight text-ivory text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="p-6">Titolo / Elemento</th>
                <th className="p-6">Info Supplementari</th>
                <th className="p-6 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="p-20 text-center italic opacity-30">Caricamento dati...</td></tr>
              ) : data.map(item => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-ivory/20 transition-colors group">
                  <td className="p-6 font-serif italic text-xl">
                    {item.titolo || item.title}
                  </td>
                  <td className="p-6 text-xs font-mono opacity-50 uppercase tracking-tighter">
                    {item.date ? `${item.date} @ ${item.location}` : (item.abstract || item.desc_text || '—')}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="hover:text-gold-custom transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleElimina(item.id)} className="hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalNuovoContenuto 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={activeTab} 
        editData={selectedItem}
        onRefresh={fetchData}
      />
    </div>
  );
};

export default AdminDashboard;