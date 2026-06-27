const variants = {
  primary: 'bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700',
  secondary: 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:border-white/15 dark:hover:bg-slate-700',
  ghost: 'text-slate-600 hover:text-brand-700 dark:text-slate-300 dark:hover:text-white',
};

export default function Button({ as: Component = 'button', variant = 'primary', className = '', children, ...props }) {
  return (
    <Component
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
