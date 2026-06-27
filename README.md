# NurStudy — O'quv Platformasi

## Loyihani ishga tushirish

### 1. Paketlarni o'rnatish
```bash
npm install
```

### 2. Local ishga tushirish
```bash
npm run dev
```
Brauzerda oching: **http://localhost:5173**

### 3. Production build
```bash
npm run build
```

---

## Admin Panel

- **URL:** `/admin`
- **Parol:** configure with `VITE_ADMIN_PASSWORD` in the deployment environment.

### Admin bo'limlari:
- `/admin/dashboard` — Umumiy ko'rinish
- `/admin/applications` — Leadlar / Arizalar
- `/admin/users` — Ro'yxatdan o'tgan foydalanuvchilar

---

## Deploy (Netlify)

1. [Netlify](https://netlify.com) da yangi site yarating
2. GitHub repo ga ulab qo'ying: `mrsheyh4-coder/nurstudyweb2`
3. Build sozlamalari:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. `public/_redirects` fayli allaqachon mavjud (SPA routing uchun)

---

## Texnik ma'lumotlar

| Texnologiya | Versiya |
|-------------|---------|
| React | 18 |
| Vite | 5 |
| Supabase | 2 |
| TailwindCSS | 3 |

**Supabase Project:** configure with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the deployment environment.

### Supabase jadvallar:
- `profiles` — Ro'yxatdan o'tgan foydalanuvchilar (status, admin_notes ustunlari bilan)
- `applications` — Konsultatsiya arizalari (leads)
- `countries` — Mamlakatlar
- `universities` — Universitetlar

---

## Loyiha tuzilmasi

```
src/
├── admin/          — Admin autentifikatsiya
├── components/     — Qayta ishlatiladigan komponentlar
├── hooks/          — React hooks
├── i18n/           — Ko'p tillilik (UZ/RU/EN)
├── lib/            — Supabase, auth service
├── pages/          — Sahifalar
│   ├── Home.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminApplications.jsx
│   │   └── AdminUsers.jsx
│   └── ...
└── styles.css
```

## Deployed sayt
🌐 **https://rainbow-pasca-8380e7.netlify.app**
