import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { signIn } from '../lib/authService.js';
import { toast } from '../components/Toast.jsx';

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!phone || !password) return;

    setLoading(true);
    const { error } = await signIn({ phone, password });
    setLoading(false);

    if (error) {
      if (error.message?.includes('Invalid login')) {
        toast("Telefon raqam yoki parol noto'g'ri!", 'error');
      } else {
        toast(error.message || "Kirishda xatolik yuz berdi.", 'error');
      }
      return;
    }

    toast("Xush kelibsiz! 👋", 'success');
    setTimeout(() => navigate('/'), 1000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md animate-fade-in">

          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-600/30">
              <span className="text-2xl font-black text-white">N</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Xush kelibsiz!</h1>
            <p className="text-slate-600 dark:text-slate-400">Hisobingizga kirish uchun ma'lumotlarni kiriting.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-4">

              <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                Telefon raqam
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="block grid gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                Parol
                <input
                  required
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none transition focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <div className="flex justify-end">
                <button type="button" className="text-sm font-bold text-brand-600 hover:underline">
                  Parolni unutdingizmi?
                </button>
              </div>

              <Button type="submit" className="w-full mt-2 py-3" disabled={loading}>
                {loading ? "Kirish..." : "Kirish"}
              </Button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Hisobingiz yo'qmi?{' '}
              <Link to="/signup" className="font-bold text-brand-600 hover:underline">
                Ro'yxatdan o'tish
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
