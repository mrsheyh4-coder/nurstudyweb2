import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { adminLogin, getConfiguredPassword, isAdminSession } from '../../admin/auth.js';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  if (isAdminSession()) {
    return <Navigate to={from === '/admin/login' ? '/admin' : from} replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (adminLogin(password)) {
      navigate(from, { replace: true });
      return;
    }
    setError('Parol noto‘g‘ri.');
  }

  const devHint = import.meta.env.DEV && !import.meta.env.VITE_ADMIN_PASSWORD;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-slate-900">
        <img src="/logo.svg" alt="NurStudy" className="h-10 bg-white rounded-lg px-2 py-1 mb-2" />
        <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">Admin kirish</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Tizimga kirish uchun parolni kiriting.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            Parol
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </label>
          {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full">
            Kirish
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="font-semibold text-brand-600 hover:underline">
            Saytga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
}
