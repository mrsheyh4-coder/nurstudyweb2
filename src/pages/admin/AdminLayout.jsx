import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../admin/auth.js';

const navClass = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-sm font-bold transition ${
    isActive ? 'bg-white text-brand-700 shadow-sm' : 'text-sky-100 hover:bg-white/10'
  }`;

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-56 shrink-0 flex-col bg-brand-700 py-8 text-white md:flex">
          <div className="px-4">
            <img src="/logo.svg" alt="NurStudy" className="h-8 bg-white rounded px-1 py-0.5" />
            <p className="mt-2 text-lg font-black">Admin</p>
          </div>
          <nav className="mt-8 flex flex-col gap-1 px-3">
            <NavLink to="/admin" end className={navClass}>
              Bosh sahifa
            </NavLink>
            <NavLink to="/admin/users" className={navClass}>
              Ro'yxatdan o'tganlar
            </NavLink>
            <NavLink to="/admin/applications" className={navClass}>
              Leadlar / Arizalar
            </NavLink>
            <NavLink to="/admin/testimonials" className={navClass}>
              Mijozlar Fikri
            </NavLink>
            <NavLink to="/admin/universities" className={navClass}>
              Universitetlar
            </NavLink>
            <NavLink to="/admin/countries" className={navClass}>
              Mamlakatlar
            </NavLink>
          </nav>
          <div className="mt-auto space-y-2 px-3 pt-8">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl px-4 py-3 text-sm font-bold text-sky-100 hover:bg-white/10"
            >
              Saytni ochish ↗
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-sky-100 hover:bg-white/10"
            >
              Chiqish
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-slate-900 md:hidden">
            <p className="font-black text-slate-950 dark:text-white">Admin</p>
            <div className="flex gap-2">
              <a href="/" className="text-sm font-bold text-brand-600">
                Sayt
              </a>
              <button type="button" onClick={handleLogout} className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Chiqish
              </button>
            </div>
          </header>
          <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900 md:hidden">
            <nav className="flex flex-wrap gap-2">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-bold ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white'}`
                }
              >
                Bosh
              </NavLink>
              <NavLink
                to="/admin/applications"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-bold ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white'}`
                }
              >
                O'tganlar
              </NavLink>
              <NavLink
                to="/admin/testimonials"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-bold ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white'}`
                }
              >
                Fikrlar
              </NavLink>
              <NavLink
                to="/admin/universities"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-bold ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white'}`
                }
              >
                Vuzlar
              </NavLink>
              <NavLink
                to="/admin/countries"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-bold ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white'}`
                }
              >
                Davlatlar
              </NavLink>
            </nav>
          </div>
          <main className="flex-1 p-4 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
