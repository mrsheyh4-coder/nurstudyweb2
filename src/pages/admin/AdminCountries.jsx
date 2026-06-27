import { useMemo, useState, useEffect } from 'react';
import Button from '../../components/Button.jsx';
import { getCountriesResolved, saveCountriesOverride, subscribeSiteData } from '../../lib/siteData.js';
import { supabase } from '../../lib/supabase.js';
import { compressImage } from '../../lib/compressImage.js';

function intakesToString(intakes) {
  return Array.isArray(intakes) ? intakes.join(', ') : '';
}

function parseIntakes(value) {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const EMPTY_FORM = {
  _id: '',
  name: '',
  universities: '0+',
  intakes: '',
  description: '',
  imageUrl: '',
  capital: '',
  language: '',
  currency: '',
  population: '',
};

export default function AdminCountries() {
  const [items, setItems] = useState(() => getCountriesResolved());
  
  useEffect(() => {
    return subscribeSiteData(() => {
      setItems(getCountriesResolved());
    });
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // View State
  const [view, setView] = useState('list'); // 'list' or 'form'
  
  // Form State
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [isEditing, setIsEditing] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const lower = searchTerm.toLowerCase();
    return items.filter(i => (i.name || '').toLowerCase().includes(lower));
  }, [items, searchTerm]);

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
    setFormData({
      ...item,
      intakes: intakesToString(item.intakes),
    });
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAddNew() {
    setIsEditing(false);
    setFormData({ ...EMPTY_FORM });
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRemove(id) {
    const next = items.filter((r) => r._id !== id);
    setItems(next);
    saveCountriesOverride(next);
    if (formData._id === id) {
      handleCancel();
    }
  }

  function handleCancel() {
    setIsEditing(false);
    setFormData({ ...EMPTY_FORM });
    setView('list');
  }

  function handleSaveForm(e) {
    e.preventDefault();
    
    const newRecord = {
      ...formData,
      intakes: parseIntakes(formData.intakes),
      _id: isEditing ? formData._id : Math.random().toString(36).substr(2, 9),
    };

    let nextItems;
    if (isEditing) {
      nextItems = items.map(item => item._id === formData._id ? newRecord : item);
    } else {
      nextItems = [newRecord, ...items];
    }

    setItems(nextItems);
    saveCountriesOverride(nextItems);
    handleCancel();
  }

  return (
    <div>
      {view === 'list' ? (
        <div className="animate-fade-in">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-950 dark:text-white">Mamlakatlar</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Ro'yxatni boshqarish paneli.
              </p>
            </div>
            <Button onClick={handleAddNew}>+ Yangi qo'shish</Button>
          </div>

          <input
            type="text"
            placeholder="Qidirish (nomi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 w-full sm:max-w-md rounded-full border border-slate-200 bg-white px-5 py-3 text-sm outline-none transition focus:border-brand-500 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-white"
          />

          <div className="grid gap-4">
            {filteredItems.map((row) => (
              <div
                key={row._id}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  {row.imageUrl ? (
                    <img src={row.imageUrl} alt={row.name} className="h-14 w-14 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                      Rasm
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{row.name}</h3>
                    <p className="text-xs text-slate-500">{row.capital ? row.capital + ' • ' : ''}{row.universities} universitet</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditItem(row)}
                    className="rounded-full bg-brand-50 px-4 py-2 text-xs font-bold text-brand-600 transition hover:bg-brand-100 dark:bg-brand-500/20 dark:text-brand-400"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleRemove(row._id)}
                    className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-500/20 dark:text-red-400"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-10">Hech narsa topilmadi.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isEditing ? "Mamlakatni Tahrirlash" : "Yangi Mamlakat Qo'shish"}
            </h2>
            <button onClick={handleCancel} className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              ← Orqaga
            </button>
          </div>
          
          <form onSubmit={handleSaveForm} className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Nomi (kalit) *
                <input
                  required
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Masalan: Poland"
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Uni. soni (badge)
                <input
                  value={formData.universities}
                  onChange={(e) => handleFormChange('universities', e.target.value)}
                  placeholder="24+"
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>
            </div>

            <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
              Qabul oylari (vergul bilan)
              <input
                value={formData.intakes}
                onChange={(e) => handleFormChange('intakes', e.target.value)}
                placeholder="September, March"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Poytaxti
                <input
                  value={formData.capital}
                  onChange={(e) => handleFormChange('capital', e.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Tili
                <input
                  value={formData.language}
                  onChange={(e) => handleFormChange('language', e.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Valyutasi
                <input
                  value={formData.currency}
                  onChange={(e) => handleFormChange('currency', e.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                Aholisi
                <input
                  value={formData.population}
                  onChange={(e) => handleFormChange('population', e.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>
            </div>

            <label className="grid gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
              Rasm (URL)
              <div className="flex gap-2">
                <input
                  value={formData.imageUrl}
                  onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  placeholder="URL yoki rasm yuklang..."
                  className="flex-1 min-w-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
                <label className="flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-200 px-4 text-xs font-bold transition hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20">
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
              Tavsif
              <textarea
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                rows={3}
                className="resize-y rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <div className="mt-8 flex gap-3">
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
