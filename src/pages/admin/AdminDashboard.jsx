import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCountriesResolved, getUniversitiesResolved, subscribeSiteData } from '../../lib/siteData.js';

export default function AdminDashboard() {
  const [uni, setUni] = useState(() => getUniversitiesResolved());
  const [countries, setCountries] = useState(() => getCountriesResolved());

  useEffect(() => {
    return subscribeSiteData(() => {
      setUni(getUniversitiesResolved());
      setCountries(getCountriesResolved());
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-950 dark:text-white">Boshqaruv paneli</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
        O'zgarishlar to'g'ridan-to'g'ri <strong>Supabase</strong> orqali barcha uchun saqlanadi. Ma'lumotlaringiz xavfsiz va hammaga ko'rinadigan qilib sozlangan.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/universities"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:hover:border-brand-500"
        >
          <p className="text-sm font-bold text-brand-600">Universitetlar</p>
          <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{uni.length}</p>
          <p className="mt-2 text-xs text-slate-500">Faol universitetlar</p>
        </Link>
        <Link
          to="/admin/countries"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:hover:border-brand-500"
        >
          <p className="text-sm font-bold text-brand-600">Mamlakatlar</p>
          <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{countries.length}</p>
          <p className="mt-2 text-xs text-slate-500">Faol mamlakatlar</p>
        </Link>
      </div>
    </div>
  );
}
