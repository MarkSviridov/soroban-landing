/**
 * Отправка заявки с онлайн-лендинга.
 *
 * Тот же приёмник, что у основной формы (Google Apps Script), но с меткой
 * источника и захватом рекламных параметров — чтобы заявки из заграничных
 * кампаний были отличимы и считались сквозной воронкой.
 */

import { LEADS_WEBHOOK_URL } from '@/consts';
import { online, type OnlineLocale } from '@/content/online';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

const langToLocale: Record<string, OnlineLocale> = { ro: 'ro', ru: 'ru', en: 'en' };
const locale: OnlineLocale = langToLocale[document.documentElement.lang] ?? 'ro';
const f = online[locale].form;

const form = document.getElementById('online-form') as HTMLFormElement | null;
const submitBtn = document.getElementById('online-submit') as HTMLButtonElement | null;
const submitLabel = form?.querySelector<HTMLElement>('[data-submit-label]') ?? null;
const statusEl = document.getElementById('online-status');
const successEl = document.getElementById('online-success');

const control = (name: string) =>
  form?.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;

function setError(name: string, message: string | null): void {
  const el = control(name);
  if (!el) return;
  const errorEl = document.getElementById(`${el.id}-error`);
  el.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (!errorEl) return;
  errorEl.textContent = message ?? '';
  errorEl.hidden = !message;
  errorEl.classList.toggle('hidden', !message);
}

/** Телефон считаем валидным, если в нём не меньше 8 цифр: форматы стран разные. */
const digitCount = (value: string): number => (value.match(/\d/g) ?? []).length;

function validate(): boolean {
  let ok = true;
  const fail = (name: string, message: string) => {
    setError(name, message);
    ok = false;
  };

  const check = (name: string, valid: boolean, message: string) => {
    if (valid) setError(name, null);
    else fail(name, message);
  };

  check('parentName', (control('parentName')?.value.trim() ?? '') !== '', f.errors.parentName);
  check('contact', digitCount(control('contact')?.value ?? '') >= 8, f.errors.contact);

  const age = Number(control('childAge')?.value);
  check('childAge', Number.isInteger(age) && age >= 5 && age <= 12, f.errors.childAge);

  check('language', (control('language')?.value ?? '') !== '', f.errors.language);

  const consent = control('consent') as HTMLInputElement | null;
  const consentError = document.getElementById('o-consent-error');
  if (consentError) {
    const bad = !consent?.checked;
    consentError.textContent = bad ? f.errors.consent : '';
    consentError.hidden = !bad;
    consentError.classList.toggle('hidden', !bad);
    if (bad) ok = false;
  }

  return ok;
}

/** Рекламные метки из URL и куки пикселя — для сквозной аналитики. */
function marketingParams(): Record<string, string> {
  const out: Record<string, string> = {};
  const params = new URLSearchParams(location.search);
  for (const key of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'gclid',
  ]) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  for (const key of ['_fbp', '_fbc']) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
    if (match) out[key] = decodeURIComponent(match[1]);
  }
  if (document.referrer) out.referrer = document.referrer;
  return out;
}

function payload(): Record<string, string> {
  const country = control('country')?.value.trim() ?? '';
  const comment = (control('comment') as unknown as HTMLTextAreaElement | null)?.value.trim() ?? '';

  // Ключи parentName / phone / age / district / format / language / comment —
  // те же, что у основной формы: под них в таблице уже есть колонки. Новые
  // поля (source, country, utm_*) Apps Script может молча отбросить, поэтому
  // онлайн-метку и страну дублируем в district и comment — их видно всегда.
  const raw: Record<string, string> = {
    parentName: control('parentName')?.value.trim() ?? '',
    phone: control('contact')?.value.trim() ?? '',
    age: control('childAge')?.value ?? '',
    district: 'Online',
    language: control('language')?.value ?? '',
    format: control('format')?.value ?? '',
    comment: [`[ONLINE${country ? ` · ${country}` : ''}]`, comment].filter(Boolean).join(' '),
    source: 'online_landing',
    locale,
    landingUrl: location.origin + location.pathname,
    country,
    ...marketingParams(),
  };

  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) if (value !== '') out[key] = value;
  return out;
}

/**
 * Apps Script отвечает редиректом на script.googleusercontent.com. К этому
 * моменту строка уже записана, поэтому редирект не разворачиваем: успех — это
 * любой ответ (opaqueredirect или 2xx).
 */
async function send(data: Record<string, string>): Promise<void> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(LEADS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
      redirect: 'manual',
      signal: controller.signal,
    });
    if (response.type !== 'opaqueredirect' && !response.ok)
      throw new Error(`HTTP ${response.status}`);
  } finally {
    window.clearTimeout(timer);
  }
}

if (form && submitBtn && submitLabel) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    // Ловушка для ботов: поле скрыто от людей, заполнено — значит бот.
    if ((control('website') as HTMLInputElement | null)?.value) return;

    if (!validate()) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = f.submitting;
    if (statusEl) statusEl.textContent = f.submitting;

    try {
      await send(payload());

      form.hidden = true;
      if (successEl) successEl.hidden = false;

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: 'lead_submit', form: 'online', locale });
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
    } catch {
      if (statusEl) statusEl.textContent = `${f.errorTitle}. ${f.errorText}`;
      submitLabel.textContent = f.retry;
    } finally {
      submitBtn.disabled = false;
      if (!form.hidden) submitLabel.textContent = submitLabel.textContent || f.submit;
    }
  });
}
