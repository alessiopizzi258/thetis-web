import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Upload } from 'lucide-react';

const ModalNuovoContenuto = ({ isOpen, onClose, onRefresh, type, editData }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  
  // Stato del form flessibile
  const [form, setForm] = useState({});

  useEffect(() => {
    if (editData && isOpen) {
      setForm(editData);
    } else {
      setForm({});
      setImage(null);
    }
  }, [editData, isOpen, type]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.img || form.image_url || '';

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('immagini-articoli')
          .upload(fileName, image);
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('immagini-articoli').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      // Preparazione dati in base alla tabella
      const payload = { ...form };
      if (type === 'articoli') payload.image_url = imageUrl;
      else payload.img = imageUrl;

      // Rimuovi campi di sistema che Supabase non vuole nell'insert/update
      delete payload.id;
      delete payload.created_at;

      const query = editData 
        ? supabase.from(type).update(payload).eq('id', editData.id)
        : supabase.from(type).insert([payload]);

      const { error } = await query;
      if (error) throw error;

      onRefresh();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-midnight/95 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-ivory w-full max-w-xl border border-gold-custom/20 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-midnight/5 flex justify-between items-center">
          <h2 className="text-2xl font-serif italic text-midnight">
            {editData ? 'Modifica' : 'Nuovo'} {type.slice(0, -1)}
          </h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Campi Comuni */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Titolo</label>
            <input 
              required
              className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-gold-custom outline-none font-serif text-lg italic"
              value={form.titolo || form.title || ''}
              onChange={(e) => setForm({...form, [type === 'articoli' ? 'titolo' : 'title']: e.target.value})}
            />
          </div>

          {/* Campi Specifici per ARTICOLI */}
          {type === 'articoli' && (
            <div className="space-y-4">
              <textarea 
                placeholder="Abstract..."
                className="w-full bg-transparent border border-midnight/10 p-3 h-20 text-sm outline-none focus:border-gold-custom"
                value={form.abstract || ''}
                onChange={(e) => setForm({...form, abstract: e.target.value})}
              />
              <textarea 
                placeholder="Contenuto completo..."
                className="w-full bg-transparent border border-midnight/10 p-3 h-40 text-sm outline-none focus:border-gold-custom"
                value={form.contenuto || ''}
                onChange={(e) => setForm({...form, contenuto: e.target.value})}
              />
            </div>
          )}

          {/* Campi Specifici per EVENTI */}
          {type === 'eventi' && (
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Data (es: 24 Maggio 2026)"
                className="bg-transparent border-b border-midnight/20 py-2 text-sm outline-none focus:border-gold-custom"
                value={form.date || ''}
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
              <input 
                placeholder="Luogo (es: Teatro Civico)"
                className="bg-transparent border-b border-midnight/20 py-2 text-sm outline-none focus:border-gold-custom"
                value={form.location || ''}
                onChange={(e) => setForm({...form, location: e.target.value})}
              />
            </div>
          )}

          {/* Campi Specifici per VISIONI */}
          {type === 'visioni' && (
            <textarea 
              placeholder="Descrizione breve..."
              className="w-full bg-transparent border border-midnight/10 p-3 h-20 text-sm outline-none focus:border-gold-custom"
              value={form.desc_text || ''}
              onChange={(e) => setForm({...form, desc_text: e.target.value})}
            />
          )}

          {/* Upload Immagine */}
          <div className="pt-4">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-2">Immagine Correlata</label>
            <input type="file" className="text-[10px]" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-midnight text-ivory py-4 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold-custom transition-all shadow-xl disabled:opacity-30"
          >
            {loading ? 'Salvataggio...' : 'Conferma e Pubblica'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalNuovoContenuto;