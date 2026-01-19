import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Upload } from 'lucide-react';

const ModalNuovoArticolo = ({ isOpen, onClose, onRefresh, editData }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ titolo: '', abstract: '', contenuto: '' });
  const [image, setImage] = useState(null);

  // Effetto per caricare i dati in caso di modifica
  useEffect(() => {
    if (editData && isOpen) {
      setForm({
        titolo: editData.titolo || '',
        abstract: editData.abstract || '',
        contenuto: editData.contenuto || ''
      });
    } else if (!editData) {
      setForm({ titolo: '', abstract: '', contenuto: '' });
      setImage(null);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editData?.image_url || '';

      // 1. Upload Nuova Immagine (solo se selezionata)
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('immagini-articoli')
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('immagini-articoli')
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      // 2. Salva o Aggiorna
      if (editData) {
        // MODALITÀ MODIFICA
        const { error } = await supabase
          .from('articoli')
          .update({ 
            titolo: form.titolo, 
            abstract: form.abstract, 
            contenuto: form.contenuto, 
            image_url: imageUrl 
          })
          .eq('id', editData.id);

        if (error) throw error;
        alert("Articolo aggiornato!");
      } else {
        // MODALITÀ NUOVO
        const { error } = await supabase
          .from('articoli')
          .insert([{ 
            titolo: form.titolo, 
            abstract: form.abstract, 
            contenuto: form.contenuto, 
            image_url: imageUrl 
          }]);

        if (error) throw error;
        alert("Articolo pubblicato!");
      }

      onRefresh();
      onClose();
    } catch (err) {
      alert("Errore: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-midnight/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-ivory w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-gold-custom/20">
        <div className="flex justify-between items-center p-6 border-b border-gold-custom/10">
          <h2 className="text-2xl font-serif italic text-midnight">
            {editData ? 'Modifica Articolo' : 'Nuovo Articolo'}
          </h2>
          <button onClick={onClose} className="text-midnight hover:text-gold-custom transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Titolo</label>
            <input 
              type="text" 
              value={form.titolo}
              placeholder="Inserisci il titolo..."
              className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-gold-custom outline-none font-serif text-xl italic text-midnight"
              onChange={(e) => setForm({...form, titolo: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Abstract</label>
            <textarea 
              value={form.abstract}
              placeholder="Una breve introduzione..."
              className="w-full bg-transparent border border-midnight/10 p-4 h-24 focus:border-gold-custom outline-none font-light text-sm text-midnight resize-none"
              onChange={(e) => setForm({...form, abstract: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 flex items-center gap-2">
              <Upload size={12} /> Immagine di copertina
            </label>
            <input 
              type="file" 
              accept="image/*"
              className="text-xs font-mono file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-midnight file:text-ivory hover:file:bg-gold-custom cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {editData?.image_url && !image && (
              <p className="text-[10px] italic opacity-50 text-midnight">Immagine attuale presente. Caricane una nuova per sostituirla.</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-midnight text-ivory py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold-custom transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Elaborazione...' : editData ? 'Aggiorna Articolo' : 'Pubblica Articolo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalNuovoArticolo;