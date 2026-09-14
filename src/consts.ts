/**
 * Централизованные подтверждённые данные школы.
 * Тексты интерфейса — в src/content/site.ts. Здесь только факты и ссылки.
 */

export const SITE = {
  name: 'SOROBAN',
  brandFull: 'Школа ментальной арифметики SOROBAN',
  city: 'Кишинёв',
  countryCode: 'MD',
  // Домен лендинга.
  url: 'https://soroban.digital',
  mainSite: 'https://www.soroban.md',
  foundedInMoldova: 2017,
  /** Срок обратной связи по заявке. */
  responseTime: 'в течение дня',
} as const;

export const PHONE = {
  display: '+373 795 35 535',
  href: 'tel:+37379535535',
} as const;

export const AGE = { min: 5, max: 12 } as const;

/**
 * Пути к видео по локалям. Держим здесь, а не в src/content/site.ts, чтобы не
 * раздувать клиентский бандл формы (form.client.ts импортирует весь `site`).
 * `poster` — кадр-заставка. Тип `LESSON_VIDEO.ro` допускает `null` — если ролика
 * для локали нет, страница может не подключать секцию «Видео о занятиях».
 */
export interface VideoAsset {
  src: string;
  poster: string;
}

export const HERO_VIDEO: Record<'ru' | 'ro', VideoAsset> = {
  ru: { src: '/videos/vsl-soroban.mp4', poster: '/videos/vsl-soroban-poster.jpg' },
  ro: { src: '/videos/ro/vsl-soroban-ro.mp4', poster: '/videos/ro/vsl-soroban-ro-poster.jpg' },
};

export const LESSON_VIDEO: { ru: VideoAsset; ro: VideoAsset | null } = {
  ru: {
    src: '/videos/vsl-soroban-lesson.mp4',
    poster: '/videos/vsl-soroban-lesson-poster.jpg',
  },
  ro: {
    src: '/videos/ro/vsl-soroban-lesson-ro.mp4',
    poster: '/videos/ro/vsl-soroban-lesson-ro-poster.jpg',
  },
};

export const LESSON = {
  /** Длительность обычного (регулярного) занятия, минут. */
  minutes: 45,
  /** Максимум детей в группе. */
  groupMax: 10,
} as const;

export const TRIAL = {
  /** Бесплатный пробный урок длится 30–40 минут (только про пробный урок). */
  minMinutes: 30,
  maxMinutes: 40,
} as const;

/**
 * Внутренняя пометка: стоимость обучения — 70 евро.
 * На лендинге НЕ показываем (по требованию заказчика). Оставлено для справки.
 */
export const PRICE_INTERNAL_EUR = 70;

export interface Office {
  id: string;
  district: string;
  address: string;
  /** Строка запроса для ссылок на Google Maps (без API-ключа). */
  mapQuery: string;
}

export const OFFICES: Office[] = [
  {
    id: 'center',
    district: 'Центр',
    address: 'bd. Ștefan cel Mare 141/1, of. 3',
    mapQuery: 'bd. Ștefan cel Mare 141/1, Chișinău',
  },
  {
    id: 'botanica',
    district: 'Ботаника',
    address: 'str. Constantin Brâncuși 110, of. 28',
    mapQuery: 'str. Constantin Brâncuși 110, Chișinău',
  },
  {
    id: 'ciocana',
    district: 'Чоканы',
    address: 'str. Mircea cel Bătrân 34/6',
    mapQuery: 'str. Mircea cel Bătrân 34/6, Chișinău',
  },
  {
    id: 'buiucani',
    district: 'Буюканы',
    address: 'str. Alba Iulia 89, Chișinău, Moldova',
    mapQuery: 'str. Alba Iulia 89, Chișinău',
  },
];

/** Ссылка «Открыть на карте». */
export const mapSearchUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** Ссылка «Открыть маршрут». */
export const mapDirectionsUrl = (query: string): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

export const APP_LINKS = {
  name: 'SoroboomAR',
  appStore: 'https://apps.apple.com/md/app/soroboomar/id1494135858',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.Soroboom.AR',
} as const;

export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/soroban.moldova' },
  { label: 'Facebook', href: 'https://www.facebook.com/sorobanmoldova/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ШколаСоробанМолдова' },
];

/**
 * Прямая ссылка на отзывы школы в Google Картах / Google Maps.
 * TODO: указать реальный URL — тогда в секции отзывов появится кнопка
 * «Смотреть отзывы в Google». Пока пусто — кнопка не показывается.
 */
export const GOOGLE_REVIEWS_URL: string = '';

/**
 * Приём заявок формы: Google Apps Script Web App, который дописывает строки в
 * Google Sheets. Это публичный URL деплоя (не токен и не секрет). В интерфейсе
 * не отображается — используется только в fetch внутри form.client.ts.
 */
export const LEADS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxK-o3J4pV9uuIaTH5UmxZGbod3fi2OD_-3cqro2-_daas7KFKyWeZId2eJ4voy5plt/exec';

// Варианты для полей формы заявки локализованы: см. `form.options` в src/content/site.ts.
