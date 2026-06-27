import { supabase } from './supabase.js';

// Telefon raqamdan email yaratamiz (Supabase Auth email talab qiladi)
function phoneToEmail(phone) {
  const clean = phone.replace(/[^0-9]/g, '');
  return `nurstudy.${clean}@gmail.com`;
}

// Ro'yxatdan o'tish
export async function signUp({ phone, password, firstName, lastName, programs, degree }) {
  const email = phoneToEmail(phone);

  // 1. Supabase Auth da hisob yaratamiz
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { error };

  const userId = data.user?.id;
  if (!userId) return { error: { message: 'Foydalanuvchi yaratilmadi' } };

  // 2. Profil ma'lumotlarini saqlaymiz
  const { error: profileError } = await supabase.from('profiles').insert([{
    id: userId,
    phone,
    first_name: firstName,
    last_name: lastName,
    programs: programs || [],
    degree: degree || null,
  }]);

  if (profileError) return { error: profileError };

  // 3. Applications jadvaliga ham lead sifatida qo'shamiz
  await supabase.from('applications').insert([{
    name: `${firstName} ${lastName}`.trim(),
    phone,
    program: programs?.join(', ') || null,
    country: degree || null,
    status: 'yangi',
    notes: `Ta'lim darajasi: ${degree}. Yo'nalishlar: ${programs?.join(', ') || 'tanlanmagan'}`,
  }]);

  return { data };
}

// Kirish (Login)
export async function signIn({ phone, password }) {
  const email = phoneToEmail(phone);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// Chiqish (Logout)
export async function signOut() {
  return await supabase.auth.signOut();
}

// Joriy foydalanuvchini olish
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Profilni olish
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}
