import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ModalNuovoContenuto from '../../components/admin/ModalNuovoContenuto';
import { 
  LogOut, Plus, BookOpen, Calendar, 
  Image as ImageIcon, Edit2, Trash2, 
  Sparkles, Link2, Loader2 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('articoli'); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data: result, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setData(result || []);
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
    if (window.confirm(`Vuoi eliminare definitivamente questo elemento da ${activeTab}?`)) {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  const handleSmartImport = async () => {
    if (!importUrl) return;
    setIsImporting(true);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(importUrl)}`;
      const response = await fetch(proxyUrl);
      const resData = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(resData.contents, 'text/html');
      const entryContent = doc.querySelector('.entry-content');

      if (!entryContent) throw new Error("Contenuto WordPress non trovato");

      // Pulizia elementi di disturbo
      const noise = entryContent.querySelectorAll('.sharedaddy, .sd-sharing-enabled, .wpcnt, .jp-relatedposts, script, style, .social-share');
      noise.forEach(el => el.remove());

      const blocchiStrutturati = [];
      Array.from(entryContent.children).forEach(el => {
        if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'UL', 'OL'].includes(el.tagName)) {
          const testo = el.innerText.trim();
          if (testo) blocchiStrutturati.push({ tipo: 'testo', valore: testo });
        } 
        const imgElement = el.tagName === 'IMG' ? el : el.querySelector('img');
        if (imgElement) {
          const src = imgElement.getAttribute('data-orig-file') || imgElement.getAttribute('data-lazy-src') || imgElement.getAttribute('src') || imgElement.src;
          if (src && src.startsWith('http') && !src.includes('pixel.wp.com')) {
            blocchiStrutturati.push({ tipo: 'immagine', valore: src });
          }
        }
      });

      const titolo = doc.querySelector('.entry-title')?.innerText.trim() || 'Senza Titolo';
      const firstImage = blocchiStrutturati.find(b => b.tipo === 'immagine')?.valore || '';

      const { error } = await supabase.from('articoli').insert([{
        titolo,
        contenuto: JSON.stringify(blocchiStrutturati),
        abstract: blocchiStrutturati.find(b => b.tipo === 'testo')?.valore.slice(0, 160) + '...',
        image_url: firstImage,
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;
      setImportUrl('');
      fetchData();
      alert(`Importazione completata con successo!`);
    } catch (err) {
      alert("Errore importazione: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="p-10 bg-[#F9F8F6] min-h-screen pt-32 text-midnight font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-midnight/10 mb-10 gap-8 overflow-x-auto pb-2 text-[10px] uppercase tracking-widest font-bold">
          {['articoli', 'eventi', 'visioni'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`pb-4 flex items-center gap-2 ${activeTab === tab ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]' : 'opacity-40 hover:opacity-100 transition-all'}`}>
              {tab === 'articoli' && <BookOpen size={14}/>}
              {tab === 'eventi' && <Calendar size={14}/>}
              {tab === 'visioni' && <ImageIcon size={14}/>}
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif italic capitalize">{activeTab}</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mt-1">Thetis Content Management</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}
              className="bg-[#D4AF37] text-white px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
              <Plus size={14} /> Nuovo {activeTab.slice(0, -1)}
            </button>
            <button onClick={handleLogout} className="p-3 border border-black/10 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {activeTab === 'articoli' && (
          <div className="mb-10 p-8 bg-white border border-[#D4AF37]/20 shadow-sm rounded-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="Incolla link WordPress (es. Il telaio di Penelope...)" 
                className="flex-1 bg-[#F9F8F6] border-b border-black/10 p-3 font-serif italic text-lg outline-none focus:border-[#D4AF37]"
                value={importUrl} onChange={(e) => setImportUrl(e.target.value)}
              />
              <button onClick={handleSmartImport} disabled={isImporting || !importUrl} className="bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest flex items-center gap-3 disabled:opacity-30 transition-all">
                {isImporting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
                Importa Articolo
              </button>
            </div>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-black/5">
          <table className="w-full text-left">
            <thead className="bg-black text-white text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="p-6">Titolo / Nome</th>
                <th className="p-6 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="2" className="p-10 text-center italic font-serif">Caricamento in corso...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="2" className="p-10 text-center italic opacity-30 font-serif">Nessun elemento presente in questa sezione</td></tr>
              ) : (
                data.map(item => (
                  <tr key={item.id} className="border-b hover:bg-[#F9F8F6] transition-colors group">
                    <td className="p-6 font-serif italic text-xl">
                      {item.titolo || item.title || "Senza titolo"}
                    </td>
                    <td className="p-6 text-right flex justify-end gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="hover:text-[#D4AF37]">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleElimina(item.id)} className="hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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