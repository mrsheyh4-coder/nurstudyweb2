import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import UniversityCard from '../components/UniversityCard';
import { supabase } from '../lib/supabase';
import { useI18n } from '../i18n/I18nProvider';
import { getUniversitiesResolved, subscribeSiteData } from '../lib/siteData';

export default function CountryDetails() {
  const { name } = useParams();
  const { messages } = useI18n();
  const [darkMode, setDarkMode] = useState(false);
  const [country, setCountry] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // 1. Mamlakatni yuklash (name bo'yicha)
      const { data: countryData } = await supabase
        .from('countries')
        .select('*')
        .eq('name', name)
        .single();

      if (countryData) {
        const loc = messages.countries?.[countryData.name];
        // originalName = DB dagi asl nom, name = ko'rsatiladigan tarjima
        setCountry(loc ? { ...countryData, ...loc, originalName: countryData.name, name: loc.name || countryData.name } : countryData);
      } else {
        setCountry(null);
      }

      // 2. Shu mamlakatning universitetlarini yuklash
      const allUnis = getUniversitiesResolved();
      setUniversities(allUnis.filter(u => u.country === name));
      setLoading(false);
    }
    load();
    
    return subscribeSiteData(() => {
      const allUnis = getUniversitiesResolved();
      setUniversities(allUnis.filter(u => u.country === name));
    });
  }, [name, messages]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(v => !v)} />
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-pulse text-slate-400 font-bold">Yuklanmoqda...</div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(v => !v)} />
        <div className="flex flex-1 items-center justify-center p-20 text-center">
          <p className="text-xl font-bold text-slate-500">Mamlakat topilmadi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(v => !v)} />

      {/* Cover Area */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-slate-900">
        {country.imageUrl ? (
          <img
            src={country.imageUrl}
            alt={country.name}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <span className="text-slate-500">Rasm yo'q</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="section-shell w-full">
            <Link to="/#countries" className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Orqaga
            </Link>
            <div>
              <span className="inline-block rounded-full bg-brand-500/20 px-3 py-1 text-xs font-black uppercase text-brand-300 backdrop-blur-md">
                Mamlakat
              </span>
              <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl">{country.name}</h1>
              <p className="mt-4 text-lg font-medium text-slate-300">
                O'qish va yashash uchun qulay tanlov
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell mt-8 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* Main Info */}
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 md:p-10">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">🌍 {country.name} haqida</h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                {country.description || `${country.name} xalqaro talabalar uchun ta'lim olish va rivojlanish maqsadida juda qulay va mashhur yo'nalishlardan biridir.`}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">Poytaxti</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{country.capital || 'Noma\'lum'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">Tili</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{country.language || 'Noma\'lum'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">Valyutasi</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{country.currency || 'Noma\'lum'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">Aholisi</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{country.population || 'Noma\'lum'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-fit rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900">
            <h3 className="mb-6 border-l-4 border-brand-500 pl-3 text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Qabul tafsilotlari
            </h3>

            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">🎓</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Saytdagi universitetlar</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {universities.length > 0
                      ? `${universities.length} ta universitet`
                      : country.universities || 'Noma\'lum'}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 text-lg text-brand-500">📅</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Qabul oylari</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {country.intakes && country.intakes.length > 0 ? country.intakes.map(intake => (
                      <span key={intake} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                        {intake}
                      </span>
                    )) : (
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Noma'lum</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-4 text-sm font-black text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700 hover:shadow-brand-500/40">
              Konsultatsiya olish
            </button>
          </div>
        </div>

        {/* Universities List */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {country.name}dagi universitetlar
            </h2>
            {universities.length > 0 && (
              <span className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-black text-white">
                {universities.length} ta
              </span>
            )}
          </div>
          {universities.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {universities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-white/10 dark:bg-slate-900">
              <p className="text-lg font-bold text-slate-500">Hozircha ushbu mamlakatda universitetlar topilmadi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
