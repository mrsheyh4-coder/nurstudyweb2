/** @typedef {'EN' | 'RU' | 'UZ'} Locale */

/** @type {Record<Locale, Record<string, unknown>>} */
export const translations = {
  EN: {
    meta: {
      title: 'NurStudy - Study Abroad Made Simple',
      description:
        'NurStudy helps students discover universities, scholarships, countries, and guided study abroad options.',
    },
    nav: {
      whyUs: 'Why Us',
      universities: 'Universities',
      countries: 'Countries',
      scholarships: 'Scholarships',
      about: 'About',
    },
    header: {
      selectLanguage: 'Select language',
      light: 'Light',
      dark: 'Dark',
      login: 'Login',
      signUp: 'Sign up',
      menu: 'Menu',
    },
    hero: {
      eyebrow: 'Global education platform',
      title: 'Study abroad made simple',
      subtitle:
        'Discover universities, compare countries, find scholarships, and get guided support for your international education journey.',
      searchPlaceholder: 'Search universities or programs',
      ctaConsultation: 'Get consultation',
      dashboardTitle: 'Application dashboard',
      live: 'Live',
      dashboardSteps: [
        'Shortlist universities',
        'Prepare documents',
        'Scholarship review',
        'Visa checklist',
      ],
    },
    stats: [
      { value: '10,000+', label: 'Universities' },
      { value: '50+', label: 'Countries' },
      { value: '1:1', label: 'Personalized Guidance' },
    ],
    programs: {
      Business: 'Business',
      'Computer Science': 'Computer Science',
      Management: 'Management',
      Engineering: 'Engineering',
      Finance: 'Finance',
      'Data Science': 'Data Science',
    },
    universitiesSection: {
      eyebrow: 'Partner universities',
      title: 'World-class universities in one searchable platform',
      subtitle: 'Use filters to shortlist universities by country and program before booking a consultation.',
      searchPlaceholder: 'University or keyword',
      allCountries: 'All countries',
      programPlaceholder: 'Program',
    },
    whyUs: {
      eyebrow: 'Why us',
      title: 'Reliable support from shortlist to arrival',
      subtitle:
        'A calmer application process with expert guidance, transparent steps, and student-first support.',
    },
    features: [
      {
        title: 'Free Services',
        description:
          'Start with a free consultation, university shortlist, and clear admission roadmap.',
      },
      {
        title: 'End-to-End Support',
        description:
          'From document checks to visa preparation, every step has a practical checklist.',
      },
      {
        title: '24/7 Support',
        description:
          'Ask questions during deadlines, embassy prep, and arrival planning without waiting days.',
      },
      {
        title: 'Scholarship Matching',
        description:
          'Find grants and discounts that fit your budget, grades, country, and chosen program.',
      },
    ],
    scholarships: {
      eyebrow: 'Scholarships',
      title: 'Find grants that match your profile',
      subtitle:
        'We help identify tuition discounts, merit-based grants, and country-specific opportunities before you apply.',
      cta: 'Check eligibility',
    },
    countriesSection: {
      eyebrow: 'Countries',
      title: 'Study destinations with strong university options',
      subtitle: 'Explore countries by university count, intakes, affordability, and student lifestyle.',
    },
    countries: {
      Poland: {
        name: 'Poland',
        description: 'Affordable EU education with strong English-taught programs and student-friendly cities.',
        intakes: ['October', 'March'],
      },
      Germany: {
        name: 'Germany',
        description: 'A leading destination for engineering, business, and research-focused education.',
        intakes: ['September', 'January', 'October'],
      },
      Latvia: {
        name: 'Latvia',
        description: 'A practical Baltic route with accessible fees and clear visa processes.',
        intakes: ['September', 'February'],
      },
      'South Korea': {
        name: 'South Korea',
        description: 'Modern campuses, technology-driven programs, and scholarship opportunities.',
        intakes: ['March', 'September'],
      },
    },
    countryCard: {
      explore: 'Explore {{name}}',
    },
    universityCard: {
      details: 'Details',
    },
    about: {
      eyebrow: 'About',
      title: 'A simpler system for international admissions',
      subtitle:
        'NurStudy turns confusing application steps into a guided plan: shortlist, documents, submission, scholarships, visa preparation, and arrival.',
    },
    testimonials: {
      prev: 'Prev',
      next: 'Next',
      items: [
        {
          name: 'Madina Karimova',
          country: 'Uzbekistan to Poland',
          quote: 'NurStudy helped me compare programs, prepare documents, and submit everything before the deadline.',
        },
        {
          name: 'Aziz Rahmonov',
          country: 'Uzbekistan to Germany',
          quote: 'The consultation was clear and practical. I knew exactly which documents mattered for my profile.',
        },
        {
          name: 'Sevara Usmonova',
          country: 'Uzbekistan to Latvia',
          quote: 'I liked how simple the shortlist process was. The team explained universities without pressure.',
        },
      ],
    },
    footer: {
      tagline: 'Professional guidance for students planning to study abroad.',
      contact: 'Contact',
      address: 'Address',
      addressText: 'Tashkent, Uzbekistan. Consultation available online and in office.',
    },
  },

  RU: {
    meta: {
      title: 'NurStudy — учёба за границей проще',
      description:
        'NurStudy помогает найти университеты, стипендии, страны и сопровождение при поступлении за рубежом.',
    },
    nav: {
      whyUs: 'Почему мы',
      universities: 'Университеты',
      countries: 'Страны',
      scholarships: 'Стипендии',
      about: 'О нас',
    },
    header: {
      selectLanguage: 'Выбор языка',
      light: 'Светлая',
      dark: 'Тёмная',
      login: 'Вход',
      signUp: 'Регистрация',
      menu: 'Меню',
    },
    hero: {
      eyebrow: 'Глобальная образовательная платформа',
      title: 'Учёба за границей — без лишней суеты',
      subtitle:
        'Находите университеты, сравнивайте страны, ищите стипендии и получайте сопровождение на каждом этапе.',
      searchPlaceholder: 'Поиск университета или программы',
      ctaConsultation: 'Получить консультацию',
      dashboardTitle: 'Панель заявки',
      live: 'Онлайн',
      dashboardSteps: [
        'Шорт-лист университетов',
        'Подготовка документов',
        'Проверка стипендий',
        'Чек-лист визы',
      ],
    },
    stats: [
      { value: '10 000+', label: 'Университетов' },
      { value: '50+', label: 'Стран' },
      { value: '1:1', label: 'Персональное сопровождение' },
    ],
    programs: {
      Business: 'Бизнес',
      'Computer Science': 'Информатика',
      Management: 'Менеджмент',
      Engineering: 'Инженерия',
      Finance: 'Финансы',
      'Data Science': 'Наука о данных',
    },
    universitiesSection: {
      eyebrow: 'Партнёрские университеты',
      title: 'Сильные вузы мира в одной поисковой платформе',
      subtitle: 'Фильтруйте по стране и программе, затем запишитесь на консультацию.',
      searchPlaceholder: 'Университет или ключевое слово',
      allCountries: 'Все страны',
      programPlaceholder: 'Программа',
    },
    whyUs: {
      eyebrow: 'Почему мы',
      title: 'Надёжная поддержка от шорт-листа до прилёта',
      subtitle: 'Спокойный процесс поступления: экспертиза, прозрачные шаги и забота о студенте.',
    },
    features: [
      {
        title: 'Бесплатные сервисы',
        description: 'Старт с бесплатной консультации, шорт-листа вузов и понятного плана поступления.',
      },
      {
        title: 'Поддержка «под ключ»',
        description: 'От проверки документов до визы — у каждого этапа есть практичный чек-лист.',
      },
      {
        title: 'Поддержка 24/7',
        description: 'Задавайте вопросы в дедлайны, перед посольством и прилётом — без долгого ожидания.',
      },
      {
        title: 'Подбор стипендий',
        description: 'Гранты и скидки под ваш бюджет, оценки, страну и выбранную программу.',
      },
    ],
    scholarships: {
      eyebrow: 'Стипендии',
      title: 'Найдите гранты под ваш профиль',
      subtitle:
        'Помогаем найти скидки на обучение, мерит-гранты и возможности по странам до подачи заявки.',
      cta: 'Проверить право',
    },
    countriesSection: {
      eyebrow: 'Страны',
      title: 'Направления с сильными университетами',
      subtitle: 'Смотрите по числу вузов, интейкам, стоимости и студенческой среде.',
    },
    countries: {
      Poland: {
        name: 'Польша',
        description: 'Доступное образование в ЕС, сильные программы на английском и комфортные города.',
        intakes: ['Октябрь', 'Март'],
      },
      Germany: {
        name: 'Германия',
        description: 'Топ-направление для инженерии, бизнеса и исследовательских программ.',
        intakes: ['Сентябрь', 'Январь', 'Октябрь'],
      },
      Latvia: {
        name: 'Латвия',
        description: 'Практичный балтийский маршрут с доступными сборами и понятной визой.',
        intakes: ['Сентябрь', 'Февраль'],
      },
      'South Korea': {
        name: 'Южная Корея',
        description: 'Современные кампусы, технологичные программы и стипендии.',
        intakes: ['Март', 'Сентябрь'],
      },
    },
    countryCard: {
      explore: 'Подробнее: {{name}}',
    },
    universityCard: {
      details: 'Подробнее',
    },
    about: {
      eyebrow: 'О нас',
      title: 'Проще система международного поступления',
      subtitle:
        'NurStudy превращает хаос в план: шорт-лист, документы, подача, стипендии, виза и прилёт.',
    },
    testimonials: {
      prev: 'Назад',
      next: 'Далее',
      items: [
        {
          name: 'Madina Karimova',
          country: 'Узбекистан → Польша',
          quote:
            'NurStudy помог сравнить программы, подготовить документы и уложиться в дедлайн.',
        },
        {
          name: 'Aziz Rahmonov',
          country: 'Узбекистан → Германия',
          quote: 'Консультация была ясной и практичной. Я точно знал, какие документы важны.',
        },
        {
          name: 'Sevara Usmonova',
          country: 'Узбекистан → Латвия',
          quote: 'Шорт-лист был простым, команде удалось объяснить вузы без давления.',
        },
      ],
    },
    footer: {
      tagline: 'Профессиональное сопровождение для поступления за рубежом.',
      contact: 'Контакты',
      address: 'Адрес',
      addressText: 'Ташкент, Узбекистан. Консультации онлайн и в офисе.',
    },
  },

  UZ: {
    meta: {
      title: 'NurStudy — chet elda o‘qish osonroq',
      description:
        'NurStudy talabalarga universitetlar, grantlar, mamlakatlar va yo‘l-yo‘riqni topishda yordam beradi.',
    },
    nav: {
      whyUs: 'Nima uchun biz',
      universities: 'Universitetlar',
      countries: 'Mamlakatlar',
      scholarships: 'Grantlar',
      about: 'Biz haqimizda',
    },
    header: {
      selectLanguage: 'Tilni tanlang',
      light: 'Yorug‘',
      dark: 'Qorong‘u',
      login: 'Kirish',
      signUp: 'Ro‘yxatdan o‘tish',
      menu: 'Menyu',
    },
    hero: {
      eyebrow: 'Global ta’lim platformasi',
      title: 'Chet elda o‘qish — tartibli va tushunarli',
      subtitle:
        'Universitetlarni toping, mamlakatlarni solishtiring, grantlarni qidiring va xalqaro ta’lim yo‘lida yo‘l-yo‘riq oling.',
      searchPlaceholder: 'Universitet yoki dasturni qidiring',
      ctaConsultation: 'Konsultatsiya olish',
      dashboardTitle: 'Ariza paneli',
      live: 'Jonli',
      dashboardSteps: [
        'Universitetlar ro‘yxati',
        'Hujjatlarni tayyorlash',
        'Grantlarni ko‘rib chiqish',
        'Viza checklist',
      ],
    },
    stats: [
      { value: '10 000+', label: 'Universitetlar' },
      { value: '50+', label: 'Mamlakatlar' },
      { value: '1:1', label: 'Shaxsiy yo‘l-yo‘riq' },
    ],
    programs: {
      Business: 'Biznes',
      'Computer Science': 'Kompyuter fanlari',
      Management: 'Menejment',
      Engineering: 'Muhandislik',
      Finance: 'Moliya',
      'Data Science': 'Ma’lumotlar fani',
    },
    universitiesSection: {
      eyebrow: 'Hamkor universitetlar',
      title: 'Dunyoning yetakchi universitetlari — bitta qidiruvda',
      subtitle: 'Mamlakat va dastur bo‘yicha filtrlab, konsultatsiyaga yoziling.',
      searchPlaceholder: 'Universitet yoki kalit so‘z',
      allCountries: 'Barcha mamlakatlar',
      programPlaceholder: 'Dastur',
    },
    whyUs: {
      eyebrow: 'Nima uchun biz',
      title: 'Ro‘yxatdan kelishgacha ishonchli yordam',
      subtitle: 'Mutaxassis yo‘l-yo‘riq, shaffof qadamlar va talaba uchun qulay jarayon.',
    },
    features: [
      {
        title: 'Bepul xizmatlar',
        description: 'Bepul konsultatsiya, universitetlar ro‘yxati va aniq qabul rejasi bilan boshlang.',
      },
      {
        title: 'To‘liq kuzatuv',
        description: 'Hujjatlardan vizagacha — har bosqichda amaliy checklist.',
      },
      {
        title: '24/7 yordam',
        description: 'Muddatlar, elchixona va kelish oldidan savollaringizni kechiktirmasdan bering.',
      },
      {
        title: 'Grant moslashuvi',
        description: 'Byudjet, baholar, mamlakat va dasturingizga mos grant va chegirmalarni toping.',
      },
    ],
    scholarships: {
      eyebrow: 'Grantlar',
      title: 'Profilingizga mos grantlarni toping',
      subtitle:
        'Ariza berishdan oldin o‘qish chegirmalari, merit-grantlar va mamlakat bo‘yicha imkoniyatlarni aniqlashda yordam beramiz.',
      cta: 'Mos kelishini tekshirish',
    },
    countriesSection: {
      eyebrow: 'Mamlakatlar',
      title: 'Kuchli universitetli yo‘nalishlar',
      subtitle: 'Universitet soni, qabul oylar, narx va talabalik muhiti bo‘yicha o‘rganing.',
    },
    countries: {
      Poland: {
        name: 'Polsha',
        description: 'EU’da arzonroq ta’lim, ingliz tilidagi dasturlar va qulay shaharlar.',
        intakes: ['Oktyabr', 'Mart'],
      },
      Germany: {
        name: 'Germaniya',
        description: 'Muhandislik, biznes va tadqiqot uchun yetakchi yo‘nalish.',
        intakes: ['Sentyabr', 'Yanvar', 'Oktyabr'],
      },
      Latvia: {
        name: 'Latviya',
        description: 'O‘qish narxi va viza jarayoni tushunarli bo‘lgan amaliy yo‘l.',
        intakes: ['Sentyabr', 'Fevral'],
      },
      'South Korea': {
        name: 'Janubiy Koreya',
        description: 'Zamonaviy kampuslar, texnologik dasturlar va grant imkoniyatlari.',
        intakes: ['Mart', 'Sentyabr'],
      },
    },
    countryCard: {
      explore: '{{name}} bo‘yicha',
    },
    universityCard: {
      details: 'Batafsil',
    },
    about: {
      eyebrow: 'Biz haqimizda',
      title: 'Xalqaro qabul uchun soddaroq tizim',
      subtitle:
        'NurStudy chalkash qadamlarni yo‘l-yo‘riqqa aylantiradi: ro‘yxat, hujjatlar, topshirish, grantlar, viza va kelish.',
    },
    testimonials: {
      prev: 'Oldingi',
      next: 'Keyingi',
      items: [
        {
          name: 'Madina Karimova',
          country: 'O‘zbekiston → Polsha',
          quote:
            'NurStudy dasturlarni solishtirish, hujjatlarni tayyorlash va muddatdan oldin topshirishda yordam berdi.',
        },
        {
          name: 'Aziz Rahmonov',
          country: 'O‘zbekiston → Germaniya',
          quote: 'Konsultatsiya aniq va amaliy edi. Qaysi hujjatlar muhimligini bilib oldim.',
        },
        {
          name: 'Sevara Usmonova',
          country: 'O‘zbekiston → Latviya',
          quote: 'Universitetlar ro‘yxati juda sodda edi, jamoa bosimsiz tushuntirdi.',
        },
      ],
    },
    footer: {
      tagline: 'Chet elda o‘qishni rejalashtirayotgan talabalar uchun professional yo‘l-yo‘riq.',
      contact: 'Aloqa',
      address: 'Manzil',
      addressText: 'Toshkent, O‘zbekiston. Onlayn va ofisda konsultatsiya.',
    },
  },
};
