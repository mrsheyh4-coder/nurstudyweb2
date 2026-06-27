import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Select from '../components/Select';
import { sendSmsCode } from '../lib/smsService.js';
import { signUp } from '../lib/authService.js';
import { toast } from '../components/Toast.jsx';

const PROGRAM_OPTIONS = [
  'Kompyuter fanlari',
  'Biznes',
  'Muhandislik',
  'Tibbiyot',
  'Moliya',
  'Dizayn',
  'Gumanitar fanlar'
];

const DEGREE_OPTIONS = [
  { value: 'Bakalavr', label: 'Bakalavr' },
  { value: 'Magistratura', label: 'Magistratura' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Sertifikat', label: 'Sertifikat' }
];

export default function Signup() {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: '+998 ',
    password: '',
    confirmPassword: '',
    otpCode: '',
    firstName: '',
    lastName: '',
    programs: [],
    degree: 'Bakalavr'
  });

  const [agreed, setAgreed] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [loadingSms, setLoadingSms] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  function startCountdown() {
    setCountdown(59);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // Sync dark mode
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  async function handleNext(e) {
    e?.preventDefault();
    
    // BASIC VALIDATION
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        toast("Parollar mos kelmadi!", 'error');
        return;
      }
      if (formData.phone.replace(/[^0-9]/g, '').length < 12) {
        toast("Telefon raqamni to'liq kiriting!", 'error');
        return;
      }
      
      // SEND SMS
      setLoadingSms(true);
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
      
      const res = await sendSmsCode(formData.phone, code);
      setLoadingSms(false);
      
      if (!res.success) {
        toast("SMS yuborishda xatolik. Keyinroq urinib ko'ring.", 'error');
        return;
      }
      toast(`SMS kod yuborildi: ${formData.phone}`, 'info');
      setStep(2);
      startCountdown();
      return;
    }

    if (step === 2) {
      if (formData.otpCode !== generatedCode) {
        toast("SMS kod noto'g'ri! Qayta tekshiring.", 'error');
        return;
      }
      setStep(3);
      return;
    }
    
    setStep(s => Math.min(s + 1, 5));
  }

  function handlePrev() {
    setStep(s => Math.max(s - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agreed) return;

    const { error } = await signUp({
      phone: formData.phone,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      programs: formData.programs,
      degree: formData.degree,
    });

    if (error) {
      if (error.message?.includes('already registered')) {
        toast("Bu raqam allaqachon ro'yxatdan o'tgan!", 'error');
      } else {
        toast(error.message || "Ro'yxatdan o'tishda xatolik.", 'error');
      }
      return;
    }

    toast("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! 🎉", 'success');
    setTimeout(() => navigate('/'), 1500);
  }

  const toggleProgram = (prog) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.includes(prog) 
        ? prev.programs.filter(p => p !== prog)
        : [...prev.programs, prog]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-xl animate-fade-in">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Platformaga qo'shilish</h1>
            <p className="text-slate-600 dark:text-slate-400">Kelajagingiz uchun birinchi qadamni qo'ying.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-soft">
            
            {/* Progress Bar */}
            <div className="flex items-center mb-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 flex shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    step >= i 
                      ? 'bg-brand-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500'
                  }`}>
                    {i}
                  </div>
                  {i < 5 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                      step > i ? 'bg-brand-600' : 'bg-slate-100 dark:bg-white/5'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={step === 5 ? handleSubmit : handleNext}>
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="animate-fade-in space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Hisob ma'lumotlari</h2>
                  <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                    Telefon raqamingiz
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+998 90 123 45 67"
                      className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    />
                  </label>
                  <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                    Parol
                    <input
                      required
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    />
                  </label>
                  <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                    Parolni tasdiqlang
                    <input
                      required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    />
                  </label>
                </div>
              )}

              {/* STEP 2 - SMS OTP */}
              {step === 2 && (
                <div className="animate-fade-in space-y-4 text-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">SMS kodni kiriting</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <strong>{formData.phone}</strong> raqamiga yuborilgan 4 xonali tasdiqlash kodini kiriting.
                  </p>
                  
                  <div className="flex justify-center">
                    <input
                      required
                      type="text"
                      maxLength={4}
                      value={formData.otpCode}
                      onChange={e => setFormData({ ...formData, otpCode: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="◦ ◦ ◦ ◦"
                      className="w-44 text-center tracking-[0.6em] text-2xl font-black rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  
                  {countdown > 0 ? (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                      Qayta yuborish: <span className="font-bold text-brand-600">0:{countdown.toString().padStart(2, '0')}</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        const code = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedCode(code);
                        await sendSmsCode(formData.phone, code);
                        startCountdown();
                      }}
                      className="mt-4 text-sm font-bold text-brand-600 hover:underline"
                    >
                      Kodni qayta yuborish
                    </button>
                  )}
                  {import.meta.env.DEV && (
                    <p className="mt-4 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-4 py-2">
                      🛠 Test rejimi: Kod brauzer konsolida (F12 → Console)
                    </p>
                  )}
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="animate-fade-in space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Shaxsiy ma'lumotlar</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                      Ism
                      <input
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Ali"
                        className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                      />
                    </label>
                    <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                      Familiya
                      <input
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Valiyev"
                        className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="animate-fade-in space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ta'lim afzalliklari</h2>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                      Nimalarni o'rganmoqchisiz?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROGRAM_OPTIONS.map(prog => {
                        const isSelected = formData.programs.includes(prog);
                        return (
                          <button
                            key={prog}
                            type="button"
                            onClick={() => toggleProgram(prog)}
                            className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                              isSelected 
                                ? 'bg-brand-600 border-brand-600 text-white shadow-md' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-300 dark:bg-slate-950 dark:border-white/10 dark:text-slate-300 dark:hover:border-brand-500'
                            }`}
                          >
                            {prog}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Ta'lim darajasi
                    </label>
                    <Select
                      value={formData.degree}
                      onChange={(val) => setFormData({ ...formData, degree: val })}
                      options={DEGREE_OPTIONS}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="animate-fade-in space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ko'rib chiqish</h2>
                  
                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/5 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
                      <span className="text-slate-500">Ism-Familiya:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
                      <span className="text-slate-500">Telefon:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
                      <span className="text-slate-500">Daraja:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formData.degree}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">Tanlangan yo'nalishlar:</span>
                      <div className="flex flex-wrap gap-1">
                        {formData.programs.length > 0 ? formData.programs.map(p => (
                          <span key={p} className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded text-xs font-bold dark:bg-brand-900/30 dark:text-brand-300">
                            {p}
                          </span>
                        )) : <span className="text-slate-400 italic">Tanlanmagan</span>}
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={agreed} 
                      onChange={e => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 leading-tight">
                      Men <a href="#" className="text-brand-600 hover:underline">Foydalanish shartlari</a> va <a href="#" className="text-brand-600 hover:underline">Maxfiylik siyosatiga</a> roziman.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex gap-3">
                  {step > 1 && (
                    <Button type="button" variant="secondary" onClick={handlePrev} className="px-6">
                      Orqaga
                    </Button>
                  )}
                  <Button type="submit" className="flex-1" disabled={(step === 5 && !agreed) || loadingSms}>
                    {loadingSms ? "SMS Yuborilmoqda..." : step === 5 ? "Ro'yxatdan o'tish" : "Davom etish"}
                  </Button>
                </div>
                {step === 4 && (
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-center py-1"
                  >
                    O'tkazib yuborish →
                  </button>
                )}
              </div>

            </form>

            {step === 1 && (
              <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                Hisobingiz bormi? <Link to="/admin/login" className="font-bold text-brand-600 hover:underline">Kirish</Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
