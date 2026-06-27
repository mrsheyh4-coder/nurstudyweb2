import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import Select from '../components/Select';
import TestimonialCarousel from '../components/TestimonialCarousel';
import UniversityCard from '../components/UniversityCard';
import ConsultationModal from '../components/ConsultationModal';
import { Link } from 'react-router-dom';
import { ALL_COUNTRIES } from '../i18n/constants.js';
import { useSiteCountries } from '../hooks/useSiteCountries.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { salesCopy as salesCopyTranslations } from '../i18n/salesCopy.js';
import { useUniversitySearch } from '../hooks/useUniversitySearch';

const PROGRAM_FILTERS = ['Business', 'Computer Science', 'Management', 'Engineering', 'Finance', 'Data Science'];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { t, messages, language } = useI18n();
  const sc = salesCopyTranslations[language] ?? salesCopyTranslations.RU;
  const { countries: countryOptions, filteredUniversities, filters, updateFilter } = useUniversitySearch();
  const countries = useSiteCountries();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const localizedCountries = useMemo(() => {
    return countries.map((c) => {
      const loc = messages.countries?.[c.name];
      return loc ? { ...c, ...loc, originalName: c.name } : { ...c, originalName: c.name };
    });
  }, [countries, messages]);

  const stats = messages.stats ?? [];
  const features = messages.features ?? [];
  const dashboardSteps = messages.hero?.dashboardSteps ?? [];

  return (
    <div id="home" className="min-h-screen overflow-hidden">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((value) => !value)} />

      <main>
        {/* ── HERO ── */}
        <section className="relative bg-[radial-gradient(circle_at_top_left,#dff5ff,transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff)] py-16 dark:bg-[radial-gradient(circle_at_top_left,rgba(20,121,255,0.24),transparent_34%),linear-gradient(180deg,#020617,#0f172a)] sm:py-24">
          <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              {/* Urgency badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 dark:border-orange-800/40 dark:bg-orange-900/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                </span>
                <p className="text-xs font-black text-orange-700 dark:text-orange-400">{sc.urgencyBadge}</p>
              </div>

              <p className="eyebrow">{t('hero.eyebrow')}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                {t('hero.title')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{t('hero.subtitle')}</p>

              {/* Main CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-black text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700 hover:shadow-brand-500/50 hover:-translate-y-0.5"
                >
                  {sc.heroCta}
                </button>
                <button
                  onClick={() => document.getElementById('universities').scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  {sc.browseUniversities}
                </button>
              </div>

              {/* Trust micro-text */}
              <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">{sc.trustText}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {PROGRAM_FILTERS.map((program) => (
                  <button
                    key={program}
                    type="button"
                    onClick={() => {
                      updateFilter('program', filters.program === program ? '' : program);
                      document.getElementById('universities').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition dark:bg-white/10 ${
                      filters.program === program
                        ? 'border-brand-500 bg-brand-50 text-brand-600 dark:border-brand-400 dark:text-brand-300'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-500 hover:text-brand-600 dark:border-white/10 dark:text-slate-200'
                    }`}
                  >
                    {messages.programs?.[program] ?? program}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-mint-500/20 blur-3xl" />
              <div className="absolute -right-10 bottom-8 h-32 w-32 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/10">
                <div className="rounded-[2rem] bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-300 dark:text-slate-500">{t('hero.dashboardTitle')}</p>
                    <span className="rounded-full bg-mint-500 px-3 py-1 text-xs font-black text-white">{t('hero.live')}</span>
                  </div>
                  <div className="mt-8 grid gap-3">
                    {dashboardSteps.map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 dark:bg-slate-100">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-black text-white">{index + 1}</span>
                        <span className="font-bold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* CTA inside hero card */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-black text-white transition hover:bg-brand-700"
                >
                  {sc.applyNow}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="border-y border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-900">
          <div className="section-shell grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-gradient-to-br from-brand-50 to-mint-50 p-6 text-center dark:from-brand-900/20 dark:to-mint-900/20">
                <p className="text-4xl font-black text-brand-600">{stat.value}</p>
                <p className="mt-2 font-bold text-slate-600 dark:text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── UNIVERSITIES ── */}
        <section id="universities" className="py-20">
          <div className="section-shell">
            <SectionHeader
              eyebrow={t('universitiesSection.eyebrow')}
              title={t('universitiesSection.title')}
              subtitle={t('universitiesSection.subtitle')}
            />

            <div className="mb-8 grid gap-3 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 md:grid-cols-3">
              <input
                value={filters.search}
                onChange={(event) => updateFilter('search', event.target.value)}
                placeholder={t('universitiesSection.searchPlaceholder')}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
              <Select
                value={filters.country}
                onChange={(value) => updateFilter('country', value)}
                options={countryOptions.map((country) => ({
                  value: country,
                  label: country === ALL_COUNTRIES ? t('universitiesSection.allCountries') : (messages.countries?.[country]?.name || country)
                }))}
                className="w-full"
              />
              <input
                value={filters.program}
                onChange={(event) => updateFilter('program', event.target.value)}
                placeholder={t('universitiesSection.programPlaceholder')}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredUniversities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section id="why-us" className="bg-white py-20 dark:bg-slate-900">
          <div className="section-shell">
            <SectionHeader
              centered
              eyebrow={t('whyUs.eyebrow')}
              title={t('whyUs.title')}
              subtitle={t('whyUs.subtitle')}
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-mint-500 text-lg font-black text-white">
                    {feature.title.slice(0, 1)}
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEAD CTA BANNER ── */}
        <section className="py-16">
          <div className="section-shell">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 p-8 text-white shadow-2xl md:p-14">
              {/* Decorative blobs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-mint-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />

              <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-sky-200">
                    {sc.bannerBadge}
                  </span>
                  <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                    {sc.bannerTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-sky-100">
                    {sc.bannerSubtitle}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-sky-100">
                    <span>{sc.bannerBenefit1}</span>
                    <span>{sc.bannerBenefit2}</span>
                    <span>{sc.bannerBenefit3}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black text-brand-700 shadow-lg transition hover:bg-brand-50 hover:-translate-y-0.5"
                  >
                    {sc.bannerCta}
                  </button>
                  <p className="mt-3 text-center text-xs text-sky-300">{sc.socialProof}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTRIES ── */}
        <section id="countries" className="bg-white py-20 dark:bg-slate-900">
          <div className="section-shell">
            <SectionHeader
              eyebrow={t('countriesSection.eyebrow')}
              title={t('countriesSection.title')}
              subtitle={t('countriesSection.subtitle')}
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {localizedCountries.map((country) => (
                <CountryCard key={country._id || country.id || country.name} country={country} />
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="about" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeader
              eyebrow={t('about.eyebrow')}
              title={t('about.title')}
              subtitle={t('about.subtitle')}
            />
            <TestimonialCarousel />
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
        <div className="section-shell grid gap-8 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <img src="/logo.svg" alt="NurStudy" className="h-10 bg-white rounded-xl py-1 px-2" />
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('footer.tagline')}</p>
          </div>
          <div>
            <p className="font-extrabold">{t('footer.contact')}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">+998 71 200 15 11</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">hello@nurstudy.uz</p>
          </div>
          <div>
            <p className="font-extrabold">{t('footer.address')}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('footer.addressText')}</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CTA ── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-brand-500/40 transition hover:bg-brand-700 hover:shadow-brand-500/60 hover:-translate-y-1 animate-bounce-slow"
        >
          {sc.floatingCta}
        </button>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
