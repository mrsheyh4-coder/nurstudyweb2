import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { signOut } from '../lib/authService.js';

export default function Header({ darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const displayName = profile?.first_name || null;

  async function handleLogout() {
    await signOut();
    navigate('/');
  }

  const links = useMemo(
    () => [
      [t('nav.whyUs'), '#why-us'],
      [t('nav.universities'), '#universities'],
      [t('nav.countries'), '#countries'],
      [t('nav.scholarships'), '#scholarships'],
      [t('nav.about'), '#about'],
    ],
    [t],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <nav className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="#home" className="flex items-center">
          <img src="/logo.svg" alt="NurStudy" className="h-12 bg-white rounded-xl py-1 px-2" />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-brand-600 dark:text-slate-300">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            {['EN', 'RU', 'UZ'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
                  language === item
                    ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-900/5 dark:bg-brand-600 dark:text-white dark:ring-0'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label={darkMode ? t('header.light') : t('header.dark')}
            title={darkMode ? t('header.light') : t('header.dark')}
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${darkMode ? 'rotate-[-90deg] scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${darkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-[90deg] scale-0 opacity-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            </div>
          </button>
          {user && displayName ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">👋 {displayName}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-bold text-slate-400 hover:text-red-500 transition"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost">{t('header.login')}</Button>
              <Button as={Link} to="/signup">{t('header.signUp')}</Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-white lg:hidden"
        >
          {t('header.menu')}
        </button>
      </nav>

      {open ? (
        <div className="section-shell pb-5 lg:hidden">
          <div className="grid gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-slate-900">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/10">
                {label}
              </a>
            ))}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {['EN', 'RU', 'UZ'].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setLanguage(item)}
                  className={`rounded-xl px-3 py-2 text-sm font-bold ${language === item ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile auth buttons */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 mt-2">
              {user && displayName ? (
                <div className="flex items-center justify-between px-1 py-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-white">👋 {displayName}</span>
                  <button
                    type="button"
                    onClick={() => { handleLogout(); setOpen(false); }}
                    className="text-sm font-bold text-red-500 hover:underline"
                  >
                    Chiqish
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button as={Link} to="/login" variant="secondary" className="w-full justify-center" onClick={() => setOpen(false)}>
                    {t('header.login')}
                  </Button>
                  <Button as={Link} to="/signup" className="w-full justify-center" onClick={() => setOpen(false)}>
                    {t('header.signUp')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
