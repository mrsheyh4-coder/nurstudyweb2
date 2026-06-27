import { useState, useEffect } from 'react';
import Button from './Button';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../hooks/useAuth.js';

export default function ConsultationModal({ isOpen, onClose }) {
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    certificate: '',
    direction: '',
    budget: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Agar foydalanuvchi tizimga kirgan bo'lsa — avtomatik to'ldirish
  useEffect(() => {
    if (user || profile) {
      setFormData(prev => ({
        ...prev,
        name: profile
          ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
          : prev.name,
        phone: user?.phone || prev.phone,
      }));
    }
  }, [user, profile]);

  if (!isOpen) return null;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('applications').insert([
      {
        name: formData.name,
        phone: formData.phone,
        age: formData.age ? Number(formData.age) : null,
        certificate: formData.certificate || null,
        direction: formData.direction || null,
        budget: formData.budget || null,
        notes: formData.notes || null,
      },
    ]);

    setLoading(false);
    if (error) {
      alert("Xatolik yuz berdi. Iltimos keyinroq qayta urinib ko'ring.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', phone: '', age: '', certificate: '', direction: '', budget: '', notes: '' });
        onClose();
      }, 3000);
    }
  }

  const isLoggedIn = !!user;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] w-full max-w-md p-5 shadow-2xl relative my-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          ×
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Arizangiz qabul qilindi!</h2>
            <p className="text-slate-600 dark:text-slate-400">Tez orada mutaxassislarimiz siz bilan bog'lanadi.</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-1">🎓 O'qimoqchiman</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Ma'lumotlaringizni qoldiring, biz sizga yordam beramiz.
            </p>

            <form onSubmit={handleSubmit} className="grid gap-3">

              {/* Ism */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Ism-Familiya *
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ismingizni kiriting"
                  readOnly={isLoggedIn && !!formData.name}
                  className={`rounded-full border px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white ${
                    isLoggedIn && formData.name
                      ? 'border-green-300 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 cursor-default'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                />
                {isLoggedIn && formData.name && (
                  <span className="text-xs text-green-600 font-normal ml-1">✓ Hisobingizdan avtomatik to'ldirildi</span>
                )}
              </label>

              {/* Telefon */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Telefon raqam *
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                  readOnly={isLoggedIn && !!formData.phone}
                  className={`rounded-full border px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white ${
                    isLoggedIn && formData.phone
                      ? 'border-green-300 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 cursor-default'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                />
                {isLoggedIn && formData.phone && (
                  <span className="text-xs text-green-600 font-normal ml-1">✓ Hisobingizdan avtomatik to'ldirildi</span>
                )}
              </label>

              {/* Yosh */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Yoshingiz *
                <input
                  required
                  name="age"
                  type="number"
                  min="14"
                  max="60"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Masalan: 20"
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              {/* Sertifikat */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Til sertifikati bormi?
                <select
                  name="certificate"
                  value={formData.certificate}
                  onChange={handleChange}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                >
                  <option value="">Tanlang...</option>
                  <option value="Yo'q">Yo'q</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="Duolingo">Duolingo English Test</option>
                  <option value="SAT">SAT</option>
                  <option value="HSK">HSK (Xitoy tili)</option>
                  <option value="TOPIK">TOPIK (Koreys tili)</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </label>

              {/* Yo'nalish */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Qiziqtirgan yo'nalish *
                <input
                  required
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  placeholder="Masalan: IT, Tibbiyot, Biznes..."
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              {/* Byudjet */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Taxminiy byudjet (yillik)
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                >
                  <option value="">Tanlang...</option>
                  <option value="3000$ gacha">3 000 $ gacha</option>
                  <option value="3000-5000$">3 000 – 5 000 $</option>
                  <option value="5000-10000$">5 000 – 10 000 $</option>
                  <option value="10000-20000$">10 000 – 20 000 $</option>
                  <option value="20000$+">20 000 $ dan yuqori</option>
                </select>
              </label>

              {/* Qo'shimcha izoh */}
              <label className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Qo'shimcha izoh (ixtiyoriy)
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Qo'shimcha ma'lumot, savol yoki istak..."
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white resize-none"
                />
              </label>

              <Button type="submit" className="mt-1 w-full py-2.5 text-sm" disabled={loading}>
                {loading ? 'Yuborilmoqda...' : '📩 Ariza qoldirish'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
