import { useState, useEffect } from 'react';
import Button from './Button';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { supabase } from '../lib/supabase.js';

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [dbItems, setDbItems] = useState([]);
  const { messages, t } = useI18n();
  
  // Fallback to translation items if DB is empty
  const translationItems = messages.testimonials?.items ?? [];
  
  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        setDbItems(data.map(item => ({
          quote: item.text,
          name: item.name,
          country: item.university,
          imageUrl: item.imageUrl
        })));
      }
    }
    
    fetchTestimonials();
  }, []);

  const items = dbItems.length > 0 ? dbItems : translationItems;
  const testimonial = items[index] ?? { quote: '', name: '', country: '', imageUrl: '' };

  function next() {
    if (!items.length) return;
    setIndex((current) => (current + 1) % items.length);
  }

  function previous() {
    if (!items.length) return;
    setIndex((current) => (current - 1 + items.length) % items.length);
  }

  const prevLabel = t('testimonials.prev');
  const nextLabel = t('testimonials.next');

  if (items.length === 0) return null;

  return (
    <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft dark:bg-white dark:text-slate-950 sm:p-8 relative overflow-hidden">
      <p className="text-2xl font-extrabold leading-9 relative z-10">“{testimonial.quote}”</p>
      
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between relative z-10">
        <div className="flex items-center gap-5">
          {testimonial.imageUrl && (
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="h-28 w-28 shrink-0 rounded-3xl object-cover shadow-xl ring-2 ring-white/20 sm:h-36 sm:w-36"
            />
          )}
          <div>
            <p className="font-extrabold">{testimonial.name}</p>
            <p className="text-sm text-slate-300 dark:text-slate-500">{testimonial.country}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" type="button" onClick={previous} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 border-none">
            {prevLabel}
          </Button>
          <Button type="button" onClick={next} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white border-none">
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
