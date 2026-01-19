import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X } from 'lucide-react';

const ModalNuovoArticolo = ({ isOpen, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ titolo: '', abstract: '', contenuto: '' });
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // 1. Upload Immagine (se presente)
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('immagini-articoli')
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        
        // Ottieni URL pubblico
        const { data: urlData } = supabase.storage
          .from('immagini-articoli')
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      // 2. Salva dati nel Database
      const { error } = await supabase.from('articoli').insert([
        { 
          titolo: form.titolo, 
          abstract: form.abstract, 
          contenuto: form.contenuto, 
          image_url: imageUrl 
        }
      ]);

      if (error) throw error;

      alert("Articolo pubblicato con successo!");
      onRefresh(); // Aggiorna la tabella nella Dashboard
      onClose();   // Chiudi il modal
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-midnight/90 backdrop-blur-sm p-4">
      <div className="bg-ivory w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gold-custom/10">
          <h2 className="text-2xl font-serif italic text-midnight">Nuovo Articolo</h2>
          <button onClick={onClose} className="text-midnight hover:text-gold-custom transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input 
            type="text" 
            placeholder="Titolo dell'articolo"
            className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-gold-custom outline-none font-serif text-xl italic"
            onChange={(e) => setForm({...form, titolo: e.target.value})}
            required
          />
          <textarea 
            placeholder="Abstract (Breve descrizione)"
            className="w-full bg-transparent border border-midnight/10 p-4 h-24 focus:border-gold-custom outline-none font-light text-sm"
            onChange={(e) => setForm({...form, abstract: e.target.value})}
          />
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Immagine di copertina</label>
            <input 
              type="file" 
              accept="image/*"
              className="text-xs font-mono"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-midnight text-ivory py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold-custom transition-all"
          >
            {loading ? 'Pubblicazione in corso...' : 'Pubblica Articolo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalNuovoArticolo;