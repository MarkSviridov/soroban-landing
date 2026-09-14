/**
 * Клиентская логика формы бесплатного пробного урока.
 *
 * Реальная отправка: POST JSON на Google Apps Script Web App (LEADS_WEBHOOK_URL),
 * который дописывает строку в Google Sheets.
 *
 * - URL берётся из src/consts.ts и в интерфейсе не показывается.
 * - Заявки НЕ сохраняются в localStorage; персональные данные НЕ логируются.
 * - Состояния: отправка → успех → ошибка. После успеха форма очищается.
 */

import { site } from '@/content/site';
import type { Locale } from '@/content/site';
import { AGE, LEADS_WEBHOOK_URL } from '@/consts';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

const YM_COUNTER_ID = 112327725;

/** Счётчик успешных отправок в рамках текущей загрузки страницы — защита от повторной цели. */
let leadGoalSent = false;

// Локаль страницы — из <html lang> (её задаёт BaseLayout).
const lang: Locale = document.documentElement.lang === 'ro' ? 'ro' : 'ru';
const f = site[lang].form;

const form = document.getElementById('trial-form') as HTMLFormElement | null;
const submitBtn = document.getElementById('trial-submit') as HTMLButtonElement | null;
const submitLabel = form?.querySelector<HTMLElement>('[data-submit-label]') ?? null;
const statusEl = document.getElementById('form-status');
const successPanel = document.getElementById('form-success');
const errorPanel = document.getElementById('form-error');
const retryBtn = document.getElementById('form-retry');

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Поля, у которых есть блок ошибки и слушатели сброса. */
const FIELD_NAMES = [
  'parentName',
  'phone',
  'childName',
  'childAge',
  'district',
  'language',
  'format',
  'consent',
] as const;

function control(name: string): FormControl | null {
  return (form?.elements.namedItem(name) as FormControl | null) ?? null;
}

function setError(el: FormControl, message: string | null): void {
  const errEl = document.getElementById(`${el.id}-error`);
  if (message) {
    el.setAttribute('aria-invalid', 'true');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.remove('hidden');
    }
  } else {
    el.removeAttribute('aria-invalid');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
  }
}

function clearAllErrors(): void {
  for (const name of FIELD_NAMES) {
    const el = control(name);
    if (el) setError(el, null);
  }
}

function validate(): boolean {
  const invalid: FormControl[] = [];

  const check = (el: FormControl | null, ok: boolean, message: string): void => {
    if (!el) return;
    setError(el, ok ? null : message);
    if (!ok) invalid.push(el);
  };

  const parentName = control('parentName');
  check(parentName, (parentName?.value.trim().length ?? 0) >= 2, f.errors.parentName);

  const phone = control('phone');
  const phoneDigits = (phone?.value ?? '').replace(/\D/g, '');
  check(phone, phoneDigits.length >= 6 && phoneDigits.length <= 15, f.errors.phone);

  const childName = control('childName');
  check(childName, (childName?.value.trim().length ?? 0) >= 2, f.errors.childName);

  const childAge = control('childAge');
  const age = Number(childAge?.value);
  check(childAge, Number.isInteger(age) && age >= AGE.min && age <= AGE.max, f.errors.childAge);

  const district = control('district');
  check(district, !!district?.value, f.errors.district);

  const language = control('language');
  check(language, !!language?.value, f.errors.language);

  const format = control('format');
  check(format, !!format?.value, f.errors.format);

  const consent = control('consent') as HTMLInputElement | null;
  check(consent, !!consent?.checked, f.errors.consent);

  if (invalid.length > 0) {
    invalid[0].focus();
    return false;
  }
  return true;
}

/**
 * Собирает полезную нагрузку. Пустые поля не включаются.
 * Обязательные по ТЗ: parentName, phone, childName, age, format, comment.
 * district / language добавляются, если заполнены (полезны школе, лишние ключи
 * Google-скрипт игнорирует).
 */
function buildPayload(): Record<string, string> {
  const raw: Record<string, string> = {
    parentName: control('parentName')?.value.trim() ?? '',
    phone: control('phone')?.value.trim() ?? '',
    childName: control('childName')?.value.trim() ?? '',
    age: control('childAge')?.value.trim() ?? '',
    format: control('format')?.value ?? '',
    comment: control('comment')?.value.trim() ?? '',
    district: control('district')?.value ?? '',
    language: control('language')?.value ?? '',
  };

  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value !== '') payload[key] = value;
  }
  return payload;
}

/**
 * Отправка в Google Apps Script.
 * - `text/plain` — «простой» запрос без CORS-preflight (Apps Script preflight не обрабатывает).
 * - `redirect: 'manual'` — Apps Script отвечает 302 на script.googleusercontent.com;
 *   к моменту 302 doPost уже отработал и строка записана. Редирект не разворачиваем,
 *   чтобы не зависеть от CORS на промежуточном хосте.
 *   Успех = получили ответ (opaqueredirect / 2xx). Ошибка = запрос не дошёл или явный не-2xx.
 */
async function sendLead(payload: Record<string, string>): Promise<void> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(LEADS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'manual',
      signal: controller.signal,
    });
    if (response.type !== 'opaqueredirect' && !response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } finally {
    window.clearTimeout(timer);
  }
}

if (form && submitBtn && submitLabel) {
  // Сброс ошибки поля при исправлении.
  for (const name of FIELD_NAMES) {
    const el = control(name);
    el?.addEventListener('input', () => setError(el, null));
    el?.addEventListener('change', () => setError(el, null));
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    // Honeypot: скрытое поле, которое заполняют боты.
    const honeypot = control('company') as HTMLInputElement | null;
    if (honeypot && honeypot.value.trim() !== '') return;

    if (!validate()) {
      if (statusEl) statusEl.textContent = f.validationError;
      return;
    }

    // Состояние: отправка.
    submitBtn.disabled = true;
    submitLabel.textContent = f.submitting;
    if (statusEl) statusEl.textContent = f.submitting;
    if (errorPanel) errorPanel.hidden = true;

    try {
      await sendLead(buildPayload());

      // Состояние: успех.
      form.reset();
      clearAllErrors();
      form.hidden = true;
      if (successPanel) {
        successPanel.hidden = false;
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus();
        successPanel.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      if (statusEl) statusEl.textContent = `${f.successTitle} ${f.successText}`;

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: 'lead_submit', form: 'trial' });

      // Meta Pixel: событие Lead — один раз, только после подтверждённой успешной
      // отправки (fbq грузится в BaseLayout; при блокировке пикселя просто пропускаем).
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      // Yandex.Metrica: цель lead — тоже только здесь, после подтверждённого успеха.
      // Технических персональных данных не передаём — только язык, путь и тип формы.
      if (!leadGoalSent && typeof window.ym === 'function') {
        leadGoalSent = true;
        window.ym(YM_COUNTER_ID, 'reachGoal', 'lead', {
          language: lang,
          page: window.location.pathname,
          form_type: 'landing_form',
        });
        if (import.meta.env.DEV) {
          console.log('[YM] reachGoal("lead") sent');
        }
      }
    } catch {
      // Состояние: ошибка (без вывода персональных данных в консоль).
      console.error(f.errorTitle);
      submitBtn.disabled = false;
      submitLabel.textContent = f.submit;
      if (errorPanel) errorPanel.hidden = false;
      if (statusEl) statusEl.textContent = `${f.errorTitle}. ${f.errorText}`;
    }
  });

  retryBtn?.addEventListener('click', () => {
    if (errorPanel) errorPanel.hidden = true;
    control('parentName')?.focus();
  });
}

export {};
