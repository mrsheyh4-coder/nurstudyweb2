import { createClient } from '@supabase/supabase-js';

const fallbackSupabaseUrl = 'https://fkouekwabqrwctmdoenp.supabase.co';
const fallbackSupabaseAnonKey = 'sb_publishable_eDkMF4b7-ko14zzosR_Ogw_EikK6-nA';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
