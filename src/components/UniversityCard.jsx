import Button from './Button';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function UniversityCard({ university }) {
  const { t } = useI18n();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/50">
      <Link to={`/university/${university.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Batafsil {university.name}</span>
      </Link>
      {university.imageUrl ? (
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={university.imageUrl}
            alt={university.name}
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-mint-50 px-3 py-1 text-xs font-extrabold text-mint-600 dark:bg-mint-500/10 dark:text-mint-300">{university.country}</span>
            <h3 className="mt-4 text-xl font-extrabold text-slate-950 dark:text-white line-clamp-1" title={university.name}>{university.name}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{university.city}</p>
          </div>
          <span className="shrink-0 rounded-2xl bg-brand-50 px-3 py-2 text-sm font-black text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            {university.ranking}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {university.programs.map((program) => (
            <span key={program} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300">
              {program}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{university.tuition}</p>
          <Button as="span" variant="secondary" className="px-4 py-2">
            {t('universityCard.details')}
          </Button>
        </div>
      </div>
    </article>
  );
}
