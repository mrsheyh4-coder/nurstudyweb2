import { useState, useEffect } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { supabase } from '../lib/supabase.js';

export default function CountryCard({ country }) {
  const { t } = useI18n();
  const [uniCount, setUniCount] = useState(null);

  // DB dagi haqiqiy nom (i18n tarjimasidan oldingi)
  const dbName = country.originalName || country.name;

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from('universities')
        .select('id', { count: 'exact', head: true })
        .eq('country', dbName);
      setUniCount(count ?? 0);
    }
    fetchCount();

    // Real-time: universitetlar qo'shilsa/o'chirilsa/o'zgarsa — avtomatik yangilanadi
    const channel = supabase
      .channel(`uni-count-${dbName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'universities' }, fetchCount)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [dbName]);

  const badge = uniCount === null
    ? '...'
    : uniCount === 0
      ? '0'
      : uniCount > 10
        ? `${uniCount}+`
        : `${uniCount} ta`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/50">
      <Link to={`/country/${dbName}`} className="absolute inset-0 z-10">
        <span className="sr-only">Batafsil {country.name}</span>
      </Link>
      {country.imageUrl ? (
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={country.imageUrl}
            alt={country.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
              e.currentTarget.parentElement.innerHTML = '<span class="text-sm font-medium text-slate-400 dark:text-slate-500">Rasm yuklanmadi</span>';
            }}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="relative flex h-48 w-full shrink-0 items-center justify-center bg-slate-100 dark:bg-slate-800">
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Rasm yo'q</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white line-clamp-1" title={country.name}>{country.name}</h3>
          <span className="shrink-0 rounded-full bg-brand-600 px-3 py-1 text-sm font-black text-white">{badge}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-3">{country.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {country.intakes.map((intake) => (
            <span key={intake} className="rounded-full bg-mint-50 px-3 py-1 text-xs font-bold text-mint-600 dark:bg-mint-500/10 dark:text-mint-300">
              {intake}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Button as="span" variant="secondary" className="w-full">
            {t('countryCard.explore', { name: country.name })}
          </Button>
        </div>
      </div>
    </article>
  );
}
