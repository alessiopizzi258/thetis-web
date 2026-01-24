import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Save, Loader2, Upload, Trash2, BookOpen, Calendar, Eye } from 'lucide-react';

const ModalNuovoContenuto = ({ isOpen, onClose, onRefresh, type, editData }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ gallery: [] });

  useEffect(() => {
    if (editData && isOpen) {
      setForm({ ...editData, gallery: editData.gallery || [] });
    } else {
      setForm({ gallery: [] });
    }
  }, [editData, isOpen, type]);

  if (!isOpen) return null;

  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      const files = Array.from(event.target.files);
      if (files.length === 0) return;

      const newUrls = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${type}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('immagini')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('immagini').getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }

      const updatedGallery = [...(form.gallery || []), ...newUrls];
      const mainImageField = type === 'articoli' ? 'image_url' : 'img';

      setForm({ 
        ...form, 
        gallery: updatedGallery,
        [mainImageField]: form[mainImageField] || newUrls[0] 
      });
    } catch (error) {
      alert("Errore upload: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedGallery = form.gallery.filter((_, i) => i !== index);
    setForm({ ...form, gallery: updatedGallery });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      delete payload.id;
      delete payload.created_at;

      const { error } = editData 
        ? await supabase.from(type).update(payload).eq('id', editData.id)
        : await supabase.from(type).insert([payload]);

      if (error) throw error;
      onRefresh();
      onClose();
    } catch (err) {
      alert("Errore salvataggio: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 text-midnight">
      <div className="bg-white w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER CON ICONA DISTINTIVA */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F9F8F6]">
          <div className="flex items-center gap-3">
            {type === 'articoli' && <BookOpen className="text-[#D4AF37]" size={20} />}
            {type === 'eventi' && <Calendar className="text-[#D4AF37]" size={20} />}
            {type === 'visioni' && <Eye className="text-[#D4AF37]" size={20} />}
            <div>
              <h2 className="text-2xl font-serif italic capitalize">Gestione {type}</h2>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Thetis Administration</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-all p-2 opacity-30"><X size={24}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto">
          
          {/* 1. SEZIONE TITOLO (Sempre presente ma con label diversa) */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">
              {type === 'articoli' ? 'Titolo Articolo' : type === 'eventi' ? 'Nome Evento' : 'Titolo Visione'}
            </label>
            <input 
              required 
              className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#D4AF37] outline-none font-serif text-xl italic"
              value={type === 'articoli' ? (form.titolo || '') : (form.title || '')}
              onChange={(e) => setForm({...form, [type === 'articoli' ? 'titolo' : 'title']: e.target.value})} 
            />
          </div>

          {/* 2. SEZIONE GALLERY (Universale per mostrare le foto caricate) */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic">Galleria Immagini</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-sm hover:bg-[#F9F8F6] cursor-pointer transition-all">
                {uploading ? <Loader2 className="animate-spin text-[#D4AF37]" /> : <Upload size={18} className="opacity-20" />}
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
              </label>

              {form.gallery && form.gallery.map((url, i) => (
                <div key={i} className="relative aspect-square group border border-black/5 overflow-hidden shadow-sm">
                  <img src={url} className="w-full h-full object-cover" alt="preview" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={10} />
                  </button>
                  {(form.image_url === url || form.img === url) && (
                    <div className="absolute bottom-0 inset-x-0 bg-[#D4AF37] text-[7px] text-white text-center font-bold uppercase py-0.5">Copertina</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. CAMPI DISTINTI PER CATEGORIA */}
          
          {/* --- DISTINZIONE: EVENTI --- */}
          {type === 'eventi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic text-[#D4AF37]">Data dell'incontro</label>
                <input required className="w-full border-b border-black/10 py-2 outline-none font-serif italic text-sm" 
                  placeholder="es: 20 Gennaio 2026" value={form.date || ''} onChange={(e) => setForm({...form, date: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic text-[#D4AF37]">Luogo / Istituzione</label>
                <input required className="w-full border-b border-black/10 py-2 outline-none font-serif italic text-sm" 
                  placeholder="es: Consultorio H12, Melito" value={form.location || ''} onChange={(e) => setForm({...form, location: e.target.value})} />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic">Racconto dell'evento</label>
                <textarea rows="4" className="w-full bg-[#F9F8F6] p-4 font-serif text-lg leading-relaxed outline-none border border-black/5"
                  value={form.desc_text || ''} onChange={(e) => setForm({...form, desc_text: e.target.value})} />
              </div>
            </div>
          )}

          {/* --- DISTINZIONE: VISIONI --- */}
          {type === 'visioni' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic text-[#D4AF37]">Anno / Periodo Progetto</label>
                  <input className="w-full border-b border-black/10 py-2 outline-none font-serif italic text-sm" 
                    placeholder="es: 2025-2026" value={form.anno || ''} onChange={(e) => setForm({...form, anno: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic text-[#D4AF37]">Curatore / Referente</label>
                  <input className="w-full border-b border-black/10 py-2 outline-none font-serif italic text-sm" 
                    placeholder="es: Teresa Romeo" value={form.curatore || ''} onChange={(e) => setForm({...form, curatore: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic text-[#D4AF37]">Crediti (es: Costumi di Penelope Polveredifata)</label>
                <input className="w-full border-b border-black/10 py-2 outline-none font-serif italic text-sm" 
                  value={form.crediti || ''} onChange={(e) => setForm({...form, crediti: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic text-[#D4AF37]">Descrizione Progetto</label>
                <textarea rows="4" className="w-full bg-[#F9F8F6] p-4 font-serif text-lg leading-relaxed outline-none border border-black/5"
                  value={form.desc_text || ''} onChange={(e) => setForm({...form, desc_text: e.target.value})} />
              </div>
            </div>
          )}

          {/* --- DISTINZIONE: ARTICOLI (Solo nota informativa) --- */}
          {type === 'articoli' && (
            <div className="p-4 bg-gold-custom/5 border border-gold-custom/20 rounded-sm italic font-serif text-sm opacity-60">
              Gli articoli della rivista "La Ginestra" vengono solitamente importati tramite link. 
              Qui puoi caricare foto extra per la gallery dell'articolo o modificare il titolo.
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || uploading} 
            className="w-full bg-black text-white py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 mt-4 shadow-xl disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
            Pubblica in {type}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalNuovoContenuto;