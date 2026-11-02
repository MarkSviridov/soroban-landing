/**
 * Контент лендинга онлайн-занятий для зарубежного рынка.
 * Отдельно от src/content/site.ts: другая аудитория, другие тарифы, три локали.
 *
 * Валюта только евро. На румынской странице «lei» означает RON — молдавские
 * леи там прочитаются вчетверо дороже, поэтому их здесь нет вообще.
 */

export type OnlineLocale = 'ro' | 'ru' | 'en';

export interface PriceTier {
  /** Идентификатор для аналитики и выбора в форме. */
  id: 'group8' | 'group4' | 'solo';
  name: string;
  price: string;
  period: string;
  note: string;
  features: string[];
  highlighted?: boolean;
}

export interface QA {
  q: string;
  a: string;
}

export interface OnlineContent {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string };

  nav: { live: string; how: string; pricing: string; faq: string; cta: string };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: string[];
    ctaPrimary: string;
    ctaWhatsapp: string;
    trustLine: string;
    videoLabel: string;
    videoFallback: string;
    soundOn: string;
    soundOff: string;
  };

  welcome: {
    eyebrow: string;
    title: string;
    intro: string;
    points: string[];
    videoLabel: string;
  };

  live: {
    eyebrow: string;
    title: string;
    intro: string;
    not: { title: string; items: string[] };
    yes: { title: string; items: string[] };
  };

  how: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { label: string; value: string }[];
  };

  app: {
    eyebrow: string;
    title: string;
    text: string[];
    points: string[];
  };

  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    tiers: PriceTier[];
    includedTitle: string;
    included: string[];
    footnote: string;
    cta: string;
  };

  teachers: {
    eyebrow: string;
    title: string;
    intro: string;
    placeholder: string;
  };

  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
  };

  faq: { title: string; items: QA[] };

  form: {
    eyebrow: string;
    title: string;
    subtitle: string;
    labels: {
      parentName: string;
      contact: string;
      childAge: string;
      country: string;
      language: string;
      format: string;
      comment: string;
      consent: string;
    };
    placeholders: {
      parentName: string;
      contact: string;
      childAge: string;
      country: string;
      comment: string;
      select: string;
    };
    errors: {
      parentName: string;
      contact: string;
      childAge: string;
      language: string;
      consent: string;
    };
    options: { languages: string[]; formats: string[] };
    submit: string;
    submitting: string;
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
    retry: string;
    whatsappPrompt: string;
    whatsappCta: string;
  };

  footer: { tagline: string; rights: string };

  /** Баннер согласия на маркетинговые cookie (пиксель Meta). Нужен для ЕС. */
  consent: { text: string; accept: string; decline: string };
}

export interface OnlineVideo {
  src: string;
  poster: string;
  width: number;
  height: number;
}

/**
 * Запись реального онлайн-урока, вертикальное 9:16, со звуком. На первом экране
 * стартует беззвучно (браузеры не дают автозапуск со звуком), звук — по кнопке.
 */
export const LESSON_VIDEO: OnlineVideo = {
  src: '/videos/online/online-lesson.mp4',
  poster: '/videos/online/online-lesson-poster.jpg',
  width: 720,
  height: 1280,
};

/**
 * Приветственное видео преподавателя. Есть только на румынском: речь и вшитые
 * подписи румынские. Для ru/en секция не выводится, пока нет своих версий.
 */
export const WELCOME_VIDEO: Record<OnlineLocale, OnlineVideo | null> = {
  ro: {
    src: '/videos/welcome-ro.mp4',
    poster: '/videos/welcome-ro-poster.jpg',
    width: 720,
    height: 1280,
  },
  ru: null,
  en: null,
};

/** Контакт для WhatsApp. Номер школы; подтвердить, что он подключён к WhatsApp. */
export const WHATSAPP = {
  display: '+373 795 35 535',
  link: 'https://wa.me/37379535535',
} as const;

const ro: OnlineContent = {
  htmlLang: 'ro',
  ogLocale: 'ro_RO',
  meta: {
    title: 'Aritmetică mentală online cu profesor — lecții live pentru copii de 5–12 ani | SOROBAN',
    description:
      'Lecții live de aritmetică mentală cu profesor, în grupe mici, online. Pentru copii de 5–12 ani, în română, rusă sau engleză. Prima lecție de probă este gratuită.',
  },
  nav: {
    live: 'Lecții live',
    how: 'Cum decurge',
    pricing: 'Prețuri',
    faq: 'Întrebări',
    cta: 'Lecție gratuită',
  },
  hero: {
    eyebrow: 'Școala de aritmetică mentală SOROBAN · online',
    title: 'Lecții live de aritmetică mentală pentru copii de 5–12 ani',
    subtitle:
      'Profesor real, grupă mică și aceeași metodă care funcționează în sălile noastre de clasă din 2017. Lecțiile se desfășoară în română, rusă sau engleză — alegeți limba copilului.',
    points: [
      'Profesor live, nu lecții înregistrate',
      'Grupe de până la 8, până la 4 copii sau individual',
      'O dată pe săptămână + teme zilnice în aplicație',
      'Orar potrivit fusului dumneavoastră orar',
    ],
    ctaPrimary: 'Rezervați lecția de probă gratuită',
    ctaWhatsapp: 'Scrieți pe WhatsApp',
    trustLine: 'SOROBAN este o rețea internațională. În Moldova predăm din 2017.',
    videoLabel: 'Lecție online SOROBAN: profesorul lucrează cu grupa prin apel video',
    videoFallback: 'Browserul dumneavoastră nu poate reda acest video.',
    soundOn: 'Pornește sunetul',
    soundOff: 'Oprește sunetul',
  },
  welcome: {
    eyebrow: 'Prezentare',
    title: 'Cum este construit cursul',
    intro:
      'Profesorul nostru explică, în mai puțin de un minut, cum este organizat programul și cum continuă copilul exersarea acasă, în aplicație.',
    points: [
      'Programul este împărțit în module',
      'Lecția live o dată pe săptămână',
      'Exerciții zilnice în aplicația personalizată',
    ],
    videoLabel: 'Prezentarea cursului SOROBAN de către profesor',
  },
  live: {
    eyebrow: 'Diferența',
    title: 'Nu este un curs înregistrat',
    intro:
      'Majoritatea „cursurilor online” pentru copii sunt videoclipuri pe care părintele trebuie să le pornească singur. La noi copilul intră într-o lecție reală, cu profesor și colegi.',
    not: {
      title: 'Ce NU primiți',
      items: [
        'Videoclipuri înregistrate pe care le urmăriți singuri',
        'O aplicație lăsată în grija copilului',
        'Grupe de zeci de copii unde nimeni nu este întrebat',
        'Un chatbot în loc de profesor',
      ],
    },
    yes: {
      title: 'Ce primiți',
      items: [
        'Profesor care vede fiecare copil și îl ascultă pe rând',
        'Grupă mică: cel mult 8, 4 copii sau lecții individuale',
        'Aceeași programă ca în sălile noastre de clasă',
        'Aplicația SoroboomAR pentru exersat între lecții',
      ],
    },
  },
  how: {
    eyebrow: 'Formatul',
    title: 'Cum decurge învățarea',
    intro:
      'Copilul învață să calculeze pe abacul soroban, apoi efectuează operațiile în minte, imaginându-și bilele. Ritmul este constant: o întâlnire pe săptămână și exerciții scurte în fiecare zi.',
    steps: [
      { label: 'Vârsta', value: '5–12 ani' },
      { label: 'Frecvența', value: 'O dată pe săptămână' },
      { label: 'Durata întâlnirii', value: 'Două lecții: 35 min (5–7 ani) sau 45 min (8–12 ani)' },
      { label: 'Grupa', value: 'Până la 8, până la 4 copii sau individual' },
      { label: 'Limba lecțiilor', value: 'Română, rusă sau engleză' },
      { label: 'Între lecții', value: 'Teme zilnice în aplicația SoroboomAR' },
    ],
  },
  app: {
    eyebrow: 'Aplicația',
    title: 'SoroboomAR — exersare în fiecare zi',
    text: [
      'Aplicația este inclusă în abonament. Ea analizează viteza cu care copilul rezolvă și alege următorul exercițiu pe măsura lui — nici prea ușor, nici descurajant.',
      'Profesorul vede rezultatele și știe cu ce vine copilul la lecția următoare.',
    ],
    points: [
      'Acces zilnic, inclus în preț',
      'Funcționează pe telefon, tabletă și computer',
      'Profesorul urmărește progresul',
    ],
  },
  pricing: {
    eyebrow: 'Prețuri',
    title: 'Trei formate — alegeți după copil',
    intro:
      'Prețul este lunar, pentru un copil. Include lecțiile live și accesul zilnic la aplicație.',
    tiers: [
      {
        id: 'group8',
        name: 'Grupă până la 8 copii',
        price: '70 €',
        period: 'pe lună',
        note: 'Echilibrul dintre preț și atenția profesorului',
        features: [
          'Până la 8 copii în grupă',
          'O întâlnire pe săptămână',
          'Teme zilnice în aplicație',
        ],
      },
      {
        id: 'group4',
        name: 'Grupă până la 4 copii',
        price: '80 €',
        period: 'pe lună',
        note: 'Mai mult timp de vorbire pentru fiecare copil',
        features: [
          'Cel mult 4 copii în grupă',
          'O întâlnire pe săptămână',
          'Teme zilnice în aplicație',
        ],
        highlighted: true,
      },
      {
        id: 'solo',
        name: 'Lecții individuale',
        price: '100 €',
        period: 'pe lună',
        note: 'Ritm complet adaptat copilului',
        features: [
          'Profesorul lucrează doar cu copilul dumneavoastră',
          'O întâlnire pe săptămână',
          'Teme zilnice în aplicație',
        ],
      },
    ],
    includedTitle: 'În fiecare abonament intră',
    included: ['Lecțiile live cu profesor', 'Accesul zilnic la aplicația SoroboomAR'],
    footnote:
      'Prima lecție de probă este gratuită și nu vă obligă la nimic. Modalitățile de plată le stabilim după ea, împreună cu administratorul.',
    cta: 'Începeți cu lecția gratuită',
  },
  teachers: {
    eyebrow: 'Profesorii',
    title: 'Cine predă',
    intro:
      'Lecțiile online sunt ținute de profesorii școlii noastre, aceiași care lucrează cu copiii în sălile de clasă.',
    placeholder: 'Profilurile profesorilor — în pregătire.',
  },
  testimonials: {
    eyebrow: 'Părinții',
    title: 'Ce spun părinții',
    intro:
      'Recenzii din profilul public al școlii pe Google Maps. Textele, autorii și notele nu au fost modificate.',
  },
  faq: {
    title: 'Întrebări frecvente',
    items: [
      {
        q: 'Copilul chiar vede un profesor, în direct?',
        a: 'Da. Lecția este o întâlnire video în timp real, cu profesor și cu ceilalți copii din grupă. Nu sunt înregistrări.',
      },
      {
        q: 'Locuim în altă țară. Cum rămâne cu ora lecției?',
        a: 'Ora lecțiilor o stabiliți împreună cu administratorul, în conversație, ținând cont de fusul dumneavoastră orar.',
      },
      {
        q: 'În ce limbă se desfășoară lecțiile?',
        a: 'În română, rusă sau engleză — alegeți la înscriere. Limba în care ne scrieți nu determină limba lecțiilor.',
      },
      {
        q: 'De ce avem nevoie acasă?',
        a: 'Un computer, o tabletă sau un telefon cu cameră și internet stabil. Ce mai este necesar pentru lecții vă spune administratorul.',
      },
      {
        q: 'Ce se întâmplă dacă pierdem o lecție?',
        a: 'Anunțați profesorul din timp. Cum se recuperează lecția stabilește administratorul, în funcție de grupă.',
      },
      {
        q: 'Cât durează lecția de probă?',
        a: 'Până la 45 de minute. Este gratuită și are loc într-o grupă deja formată, ca să vedeți cum arată o lecție obișnuită.',
      },
      {
        q: 'Cum se plătește?',
        a: 'Modalitățile de plată le stabiliți cu administratorul după lecția de probă.',
      },
    ],
  },
  form: {
    eyebrow: 'Gratuit',
    title: 'Rezervați lecția de probă',
    subtitle:
      'Completați formularul — administratorul vă scrie pe WhatsApp, potrivește ora după fusul dumneavoastră orar și vă spune ce grupă este liberă.',
    labels: {
      parentName: 'Numele dumneavoastră',
      contact: 'WhatsApp sau telefon',
      childAge: 'Vârsta copilului',
      country: 'Țara și orașul',
      language: 'Limba lecțiilor',
      format: 'Formatul',
      comment: 'Comentariu',
      consent: 'Sunt de acord cu prelucrarea datelor cu caracter personal',
    },
    placeholders: {
      parentName: 'Cum vă putem numi',
      contact: '+40 ...',
      childAge: 'Ani împliniți',
      country: 'de exemplu, România, Cluj',
      comment: 'Ce ar fi util să știm',
      select: 'Alegeți',
    },
    errors: {
      parentName: 'Scrieți numele dumneavoastră',
      contact: 'Scrieți un număr de telefon la care vă putem contacta',
      childAge: 'Vârsta trebuie să fie între 5 și 12 ani',
      language: 'Alegeți limba lecțiilor',
      consent: 'Fără acord nu putem prelucra cererea',
    },
    options: {
      languages: ['Română', 'Rusă', 'Engleză'],
      formats: ['Grupă până la 8', 'Grupă până la 4', 'Individual', 'Încă nu știu'],
    },
    submit: 'Trimiteți cererea',
    submitting: 'Se trimite...',
    successTitle: 'Am primit cererea',
    successText:
      'Administratorul vă scrie pe WhatsApp în cursul zilei lucrătoare și stabiliți împreună ora lecției de probă.',
    errorTitle: 'Nu am putut trimite',
    errorText: 'Încercați din nou sau scrieți-ne direct pe WhatsApp.',
    retry: 'Încercați din nou',
    whatsappPrompt: 'Preferați să scrieți direct?',
    whatsappCta: 'Deschideți WhatsApp',
  },
  footer: {
    tagline: 'Școala de aritmetică mentală SOROBAN · lecții online',
    rights: 'Toate drepturile rezervate.',
  },
  consent: {
    text: 'Folosim cookie-uri de marketing (Meta Pixel) ca să vedem cât de bine funcționează reclamele noastre. Le activăm doar cu acordul dumneavoastră.',
    accept: 'Accept',
    decline: 'Refuz',
  },
};

const ru: OnlineContent = {
  htmlLang: 'ru',
  ogLocale: 'ru_RU',
  meta: {
    title:
      'Ментальная арифметика онлайн с преподавателем — живые уроки для детей 5–12 лет | SOROBAN',
    description:
      'Живые онлайн-уроки ментальной арифметики с преподавателем в малых группах. Для детей 5–12 лет, на румынском, русском или английском. Первый пробный урок бесплатно.',
  },
  nav: {
    live: 'Живые уроки',
    how: 'Как проходит',
    pricing: 'Цены',
    faq: 'Вопросы',
    cta: 'Бесплатный урок',
  },
  hero: {
    eyebrow: 'Школа ментальной арифметики SOROBAN · онлайн',
    title: 'Живые уроки ментальной арифметики для детей 5–12 лет',
    subtitle:
      'Настоящий преподаватель, небольшая группа и та же методика, которая работает в наших классах с 2017 года. Занятия на румынском, русском или английском — выбираете язык ребёнка.',
    points: [
      'Живой преподаватель, а не запись',
      'Группы до 8, до 4 детей или индивидуально',
      'Раз в неделю плюс ежедневные задания в приложении',
      'Время урока подбираем под ваш часовой пояс',
    ],
    ctaPrimary: 'Записаться на бесплатный урок',
    ctaWhatsapp: 'Написать в WhatsApp',
    trustLine: 'SOROBAN — международная сеть школ. В Молдове преподаём с 2017 года.',
    videoLabel: 'Онлайн-урок SOROBAN: преподаватель занимается с группой по видеосвязи',
    videoFallback: 'Ваш браузер не может воспроизвести это видео.',
    soundOn: 'Включить звук',
    soundOff: 'Выключить звук',
  },
  welcome: {
    eyebrow: 'Знакомство',
    title: 'Как устроен курс',
    intro:
      'Преподаватель меньше чем за минуту рассказывает, как построена программа и как ребёнок продолжает практику дома, в приложении.',
    points: [
      'Программа разбита на модули',
      'Живой урок раз в неделю',
      'Ежедневные упражнения в персональном приложении',
    ],
    videoLabel: 'Преподаватель SOROBAN рассказывает о курсе',
  },
  live: {
    eyebrow: 'Отличие',
    title: 'Это не курс в записи',
    intro:
      'Большинство «онлайн-курсов» для детей — это видео, которые родитель должен включать сам. У нас ребёнок приходит на настоящий урок, где есть преподаватель и одногруппники.',
    not: {
      title: 'Чего здесь нет',
      items: [
        'Записанных видео, которые смотришь в одиночку',
        'Приложения, оставленного ребёнку наедине',
        'Потоков на десятки детей, где никого не спрашивают',
        'Чат-бота вместо преподавателя',
      ],
    },
    yes: {
      title: 'Что есть',
      items: [
        'Преподаватель видит каждого ребёнка и спрашивает по очереди',
        'Малая группа: до 8, до 4 детей или индивидуально',
        'Та же программа, что в наших классах',
        'Приложение SoroboomAR для практики между уроками',
      ],
    },
  },
  how: {
    eyebrow: 'Формат',
    title: 'Как устроено обучение',
    intro:
      'Ребёнок сначала учится считать на счётах соробан, а затем выполняет действия в уме, представляя косточки. Ритм ровный: одна встреча в неделю и короткие упражнения каждый день.',
    steps: [
      { label: 'Возраст', value: '5–12 лет' },
      { label: 'Периодичность', value: 'Раз в неделю' },
      { label: 'Длительность встречи', value: 'Два урока: 35 мин (5–7 лет) или 45 мин (8–12 лет)' },
      { label: 'Группа', value: 'До 8, до 4 детей или индивидуально' },
      { label: 'Язык занятий', value: 'Румынский, русский или английский' },
      { label: 'Между уроками', value: 'Ежедневные задания в приложении SoroboomAR' },
    ],
  },
  app: {
    eyebrow: 'Приложение',
    title: 'SoroboomAR — практика каждый день',
    text: [
      'Приложение входит в абонемент. Оно смотрит, с какой скоростью ребёнок решает, и подбирает следующее упражнение по силам — не слишком простое и не отбивающее охоту.',
      'Преподаватель видит результаты и знает, с чем ребёнок придёт на следующий урок.',
    ],
    points: [
      'Ежедневный доступ, входит в цену',
      'Работает на телефоне, планшете и компьютере',
      'Преподаватель видит прогресс',
    ],
  },
  pricing: {
    eyebrow: 'Цены',
    title: 'Три формата — выбираете под ребёнка',
    intro:
      'Цена за месяц, за одного ребёнка. Включает живые уроки и ежедневный доступ к приложению.',
    tiers: [
      {
        id: 'group8',
        name: 'Группа до 8 детей',
        price: '70 €',
        period: 'в месяц',
        note: 'Баланс цены и внимания преподавателя',
        features: [
          'До 8 детей в группе',
          'Одна встреча в неделю',
          'Ежедневные задания в приложении',
        ],
      },
      {
        id: 'group4',
        name: 'Группа до 4 детей',
        price: '80 €',
        period: 'в месяц',
        note: 'Больше времени говорить у каждого ребёнка',
        features: [
          'Не больше 4 детей в группе',
          'Одна встреча в неделю',
          'Ежедневные задания в приложении',
        ],
        highlighted: true,
      },
      {
        id: 'solo',
        name: 'Индивидуально',
        price: '100 €',
        period: 'в месяц',
        note: 'Темп полностью под ребёнка',
        features: [
          'Преподаватель работает только с вашим ребёнком',
          'Одна встреча в неделю',
          'Ежедневные задания в приложении',
        ],
      },
    ],
    includedTitle: 'В каждый абонемент входит',
    included: ['Живые уроки с преподавателем', 'Ежедневный доступ к приложению SoroboomAR'],
    footnote:
      'Первый пробный урок бесплатный и ни к чему не обязывает. Способы оплаты обсуждаем после него, вместе с администратором.',
    cta: 'Начать с бесплатного урока',
  },
  teachers: {
    eyebrow: 'Преподаватели',
    title: 'Кто ведёт занятия',
    intro: 'Онлайн-уроки ведут преподаватели нашей школы — те же, что работают с детьми в классах.',
    placeholder: 'Профили преподавателей — готовим.',
  },
  testimonials: {
    eyebrow: 'Родители',
    title: 'Что говорят родители',
    intro:
      'Отзывы из публичного профиля школы в Google Картах. Тексты, авторы и оценки не изменялись.',
  },
  faq: {
    title: 'Частые вопросы',
    items: [
      {
        q: 'Ребёнок правда видит преподавателя вживую?',
        a: 'Да. Урок — это видеовстреча в реальном времени, с преподавателем и другими детьми из группы. Никаких записей.',
      },
      {
        q: 'Мы живём в другой стране. Как со временем урока?',
        a: 'Время занятий вы согласуете с администратором в переписке — с учётом вашего часового пояса.',
      },
      {
        q: 'На каком языке проходят занятия?',
        a: 'На румынском, русском или английском — выбираете при записи. Язык переписки не определяет язык занятий.',
      },
      {
        q: 'Что нужно дома?',
        a: 'Компьютер, планшет или телефон с камерой и устойчивый интернет. Что ещё понадобится для занятий, подскажет администратор.',
      },
      {
        q: 'А если пропустили урок?',
        a: 'Предупредите преподавателя заранее. Как отработать занятие, решает администратор — это зависит от группы.',
      },
      {
        q: 'Сколько длится пробный урок?',
        a: 'До 45 минут. Он бесплатный и проходит в уже сформированной группе, чтобы вы увидели обычное занятие.',
      },
      {
        q: 'Как происходит оплата?',
        a: 'Способы оплаты обсуждаете с администратором после пробного урока.',
      },
    ],
  },
  form: {
    eyebrow: 'Бесплатно',
    title: 'Записаться на пробный урок',
    subtitle:
      'Заполните форму — администратор напишет в WhatsApp, подберёт время под ваш часовой пояс и скажет, какая группа свободна.',
    labels: {
      parentName: 'Ваше имя',
      contact: 'WhatsApp или телефон',
      childAge: 'Возраст ребёнка',
      country: 'Страна и город',
      language: 'Язык занятий',
      format: 'Формат',
      comment: 'Комментарий',
      consent: 'Согласен на обработку персональных данных',
    },
    placeholders: {
      parentName: 'Как к вам обращаться',
      contact: '+39 ...',
      childAge: 'Полных лет',
      country: 'например, Италия, Милан',
      comment: 'Что полезно знать',
      select: 'Выберите',
    },
    errors: {
      parentName: 'Напишите ваше имя',
      contact: 'Напишите номер, по которому вас найти',
      childAge: 'Возраст должен быть от 5 до 12 лет',
      language: 'Выберите язык занятий',
      consent: 'Без согласия мы не сможем обработать заявку',
    },
    options: {
      languages: ['Румынский', 'Русский', 'Английский'],
      formats: ['Группа до 8', 'Группа до 4', 'Индивидуально', 'Пока не знаю'],
    },
    submit: 'Отправить заявку',
    submitting: 'Отправляем...',
    successTitle: 'Заявка получена',
    successText:
      'Администратор напишет в WhatsApp в течение рабочего дня, и вы вместе выберете время пробного урока.',
    errorTitle: 'Не удалось отправить',
    errorText: 'Попробуйте ещё раз или напишите нам прямо в WhatsApp.',
    retry: 'Попробовать снова',
    whatsappPrompt: 'Удобнее написать сразу?',
    whatsappCta: 'Открыть WhatsApp',
  },
  footer: {
    tagline: 'Школа ментальной арифметики SOROBAN · онлайн-занятия',
    rights: 'Все права защищены.',
  },
  consent: {
    text: 'Мы используем маркетинговые cookie (Meta Pixel), чтобы понимать, как работает наша реклама. Включаем их только с вашего согласия.',
    accept: 'Согласен',
    decline: 'Отказаться',
  },
};

const en: OnlineContent = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  meta: {
    title: 'Online mental arithmetic with a live teacher — classes for kids 5–12 | SOROBAN',
    description:
      'Live online mental arithmetic lessons with a real teacher in small groups. For children aged 5–12, in Romanian, Russian or English. First trial lesson is free.',
  },
  nav: {
    live: 'Live lessons',
    how: 'How it works',
    pricing: 'Pricing',
    faq: 'FAQ',
    cta: 'Free lesson',
  },
  hero: {
    eyebrow: 'SOROBAN mental arithmetic school · online',
    title: 'Live mental arithmetic lessons for children aged 5–12',
    subtitle:
      'A real teacher, a small group and the same method we have taught in our classrooms since 2017. Lessons run in Romanian, Russian or English — you choose your child’s language.',
    points: [
      'A live teacher, not a recorded course',
      'Groups of up to 8, up to 4, or one-to-one',
      'Once a week plus daily practice in the app',
      'Lesson times fitted to your time zone',
    ],
    ctaPrimary: 'Book a free trial lesson',
    ctaWhatsapp: 'Message us on WhatsApp',
    trustLine:
      'SOROBAN is an international network of schools. We have taught in Moldova since 2017.',
    videoLabel: 'SOROBAN online lesson: the teacher works with a group over a video call',
    videoFallback: 'Your browser cannot play this video.',
    soundOn: 'Turn sound on',
    soundOff: 'Turn sound off',
  },
  welcome: {
    eyebrow: 'Introduction',
    title: 'How the course is built',
    intro:
      'In under a minute, our teacher explains how the programme is organised and how your child keeps practising at home in the app.',
    points: [
      'The programme is split into modules',
      'A live lesson once a week',
      'Daily exercises in the personalised app',
    ],
    videoLabel: 'A SOROBAN teacher introduces the course',
  },
  live: {
    eyebrow: 'The difference',
    title: 'This is not a recorded course',
    intro:
      'Most “online courses” for children are videos a parent has to start. Here your child joins a real lesson, with a teacher and classmates.',
    not: {
      title: 'What you don’t get',
      items: [
        'Pre-recorded videos you watch alone',
        'An app left to the child to figure out',
        'Streams with dozens of children and no questions asked',
        'A chatbot instead of a teacher',
      ],
    },
    yes: {
      title: 'What you do get',
      items: [
        'A teacher who sees every child and asks each in turn',
        'A small group: up to 8, up to 4, or one-to-one',
        'The same curriculum we teach in our classrooms',
        'The SoroboomAR app for practice between lessons',
      ],
    },
  },
  how: {
    eyebrow: 'The format',
    title: 'How the learning works',
    intro:
      'Children first learn to calculate on the soroban abacus, then perform the operations in their head by picturing the beads. The rhythm is steady: one meeting a week and short daily exercises.',
    steps: [
      { label: 'Age', value: '5–12 years' },
      { label: 'Frequency', value: 'Once a week' },
      { label: 'Session length', value: 'Two lessons: 35 min (ages 5–7) or 45 min (ages 8–12)' },
      { label: 'Group', value: 'Up to 8, up to 4, or one-to-one' },
      { label: 'Language', value: 'Romanian, Russian or English' },
      { label: 'Between lessons', value: 'Daily homework in the SoroboomAR app' },
    ],
  },
  app: {
    eyebrow: 'The app',
    title: 'SoroboomAR — practice every day',
    text: [
      'The app is included in the subscription. It watches how quickly your child solves each task and picks the next exercise at the right level — not too easy, not discouraging.',
      'The teacher sees the results and knows what your child brings to the next lesson.',
    ],
    points: [
      'Daily access, included in the price',
      'Works on phone, tablet and computer',
      'The teacher follows the progress',
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Three formats — pick the one that fits',
    intro: 'Monthly price, per child. Includes the live lessons and daily access to the app.',
    tiers: [
      {
        id: 'group8',
        name: 'Group of up to 8',
        price: '€70',
        period: 'per month',
        note: 'The balance of price and teacher attention',
        features: [
          'Up to 8 children in the group',
          'One session a week',
          'Daily homework in the app',
        ],
      },
      {
        id: 'group4',
        name: 'Group of up to 4',
        price: '€80',
        period: 'per month',
        note: 'More speaking time for every child',
        features: ['No more than 4 children', 'One session a week', 'Daily homework in the app'],
        highlighted: true,
      },
      {
        id: 'solo',
        name: 'One-to-one',
        price: '€100',
        period: 'per month',
        note: 'The pace is entirely your child’s',
        features: [
          'The teacher works with your child only',
          'One session a week',
          'Daily homework in the app',
        ],
      },
    ],
    includedTitle: 'Every subscription includes',
    included: ['Live lessons with a teacher', 'Daily access to the SoroboomAR app'],
    footnote:
      'The first trial lesson is free and commits you to nothing. Payment methods are agreed with the administrator afterwards.',
    cta: 'Start with the free lesson',
  },
  teachers: {
    eyebrow: 'Teachers',
    title: 'Who teaches',
    intro:
      'Online lessons are taught by our school’s teachers — the same ones who work with children in our classrooms.',
    placeholder: 'Teacher profiles — coming soon.',
  },
  testimonials: {
    eyebrow: 'Parents',
    title: 'What parents say',
    intro:
      'Reviews from the school’s public Google Maps profile. Texts, authors and ratings are unchanged.',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Does my child really see a live teacher?',
        a: 'Yes. A lesson is a real-time video meeting with a teacher and the other children in the group. Nothing is pre-recorded.',
      },
      {
        q: 'We live abroad. What about the lesson time?',
        a: 'You agree the lesson time with the administrator in your chat, taking your time zone into account.',
      },
      {
        q: 'What language are the lessons in?',
        a: 'Romanian, Russian or English — you choose when you sign up. The language you write to us in does not decide the lesson language.',
      },
      {
        q: 'What do we need at home?',
        a: 'A computer, tablet or phone with a camera, and a stable connection. The administrator will tell you what else you need for the lessons.',
      },
      {
        q: 'What if we miss a lesson?',
        a: 'Let the teacher know in advance. How the lesson is made up is decided by the administrator and depends on the group.',
      },
      {
        q: 'How long is the trial lesson?',
        a: 'Up to 45 minutes. It is free and takes place in an existing group, so you see what a normal lesson looks like.',
      },
      {
        q: 'How does payment work?',
        a: 'You agree payment methods with the administrator after the trial lesson.',
      },
    ],
  },
  form: {
    eyebrow: 'Free',
    title: 'Book your trial lesson',
    subtitle:
      'Fill in the form — the administrator will message you on WhatsApp, fit the time to your time zone and tell you which group is open.',
    labels: {
      parentName: 'Your name',
      contact: 'WhatsApp or phone',
      childAge: 'Child’s age',
      country: 'Country and city',
      language: 'Lesson language',
      format: 'Format',
      comment: 'Comment',
      consent: 'I agree to the processing of my personal data',
    },
    placeholders: {
      parentName: 'What should we call you',
      contact: '+44 ...',
      childAge: 'Years',
      country: 'e.g. Italy, Milan',
      comment: 'Anything useful to know',
      select: 'Choose',
    },
    errors: {
      parentName: 'Please enter your name',
      contact: 'Please enter a number we can reach you on',
      childAge: 'Age must be between 5 and 12',
      language: 'Please choose the lesson language',
      consent: 'We cannot process the request without your consent',
    },
    options: {
      languages: ['Romanian', 'Russian', 'English'],
      formats: ['Group of up to 8', 'Group of up to 4', 'One-to-one', 'Not sure yet'],
    },
    submit: 'Send request',
    submitting: 'Sending...',
    successTitle: 'Request received',
    successText:
      'The administrator will message you on WhatsApp within the working day and you will pick a time for the trial lesson together.',
    errorTitle: 'Could not send',
    errorText: 'Please try again, or message us directly on WhatsApp.',
    retry: 'Try again',
    whatsappPrompt: 'Prefer to message us directly?',
    whatsappCta: 'Open WhatsApp',
  },
  footer: {
    tagline: 'SOROBAN mental arithmetic school · online lessons',
    rights: 'All rights reserved.',
  },
  consent: {
    text: 'We use marketing cookies (Meta Pixel) to see how well our ads work. We only turn them on with your consent.',
    accept: 'Accept',
    decline: 'Decline',
  },
};

export const online: Record<OnlineLocale, OnlineContent> = { ro, ru, en };

/**
 * Опубликованные версии. Пока только румынская (решение заказчика 23.10.2026).
 * Тексты ru/en сохранены: чтобы вернуть версию, добавьте локаль сюда и
 * восстановите страницу src/pages/online/<локаль>/index.astro.
 */
export const PUBLISHED_ONLINE_LOCALES: OnlineLocale[] = ['ro'];

/** Локаль по URL: /online/ → ro, /online/ru/ → ru, /online/en/ → en. */
export function getOnlineLocale(url: URL): OnlineLocale {
  const p = url.pathname;
  if (p === '/online/ru' || p.startsWith('/online/ru/')) return 'ru';
  if (p === '/online/en' || p.startsWith('/online/en/')) return 'en';
  return 'ro';
}

/** Корне-относительные URL этой же страницы во всех локалях. */
export const onlineUrls: Record<OnlineLocale, string> = {
  ro: '/online/',
  ru: '/online/ru/',
  en: '/online/en/',
};

export const onlineLocaleNames: Record<OnlineLocale, string> = {
  ro: 'RO',
  ru: 'RU',
  en: 'EN',
};
