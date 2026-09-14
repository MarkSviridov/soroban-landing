/**
 * Весь текст лендинга — в одном месте, по локалям.
 *
 * `ru` — русская версия (URL `/`). `ro` — румынская (URL `/ro/`).
 * Компоненты берут локаль из URL через `getLocale(Astro.url)`.
 *
 * Правило: никаких неподтверждённых обещаний и цифр.
 */

export type Locale = 'ru' | 'ro';

export interface QA {
  q: string;
  a: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface LocaleContent {
  htmlLang: string;
  ogLocale: string;

  logoAlt: string;
  brandCity: string;
  skipLink: string;

  nav: NavItem[];
  footerNav: NavItem[];

  a11y: {
    mainNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    langSwitch: string;
  };

  meta: { title: string; description: string };
  cta: { primary: string; call: string };
  finalCta: { title: string; text: string };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: string[];
    videoAriaLabel: string;
    videoFallback: string;
    videoDownload: string;
    videoCaption: string;
  };

  about: { eyebrow: string; title: string; text: string[]; imageAlt: string };
  learn: { eyebrow: string; title: string; items: string[]; note: string };
  how: {
    eyebrow: string;
    title: string;
    items: { label: string; value: string }[];
    imageAlt: string;
  };
  app: {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
    storesLabel: string;
    screenshotsNote: string;
    screenshotAlts: string[];
    onlinePhotoAlt: string;
  };
  vsl: {
    eyebrow: string;
    title: string;
    text: string;
    videoAriaLabel: string;
    videoFallback: string;
    videoDownload: string;
  };
  practice: { eyebrow: string; title: string; text: string[]; imageAlt: string };
  trial: { title: string; items: string[]; note: string };
  faq: { title: string; items: QA[] };

  contacts: {
    eyebrow: string;
    title: string;
    lead: string;
    phoneLabel: string;
    phoneNote: string;
    officesTitle: string;
    onlineNote: string;
    mapButton: string;
    directionsButton: string;
    socialsTitle: string;
    siteButton: string;
    officeDistricts: Record<string, string>;
  };

  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
    googleLink: string;
    altTemplate: string;
  };

  form: {
    title: string;
    subtitle: string;
    freeBadge: string;
    callPrompt: string;
    labels: {
      parentName: string;
      phone: string;
      childName: string;
      childAge: string;
      district: string;
      language: string;
      format: string;
      comment: string;
      consent: string;
    };
    placeholders: {
      parentName: string;
      phone: string;
      childName: string;
      childAge: string;
      comment: string;
      select: string;
    };
    errors: {
      parentName: string;
      phone: string;
      childName: string;
      childAge: string;
      district: string;
      language: string;
      format: string;
      consent: string;
    };
    options: { districts: string[]; languages: string[]; formats: string[] };
    submit: string;
    submitting: string;
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
    validationError: string;
    honeypotLabel: string;
    retry: string;
    privacyLinkText: string;
  };

  footer: {
    tagline: string;
    foundedText: string;
    sectionsTitle: string;
    contactsTitle: string;
    linksTitle: string;
    siteLink: string;
    privacy: string;
    rights: string;
  };
}

// ---------------------------------------------------------------------------
// RU — русская версия. Значения идентичны предыдущей версии сайта.
// ---------------------------------------------------------------------------
const ru: LocaleContent = {
  htmlLang: 'ru',
  ogLocale: 'ru_RU',

  logoAlt: 'Логотип школы SOROBAN',
  brandCity: 'Кишинёв',
  skipLink: 'К основному содержанию',

  nav: [
    { href: '#about', label: 'О методике' },
    { href: '#how', label: 'Занятия' },
    { href: '#app', label: 'Приложение' },
    { href: '#faq', label: 'Вопросы' },
    { href: '#contacts', label: 'Контакты' },
  ],
  footerNav: [
    { href: '#about', label: 'О методике' },
    { href: '#how', label: 'Как проходят занятия' },
    { href: '#app', label: 'Приложение SoroboomAR' },
    { href: '#faq', label: 'Частые вопросы' },
  ],

  a11y: {
    mainNav: 'Основная навигация',
    footerNav: 'Навигация в подвале',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    langSwitch: 'Сменить язык сайта',
  },

  meta: {
    title: 'SOROBAN Кишинёв — бесплатный пробный урок ментальной арифметики для детей 5–12 лет',
    description:
      'Запишите ребёнка 5–12 лет на бесплатный пробный урок ментальной арифметики SOROBAN в Кишинёве. Офлайн в четырёх районах города или онлайн, занятия на русском или румынском.',
  },

  cta: {
    primary: 'Записаться на бесплатный пробный урок',
    call: 'Позвонить',
  },

  finalCta: {
    title: 'Запишите ребёнка на бесплатный пробный урок',
    text: 'Оставьте заявку — администратор свяжется с вами в течение дня и подскажет ближайшую группу.',
  },

  hero: {
    eyebrow: 'Школа ментальной арифметики SOROBAN · Кишинёв',
    title: 'Бесплатный пробный урок ментальной арифметики для детей 5–12 лет',
    subtitle:
      'Занятие проходит в живой группе до 10 детей, с тренером — офлайн в одном из районов Кишинёва или онлайн. Языки занятий: русский или румынский.',
    points: [
      'Возраст 5–12 лет',
      'Пробный урок 30–40 минут',
      'Офлайн в 4 районах Кишинёва или онлайн',
      'SOROBAN работает в Молдове с 2017 года',
    ],
    videoAriaLabel: 'Видео о методике SOROBAN и занятиях для детей',
    videoFallback: 'Ваш браузер не поддерживает встроенное видео.',
    videoDownload: 'Скачать видео о методике SOROBAN (MP4)',
    videoCaption:
      'Видео о методике SOROBAN: педагог рассказывает о занятиях ментальной арифметикой для детей 5–12 лет в Кишинёве.',
  },

  about: {
    eyebrow: 'Методика',
    title: 'Что такое ментальная арифметика',
    text: [
      'Ментальная арифметика — методика устного счёта с опорой на счёты соробан. Ребёнок сначала считает на соробане, а затем учится выполнять действия в уме, представляя косточки.',
      'SOROBAN работает в Молдове с 2017 года. Занятия идут в группах, по программе школы и с приложением SoroboomAR.',
    ],
    imageAlt:
      'Класс школы SOROBAN: группа детей за партами со счётами и рабочими тетрадями поднимает руки, на стене логотип Soroban',
  },

  learn: {
    eyebrow: 'На занятиях',
    title: 'Чем занимаются дети на уроках',
    items: [
      'Работают с соробаном и учатся считать в уме',
      'Тренируют внимание во время выполнения заданий',
      'Регулярно практикуются — устно и в приложении SoroboomAR',
      'Занимаются в группе и по очереди отвечают тренеру',
    ],
    note: 'Как быстро продвигается ребёнок — зависит от возраста, регулярности занятий и практики.',
  },

  how: {
    eyebrow: 'Формат',
    title: 'Как проходят занятия',
    items: [
      { label: 'Возраст', value: '5–12 лет' },
      { label: 'Формат', value: 'офлайн в районе города или онлайн' },
      { label: 'Длительность занятия', value: '45 минут' },
      { label: 'Группа', value: 'до 10 детей' },
      { label: 'Языки занятий', value: 'русский или румынский' },
      { label: 'В обучение входит', value: 'приложение SoroboomAR' },
    ],
    imageAlt: 'Двое детей за одной партой занимаются со счётами и открытыми рабочими тетрадями',
  },

  app: {
    eyebrow: 'Приложение',
    title: 'Приложение SoroboomAR',
    text: 'SoroboomAR анализирует скорость выполнения задания и действия ребёнка, а затем подбирает следующее упражнение подходящей сложности.',
    points: [
      'Входит в обучение',
      'Работает на телефоне, планшете и компьютере',
      'Результаты видит преподаватель',
    ],
    storesLabel: 'Скачать приложение',
    screenshotsNote: 'Экраны приложения SoroboomAR.',
    screenshotAlts: [
      'Скриншот приложения SoroboomAR: стартовый экран с кнопкой «Старт»',
      'Скриншот приложения SoroboomAR: персонаж бежит по игровому миру, слева джойстик управления',
      'Скриншот приложения SoroboomAR: экран тренажёра счёта с числом на табло',
    ],
    onlinePhotoAlt:
      'Девочка занимается онлайн за ноутбуком с приложением SoroboomAR, на столе счёты',
  },

  vsl: {
    eyebrow: 'Видео',
    title: 'Видео о занятиях',
    text: 'Короткое видео из класса: как дети считают в уме на занятии SOROBAN.',
    videoAriaLabel: 'Видео с занятия SOROBAN: ребёнок считает в уме',
    videoFallback: 'Ваш браузер не поддерживает встроенное видео.',
    videoDownload: 'Скачать видео (MP4)',
  },

  practice: {
    eyebrow: 'Как учим',
    title: 'Живая практика и внимание тренера',
    text: [
      'Занятия идут в группе до 10 детей. Дети занимаются вместе и по очереди отвечают тренеру, поэтому каждый ребёнок получает внимание на уроке.',
      'Между занятиями ребёнок закрепляет материал в приложении SoroboomAR, а преподаватель видит результаты.',
    ],
    imageAlt: 'Преподавательница помогает мальчику считать на большом настенном абакусе',
  },

  trial: {
    title: 'Как проходит бесплатный пробный урок',
    items: [
      'Длительность — 30–40 минут',
      'Проходит в уже сформированной группе, с конкретным тренером и в конкретном офисе',
      'Родителю желательно присутствовать на уроке',
      'После пробного урока отдельная группа не подбирается',
    ],
    note: 'Оставьте заявку — администратор свяжется в течение дня и подскажет ближайшую группу.',
  },

  faq: {
    title: 'Частые вопросы',
    items: [
      { q: 'С какого возраста можно заниматься?', a: 'С 5 до 12 лет.' },
      {
        q: 'Занятия только офлайн?',
        a: 'Есть офлайн — в офисах в районах Центр, Ботаника, Чоканы и Буюканы — и онлайн.',
      },
      { q: 'Сколько длится занятие?', a: 'Занятие длится 45 минут.' },
      { q: 'Сколько детей в группе?', a: 'До 10 детей.' },
      { q: 'На каком языке проходят занятия?', a: 'На русском или румынском — на выбор.' },
      {
        q: 'Как проходит пробный урок?',
        a: 'Пробный урок длится 30–40 минут и проходит в уже сформированной группе, с конкретным тренером в конкретном офисе. Родителю желательно присутствовать. Отдельная группа после пробного урока не подбирается.',
      },
      {
        q: 'Сколько стоит обучение?',
        a: 'О стоимости и вариантах оплаты расскажет администратор по телефону после записи.',
      },
    ],
  },

  contacts: {
    eyebrow: 'Контакты',
    title: 'Контакты',
    lead: 'Позвоните нам или оставьте заявку — перезвоним в течение дня.',
    phoneLabel: 'Телефон',
    phoneNote: 'Перезвоним в течение дня',
    officesTitle: 'Офисы в Кишинёве',
    onlineNote: 'Онлайн-группы — для тех, кому удобнее заниматься дома.',
    mapButton: 'Открыть на карте',
    directionsButton: 'Открыть маршрут',
    socialsTitle: 'Мы в соцсетях',
    siteButton: 'Основной сайт школы',
    officeDistricts: {
      center: 'Центр',
      botanica: 'Ботаника',
      ciocana: 'Чоканы',
      buiucani: 'Буюканы',
    },
  },

  testimonials: {
    eyebrow: 'Отзывы',
    title: 'Отзывы родителей',
    intro:
      'Скриншоты отзывов из публичного профиля школы в Google Картах. Тексты не редактировались.',
    googleLink: 'Смотреть отзывы в Google →',
    altTemplate:
      'Скриншот отзыва в Google Картах: {nume}, оценка 5 из 5 звёзд, положительный отзыв о школе Соробан',
  },

  form: {
    title: 'Записаться на бесплатный пробный урок',
    subtitle:
      'Заполните форму — администратор свяжется с вами в течение дня, чтобы подобрать ближайшую группу.',
    freeBadge: 'Бесплатно',
    callPrompt: 'Можно позвонить:',
    labels: {
      parentName: 'Ваше имя',
      phone: 'Телефон',
      childName: 'Имя ребёнка',
      childAge: 'Возраст ребёнка',
      district: 'Удобный район',
      language: 'Язык занятий',
      format: 'Формат',
      comment: 'Комментарий',
      consent: 'Я согласен(на) на обработку персональных данных',
    },
    placeholders: {
      parentName: 'Как к вам обращаться',
      phone: '+373 …',
      childName: 'Как зовут ребёнка',
      childAge: 'Полных лет',
      comment: 'Что важно знать — необязательно',
      select: 'Выберите вариант',
    },
    errors: {
      parentName: 'Укажите имя',
      phone: 'Укажите корректный телефон',
      childName: 'Укажите имя ребёнка',
      childAge: 'Возраст ребёнка — от 5 до 12 лет',
      district: 'Выберите район',
      language: 'Выберите язык занятий',
      format: 'Выберите формат',
      consent: 'Нужно согласие на обработку персональных данных',
    },
    options: {
      districts: ['Центр', 'Ботаника', 'Чоканы', 'Буюканы', 'Онлайн', 'Не знаю, подскажите'],
      languages: ['Русский', 'Румынский'],
      formats: ['Офлайн', 'Онлайн'],
    },
    submit: 'Отправить заявку',
    submitting: 'Отправляем…',
    successTitle: 'Спасибо!',
    successText: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    errorTitle: 'Не удалось отправить заявку',
    errorText: 'Позвоните нам или попробуйте ещё раз.',
    validationError: 'В форме есть ошибки. Проверьте выделенные поля.',
    honeypotLabel: 'Не заполняйте это поле',
    retry: 'Попробовать снова',
    privacyLinkText: 'Политика конфиденциальности',
  },

  footer: {
    tagline: 'Школа ментальной арифметики в Кишинёве',
    foundedText: 'В Молдове с {year} года',
    sectionsTitle: 'Разделы',
    contactsTitle: 'Контакты',
    linksTitle: 'Ссылки',
    siteLink: 'Сайт школы',
    privacy: 'Политика конфиденциальности',
    rights: 'Все права защищены',
  },
};

// ---------------------------------------------------------------------------
// RO — версия для Республики Молдова. Живой румынский, не дословный перевод.
// ---------------------------------------------------------------------------
const ro: LocaleContent = {
  htmlLang: 'ro',
  ogLocale: 'ro_RO',

  logoAlt: 'Logotipul școlii SOROBAN',
  brandCity: 'Chișinău',
  skipLink: 'Treceți la conținutul principal',

  nav: [
    { href: '#about', label: 'Despre metodă' },
    { href: '#how', label: 'Lecții' },
    { href: '#app', label: 'Aplicația' },
    { href: '#faq', label: 'Întrebări' },
    { href: '#contacts', label: 'Contacte' },
  ],
  footerNav: [
    { href: '#about', label: 'Despre metodă' },
    { href: '#how', label: 'Cum se desfășoară lecțiile' },
    { href: '#app', label: 'Aplicația SoroboomAR' },
    { href: '#faq', label: 'Întrebări frecvente' },
  ],

  a11y: {
    mainNav: 'Navigare principală',
    footerNav: 'Navigare în subsol',
    openMenu: 'Deschideți meniul',
    closeMenu: 'Închideți meniul',
    langSwitch: 'Schimbați limba site-ului',
  },

  meta: {
    title:
      'SOROBAN Chișinău — lecție de probă gratuită de aritmetică mentală pentru copii de 5–12 ani',
    description:
      'Programați copilul de 5–12 ani la o lecție de probă gratuită de aritmetică mentală SOROBAN în Chișinău. Lecții offline în 4 sectoare ale orașului sau online, în limba română sau rusă.',
  },

  cta: {
    primary: 'Înscrie-l acum!',
    call: 'Sunați-ne',
  },

  finalCta: {
    title: 'Înscrie-ți copilul la o lecție de probă gratuită!',
    text: 'Completați formularul de mai jos, iar noi vă vom contacta în aceeași zi pentru a vă recomanda cel mai potrivit grup pentru copilul dumneavoastră.',
  },

  hero: {
    eyebrow: 'Școala de aritmetică mentală SOROBAN · Chișinău',
    title: 'Lecție de probă gratuită de aritmetică mentală pentru copii de 5–12 ani',
    subtitle:
      'Lecțiile se desfășoară în grupuri de până la 12 copii, atât cu prezență fizică, într-una dintre filialele noastre din Chișinău, cât și online. Cursurile sunt disponibile în limba română sau rusă sau engleză.',
    points: [
      'Vârsta: 5–12 ani',
      'Lecția de probă durează 30–40 de minute',
      'Offline în 4 sectoare din Chișinău sau online',
      'SOROBAN activează în Moldova din 2017',
    ],
    videoAriaLabel: 'Videoclip despre metoda SOROBAN și lecțiile pentru copii',
    videoFallback: 'Browserul dumneavoastră nu acceptă redarea video.',
    videoDownload: 'Descărcați videoclipul despre metoda SOROBAN (MP4)',
    videoCaption:
      'Videoclip despre metoda SOROBAN: profesoara povestește despre lecțiile de aritmetică mentală pentru copii de 5–12 ani din Chișinău.',
  },

  about: {
    eyebrow: 'Metoda',
    title: 'Ce este aritmetica mentală?',
    text: [
      'Aritmetica mentală este o metodă de calcul și dezvoltare a abilităților cognitive, bazată pe utilizarea abacului japonez Soroban. Copilul învață treptat să efectueze calcule mintale, vizualizând poziția bilelor.',
      'SOROBAN activează în Republica Moldova din 2017. Lecțiile se desfășoară în grupe, după programul școlar, și sunt completate de exerciții interactive în aplicația SoroboomAR.',
    ],
    imageAlt:
      'Clasă la școala SOROBAN: un grup de copii la bănci, cu sorobane și caiete de lucru, ridică mâinile; pe perete — logotipul Soroban',
  },

  learn: {
    eyebrow: 'La lecții',
    title: 'Ce fac copiii la lecții?',
    items: [
      'Lucrează pe abacul japonez și învață să calculeze imaginar.',
      'Antrenează atenția și concentrarea în timpul efectuării exercițiilor.',
      'Exersează și își dezolată abilitățile, utilizând aplicația exclusivă SoroboomAR, sub monitorizarea antrenorului.',
      'Lucrează în grup, stimulând astfel spiritul competitiv',
    ],
    note: 'Progresul copilului este influențat de vârstă, consecvență și practica regulată.',
  },

  how: {
    eyebrow: 'Formatul lecțiilor',
    title: 'Cum se desfășoară lecțiile?',
    items: [
      { label: 'Vârsta', value: '5-12 ani' },
      { label: 'Formatul', value: 'Offline, în unul din sediile noastre, sau online' },
      { label: 'Durata lecției', value: '70 minute / 90 minute, în dependență de vârsta' },
      { label: 'Grupuri', value: 'Până la 12 copii' },
      { label: 'Limba de predare', value: 'Română, rusă sau engleză' },
      { label: 'Include', value: 'Aplicația SoroboomAR' },
    ],
    imageAlt: 'Doi copii la aceeași bancă lucrează cu sorobane și caiete deschise',
  },

  app: {
    eyebrow: 'Aplicația',
    title: 'Aplicația SoroboomAR',
    text: 'SoroboomAR adaptează exercițiile la ritmul fiecărui copil. Inteligențan artificială analizează modul și viteza de rezolvare, apoi selectează automat următoarea sarcină, cu un nivel de dificultate potrivit.',
    points: [
      'Inclusă în programul de studiu',
      'Disponibilă pe telefon, tabletă și computer',
      'Rezultatele sunt monitorizate de profesor',
    ],
    storesLabel: 'Descărcați aplicația',
    screenshotsNote: 'Capturi din aplicația SoroboomAR.',
    screenshotAlts: [
      'Captură din aplicația SoroboomAR: ecranul de start cu butonul „Start”',
      'Captură din aplicația SoroboomAR: personajul aleargă prin lumea jocului, în stânga — joystickul de control',
      'Captură din aplicația SoroboomAR: ecranul de antrenament al calculului, cu un număr afișat pe panou',
    ],
    onlinePhotoAlt:
      'O fetiță învață online la laptop, cu aplicația SoroboomAR; pe masă — un soroban',
  },

  vsl: {
    eyebrow: 'Video',
    title: 'Video despre lecții',
    text: 'Vezi în video cum calculează un elev SOROBAN doar cu ajutorul imaginației.',
    videoAriaLabel: 'Videoclip de la o lecție SOROBAN: un băiat calculează în minte',
    videoFallback: 'Browserul dumneavoastră nu acceptă redarea video.',
    videoDownload: 'Descărcați videoclipul (MP4)',
  },

  practice: {
    eyebrow: 'Cum lucrăm?',
    title: 'Practică la fiecare lecție și atenție din partea profesorului',
    text: [
      'Lecțiile se desfășoară în grupuri de până la 10 copii, într-un format care permite profesorului să urmărească progresul fiecărui elev. Copiii lucrează împreună și participă activ, răspunzând pe rând și primind îndrumarea necesară.',
      'Între lecții, materia este consolidată prin exerciții în aplicația SoroboomAR, iar profesorul poate monitoriza rezultatele și evoluția fiecărui copil.',
    ],
    imageAlt: 'Profesoara ajută un băiat să calculeze la sorobanul mare de perete',
  },

  trial: {
    title: 'Cum decurge o lecție de probă?',
    items: [
      'Durata orei de probă - 30-40 de minute',
      'Lecția se desfășoară în sediul ales, într-un grup exclusiv de începători, cu un profesor calificat.',
      '•Părinții pot asista la lecția de probă!',
    ],
    note: 'Completați formularul, iar noi vă contactăm în aceeași zi pentru a vă recomanda grupul potrivit pentru copilul dumneavoastră. Înscrie-ți copilul la o lecție de proba printr-un singur click!',
  },

  faq: {
    title: 'Întrebări frecvente',
    items: [
      {
        q: 'De la ce vârstă poate începe copilul?',
        a: 'Programul este destinat copiilor cu vârsta între 5 și 12 ani.',
      },
      {
        q: 'Lecțiile se desfășoară doar offline?',
        a: 'Nu. Lecțiile sunt disponibile atât offline, în sediile SOROBAN din sectoarele Centru, Botanica, Ciocana și Buiucani, cât și online.',
      },
      {
        q: 'Cât durează o lecție?',
        a: 'O lecție durează 70/90 de minute, în funcție de vârstă.',
      },
      {
        q: 'Câți copii sunt într-o grupă?',
        a: 'Grupele sunt formate din maxim 12 copii.',
      },
      {
        q: 'În ce limbă se desfășoară lecțiile?',
        a: 'Lecțiile sunt disponibile în română, rusă și engleză.',
      },
      {
        q: 'Cum se desfășoară lecția de probă?',
        a: 'Lecția durează 30–40 de minute și are loc într-un grup de începători, la unul dintre sediile SOROBAN sau online. Recomandăm prezența părintelui la lecția de probă. După lecția de probă, copilul este integrat într-un grup existent.',
      },
      {
        q: 'Care este costul cursului?',
        a: 'Informațiile despre preț și opțiunile de achitare sunt oferite de administrator în cadrul apelului, după înscriere.',
      },
    ],
  },

  contacts: {
    eyebrow: 'Contacte',
    title: 'Contacte',
    lead: 'Sunați-ne sau completați formularul, iar noi revenim cu un apel în aceeași zi.',
    phoneLabel: 'Telefon',
    phoneNote: 'Revenim cu un apel în aceeași zi!',
    officesTitle: 'Sediile școlii din Chișinău',
    onlineNote: 'Grupele online sunt pentru cei cărora le e mai comod să învețe de acasă.',
    mapButton: 'Vezi pe hartă',
    directionsButton: 'Vezi traseul',
    socialsTitle: 'Rețele sociale',
    siteButton: 'Site-ul principal al școlii',
    officeDistricts: {
      center: 'Centru',
      botanica: 'Botanica',
      ciocana: 'Ciocana',
      buiucani: 'Buiucani',
    },
  },

  testimonials: {
    eyebrow: 'Recenzii',
    title: 'Recenzii de la părinți',
    intro:
      'Capturi cu recenzii din profilul public al școlii pe Google Maps. Textele nu au fost modificate.',
    googleLink: 'Vedeți recenziile pe Google →',
    altTemplate:
      'Captură cu o recenzie de pe Google Maps: {nume}, evaluare de 5 stele, recenzie pozitivă despre școala SOROBAN',
  },

  form: {
    title: 'Înscrie-ți copilul la o lecție de probă gratuită!',
    subtitle:
      'Completați formularul de mai jos, iar noi vă vom contacta în aceeași zi pentru a vă recomanda cel mai potrivit grup pentru copilul dumneavoastră.',
    freeBadge: 'Gratuit',
    callPrompt: 'Ne puteți suna:',
    labels: {
      parentName: 'Numele dumneavoastră',
      phone: 'Număr de telefon',
      childName: 'Numele copilului',
      childAge: 'Vârsta copilului',
      district: 'Sectorul preferat',
      language: 'Limba în care vor avea loc lecțiile',
      format: 'Formatul lecțiilor',
      comment: 'Comentariu',
      consent: 'Sunt de acord cu prelucrarea datelor cu caracter personal',
    },
    placeholders: {
      parentName: 'Introduceți numele dumneavoastră',
      phone: '+373 …',
      childName: 'Introduceți numele și prenumele copilului',
      childAge: 'Introduceți vârsta copilului',
      comment: 'Ce este important să știm? — opțional',
      select: 'Alegeți o variantă',
    },
    errors: {
      parentName: 'Indicați numele',
      phone: 'Indicați un număr de telefon corect',
      childName: 'Indicați numele copilului',
      childAge: 'Vârsta copilului — între 5 și 12 ani',
      district: 'Alegeți sectorul',
      language: 'Alegeți limba de predare',
      format: 'Alegeți formatul',
      consent: 'Este nevoie de acordul pentru prelucrarea datelor cu caracter personal',
    },
    options: {
      districts: ['Centru', 'Botanica', 'Ciocana', 'Buiucani', 'Online', 'Nu știu, ajutați-mă'],
      languages: ['Română', 'Engleză', 'Rusă'],
      formats: ['Offline', 'Online'],
    },
    submit: 'Trimiteți cererea',
    submitting: 'Se trimite…',
    successTitle: 'Mulțumim!',
    successText: 'Cererea a fost trimisă. Vă contactăm în cel mai scurt timp.',
    errorTitle: 'Cererea nu a putut fi trimisă',
    errorText: 'Sunați-ne sau încercați din nou.',
    validationError: 'Formularul conține erori. Verificați câmpurile evidențiate.',
    honeypotLabel: 'Nu completați acest câmp',
    retry: 'Încercați din nou',
    privacyLinkText: 'Politica de confidențialitate',
  },

  footer: {
    tagline: 'Școala de aritmetică mentală din Chișinău',
    foundedText: 'În Moldova din {year}',
    sectionsTitle: 'Secțiuni',
    contactsTitle: 'Contacte',
    linksTitle: 'Linkuri',
    siteLink: 'Site-ul școlii',
    privacy: 'Politica de confidențialitate',
    rights: 'Toate drepturile rezervate',
  },
};

export const site: Record<Locale, LocaleContent> = { ru, ro };

export const defaultLocale: Locale = 'ru';

/** Локаль страницы по URL: `/ro`, `/ro/...` → `ro`, всё остальное → `ru`. */
export function getLocale(url: URL): Locale {
  const p = url.pathname;
  return p === '/ro' || p.startsWith('/ro/') ? 'ro' : 'ru';
}

/** Корне-относительные URL той же страницы в обеих локалях. */
export function localeUrls(pathname: string): { ru: string; ro: string } {
  const stripped = pathname.replace(/^\/ro(?=\/|$)/, '') || '/';
  return {
    ru: stripped,
    ro: stripped === '/' ? '/ro/' : `/ro${stripped}`,
  };
}
