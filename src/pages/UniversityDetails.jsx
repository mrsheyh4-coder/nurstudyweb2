import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import Header from '../components/Header';
import ConsultationModal from '../components/ConsultationModal';
import { getUniversitiesResolved } from '../lib/siteData';

export default function UniversityDetails() {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const university = useMemo(() => {
    return getUniversitiesResolved().find(u => String(u.id) === String(id));
  }, [id]);

  if (!university) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(v => !v)} />
        <div className="flex flex-1 items-center justify-center p-20 text-center">
          <p className="text-xl font-bold text-slate-500">Universitet topilmadi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(v => !v)} />

      {/* Cover Area */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-slate-900">
        {university.imageUrl && (
          <img 
            src={university.imageUrl} 
            alt={university.name} 
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="section-shell w-full">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Orqaga
            </Link>
            <div>
              {university.type && (
                <span className="inline-block rounded-full bg-brand-500/20 px-3 py-1 text-xs font-black uppercase text-brand-300 backdrop-blur-md">
                  {university.type}
                </span>
              )}
              <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl">{university.name}</h1>
              <p className="mt-4 text-lg font-medium text-slate-300">
                📍 {university.city}, {university.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="section-shell mt-8 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          
          {/* Main Info */}
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 md:p-10">
            <div className="mb-8 flex gap-6 border-b border-slate-200 dark:border-white/10">
              <button 
                className={`border-b-2 pb-4 text-sm font-bold transition-colors ${activeTab === 'general' ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                onClick={() => setActiveTab('general')}
              >
                Umumiy ma'lumot
              </button>
              <button 
                className={`border-b-2 pb-4 text-sm font-bold transition-colors ${activeTab === 'programs' ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                onClick={() => setActiveTab('programs')}
              >
                Dasturlar
              </button>
            </div>

            {activeTab === 'general' ? (
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">🎓 {university.name}</h2>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                  {university.description || `${university.name} — ${university.country}ning ${university.city} shahrida joylashgan yetakchi universitetlardan biri bo'lib, o'zining akademik obro'si va ilmiy tadqiqotlardagi yuqori natijalari bilan tanilgan.`}
                </p>
                <h3 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Universitet haqida</h3>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                  Universitet keng akademik tuzilishga ega bo'lib, quyidagi qiziqarli va kelajagi porloq yo'nalishlar bo'yicha ta'lim imkoniyatlarini taqdim etadi: {university.programs.join(', ')}.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="mb-6 text-xl font-black text-slate-950 dark:text-white">Mavjud dasturlar</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {university.programs.map(prog => (
                    <div key={prog} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-white/5 dark:bg-white/5">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{prog}</p>
                      <p className="mt-2 text-xs font-semibold text-slate-400">Bakalavr / Magistratura</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="h-fit rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900">
            <h3 className="mb-6 border-l-4 border-brand-500 pl-3 text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Asosiy tafsilotlar
            </h3>
            
            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">📅</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Tashkil etilgan</p>
                  <p className="font-bold text-slate-900 dark:text-white">{university.founded || "Noma'lum"}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">🏢</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Tur</p>
                  <p className="font-bold uppercase text-slate-900 dark:text-white">{university.type || "Noma'lum"}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">🏆</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Reyting</p>
                  <p className="font-bold text-slate-900 dark:text-white">{university.ranking}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">💰</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Kontrakt (yillik)</p>
                  <p className="font-bold text-slate-900 dark:text-white">{university.tuition}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">🌍</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Davlat</p>
                  <p className="font-bold text-slate-900 dark:text-white">{university.country}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">📍</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Shahar</p>
                  <p className="font-bold text-slate-900 dark:text-white">{university.city}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-4 text-sm font-black text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700 hover:shadow-brand-500/40"
            >
              🎓 O'qimoqchiman
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
