import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const SUPPORTED_LOCALES = ['en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';
  const locale: Locale = isSupportedLocale(raw) ? raw : 'en';

  const messages = (await import(`@/fsd-app/intl/messages/${locale}`)).default as Record<string, unknown>;

  return { locale, messages };
});
