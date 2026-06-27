import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations.js';

const I18nContext = createContext(null);

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function interpolate(template, vars) {
  if (!vars) return template;
  return Object.entries(vars).reduce((str, [k, v]) => str.replaceAll(`{{${k}}}`, String(v)), template);
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('RU');

  const messages = translations[language] ?? translations.UZ;

  const t = useCallback(
    (path, vars) => {
      const value = getByPath(messages, path);
      if (typeof value === 'string') return interpolate(value, vars);
      return value ?? path;
    },
    [messages],
  );

  useEffect(() => {
    const lang = language === 'EN' ? 'en' : language === 'RU' ? 'ru' : 'uz';
    document.documentElement.lang = lang;
    const title = getByPath(messages, 'meta.title');
    const desc = getByPath(messages, 'meta.description');
    if (typeof title === 'string') document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && typeof desc === 'string') meta.setAttribute('content', desc);
  }, [language, messages]);

  const value = useMemo(() => ({ language, setLanguage, t, messages }), [language, t, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
