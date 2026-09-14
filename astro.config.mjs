// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Домен лендинга.
const SITE_URL = 'https://soroban.digital';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    icon(),
    sitemap({
      // RU — на корне (`/`), RO — под префиксом `/ro/`. Sitemap добавит
      // xhtml:link alternate между локалями.
      i18n: { defaultLocale: 'ru', locales: { ru: 'ru', ro: 'ro' } },
      // Политика конфиденциальности помечена noindex — в карту сайта не включаем.
      filter: (page) => !/\/privacy\/?$/.test(page),
    }),
  ],
  vite: {
    // Каст к any: @tailwindcss/vite тянет более новую версию Vite, чем Astro,
    // из-за чего расходятся типы плагина. На сборку и работу не влияет.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
