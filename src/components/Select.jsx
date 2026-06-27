import { useState } from 'react';

export default function Select({ value, onChange, options, className = '' }) {
  const [open, setOpen] = useState(false);
  
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`}>
      <button 
        type="button" 
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm outline-none transition focus:border-brand-500 focus:bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
      >
        <span className="truncate">{selectedOption?.label || 'Tanlang'}</span>
        <svg className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-2 max-h-60 w-full min-w-[12rem] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-xl dark:border-white/10 dark:bg-slate-900">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-white/5 ${value === opt.value ? 'bg-brand-50 font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400' : 'text-slate-700 dark:text-slate-300'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
