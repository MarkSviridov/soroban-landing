/**
 * Отзывы родителей — скриншоты из публичного профиля школы в Google Картах.
 *
 * Тексты отзывов не редактируются и не переписываются. Авторы, даты и оценки —
 * как на скриншоте. Оригиналы: public/images/reviews/.
 * Оптимизированные копии (WebP): public/images/optimized/reviews/.
 *
 * `names` — имена авторов со скриншота (данные, одинаковы для всех локалей).
 * Alt-текст собирается в Testimonials.astro из `t.testimonials.altTemplate`
 * подстановкой `{nume}` → `names`.
 *
 * ВАЖНО: перед публикацией сайта нужно подтвердить, что школа вправе использовать
 * эти скриншоты в рекламном лендинге (см. README).
 */

import type { Locale } from './site';

export interface Review {
  src: string;
  names: string;
  width: number;
  height: number;
}

/** Подставляет имена авторов в шаблон alt-текста из локали. */
export const buildReviewAlt = (template: string, names: string): string =>
  template.replace('{nume}', names);

const ru: Review[] = [
  {
    src: '/images/optimized/reviews/review-01.webp',
    names: '«Галина Мигель» и «Pan Construct SRL»',
    width: 950,
    height: 940,
  },
  {
    src: '/images/optimized/reviews/review-02.webp',
    names: '«Диана Андроновичи» и «Саповал Ина»',
    width: 964,
    height: 1004,
  },
  {
    src: '/images/optimized/reviews/review-03.webp',
    names: '«Екатерина Кривда» и «Илия (justzipper)»',
    width: 962,
    height: 856,
  },
  {
    src: '/images/optimized/reviews/review-04.webp',
    names: '«Даниэла Чиоклеа» и «Марсела Максим»',
    width: 958,
    height: 984,
  },
  {
    src: '/images/optimized/reviews/review-05.webp',
    names: '«Виктория Короваи» и «Гео Лупаску»',
    width: 958,
    height: 998,
  },
  {
    src: '/images/optimized/reviews/review-06.webp',
    names: '«Марсела Стратан» и «Ана Редеа»',
    width: 964,
    height: 980,
  },
  {
    src: '/images/optimized/reviews/review-07.webp',
    names: '«Данута Алиона» и «Александру Ротару»',
    width: 954,
    height: 958,
  },
  {
    src: '/images/optimized/reviews/review-08.webp',
    names: '«Наталья Петрашишина» и «стоимость»',
    width: 964,
    height: 954,
  },
  {
    src: '/images/optimized/reviews/review-09.webp',
    names: '«Надежда Инкулет» и «Тиана Ти»',
    width: 954,
    height: 1030,
  },
  {
    src: '/images/optimized/reviews/review-10.webp',
    names: '«Наталья Шерван» и «Адриан Савчиук»',
    width: 960,
    height: 1054,
  },
];

/**
 * Румынские отзывы — скриншоты из того же публичного профиля школы в Google Картах.
 * Оригиналы: public/images/reviews/ro/. Оптимизированные (WebP): public/images/optimized/reviews/ro/.
 * `names` — имена авторов, считанные со скриншотов (не переводятся).
 */
const ro: Review[] = [
  {
    src: '/images/optimized/reviews/ro/review-ro-01.webp',
    names: '«Cristina Popov»',
    width: 964,
    height: 780,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-02.webp',
    names: '«Feodosia Vataman»',
    width: 972,
    height: 926,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-03.webp',
    names: '«Cucos Violeta»',
    width: 966,
    height: 742,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-04.webp',
    names: '«Tatiana Gramatic»',
    width: 958,
    height: 756,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-05.webp',
    names: '«Elena Neghina» și «Diana Barbulat»',
    width: 964,
    height: 1032,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-06.webp',
    names: '«ion grossu» și «Vica Bobutac»',
    width: 968,
    height: 1034,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-07.webp',
    names: '«Lidia Leahu» și «Lia Botnari»',
    width: 958,
    height: 1084,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-08.webp',
    names: '«Silvia Capatina»',
    width: 958,
    height: 900,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-09.webp',
    names: '«Marcela Stratan» și «Ana Redea»',
    width: 944,
    height: 1048,
  },
  {
    src: '/images/optimized/reviews/ro/review-ro-10.webp',
    names: '«Nadejda Inculet» și «Tiana Ti»',
    width: 954,
    height: 1076,
  },
];

export const reviews: Record<Locale, Review[]> = { ru, ro };
