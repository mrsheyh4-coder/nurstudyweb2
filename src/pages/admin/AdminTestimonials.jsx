import { useState, useEffect } from 'react';
import Button from '../../components/Button.jsx';
import { supabase } from '../../lib/supabase.js';
import { compressImage } from '../../lib/compressImage.js';

const EMPTY_FORM = {
  id: '',
  name: '',
  university: '',
  text: '',
  imageUrl: '',
};

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  }

  function handleFormChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(file) {
    if (!file) return;

    const optimizedFile = await compressImage(file);
    const fileExt = optimizedFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage.from('images').upload(filePath, optimizedFile);
    
    if (error) {
      alert("Rasm yuklashda xatolik yuz berdi! Iltimos qayta urinib ko'ring.");
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
    handleFormChange('imageUrl', publicUrl);
  }

  function handleEditItem(item) {
    setIsEditing(true);
    setFormData({ ...item });
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAddNew() {
    setIsEditing(false);
    setFormData({ ...EMPTY_FORM });
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleRemove(id) {
    if(!window.confirm("Rostdan ham bu fikrni o'chirib tashlamoqchimisiz?")) return;
    
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      setItems(prev => prev.filter(r => r.id !== id));
      if (formData.id === id) handleCancel();
    }
  }

  function handleCancel() {
    setIsEditing(false);
    setFormData({ ...EMPTY_FORM });
    setView('list');
  }

  async function handleSaveForm(e) {
    e.preventDefault();
    
    if (isEditing) {
      const { id, created_at, ...updateData } = formData;
      const { error } = await supabase.from('testimonials').update(updateData).eq('id', formData.id);
      if(!error) {
        setItems(prev => prev.map(item => item.id === formData.id ? { ...item, ...updateData } : item));
      }
    } else {
      const { id, ...insertData } = formData;
      const { data, error } = await supabase.from('testimonials').insert([insertData]).select();
      if(!error && data) {
        setItems([data[0], ...items]);
      }
    }

    handleCancel();
  }

  return (
    <div>
      {view === 'list' ? (
        <div className="animate-fade-in">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-950 dark:text-white">Mijozlar Fikri</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Saytda ko'rsatiladigan o'quvchilarning video/rasm va fikrlari.
              </p>
            </div>
            <Button onClick={handleAddNew}>+ Yangi fikr qo'shish</Button>
          </div>

          {loading ? (
             <p className="text-slate-500">Yuklanmoqda...</p>
          ) : (
            <div className="grid gap-4">
              {items.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col md:flex-row gap-4 md:items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900"
                >
                  <div className="flex items-start gap-4">
                    {row.imageUrl ? (
                      <img src={row.imageUrl} alt={row.name} className="h-16 w-16 shrink-0 rounded-full object-cover shadow-sm" />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400 dark:bg-slate-800">
                        Rasm yo'q
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{row.name}</h3>
                      <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-1">{row.university}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{row.text}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0 self-end md:self-auto mt-4 md:mt-0">
                    <button
                      onClick={() => handleEditItem(row)}
                      className="rounded-full bg-brand-50 px-4 py-2 text-xs font-bold text-brand-600 transition hover:bg-brand-100 dark:bg-brand-500/20 dark:text-brand-400"
                    >
                      Tahrirlash
                    </button>
                    <button
                      onClick={() => handleRemove(row.id)}
                      className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-500/20 dark:text-red-400"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-12 rounded-3xl border border-slate-200 border-dashed dark:border-white/10">
                  <p className="text-slate-500 font-medium">Hozircha mijozlar fikri qo'shilmagan.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-fade-in max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isEditing ? "Fikrni Tahrirlash" : "Yangi Fikr Qo'shish"}
            </h2>
            <button onClick={handleCancel} className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              ← Orqaga
            </button>
          </div>
          
          <form onSubmit={handleSaveForm} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                O'quvchining Ism-Familiyasi *
                <input
                  required
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Masalan: Sardor Rustamov"
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                O'qishga kirgan joyi *
                <input
                  required
                  value={formData.university}
                  onChange={(e) => handleFormChange('university', e.target.value)}
                  placeholder="University of Warsaw, Poland"
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>
            </div>

            <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
              Rasm (URL) yoki fayl yuklang
              <div className="flex gap-2">
                <input
                  value={formData.imageUrl}
                  onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  placeholder="Mijoz rasmi..."
                  className="flex-1 min-w-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
                <label className="flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-200 px-6 text-xs font-bold transition hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20">
                  Yuklash
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                </label>
              </div>
            </label>

            <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
              Qoldirgan fikri (Tavsif) *
              <textarea
                required
                value={formData.text}
                onChange={(e) => handleFormChange('text', e.target.value)}
                rows={4}
                placeholder="NurStudy jamoasiga kattakon rahmat! Ular yordamida..."
                className="resize-y rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <div className="mt-4 flex gap-3">
              <Button type="submit" className="flex-1">
                {isEditing ? "O'zgarishlarni Saqlash" : "Qo'shish va Saqlash"}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">
                Bekor Qilish
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
