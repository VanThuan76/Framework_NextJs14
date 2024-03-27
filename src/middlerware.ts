import { NextFetchEvent, type NextRequest } from 'next/server';
import { setCookie } from 'cookies-next';
import nextIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/navigation';
import { getLocale } from '@/utils/auth/mw';

let intlMiddleware: (request: NextRequest) => Promise<Response | undefined>;
intlMiddleware = (request: NextRequest) =>
  Promise.resolve(
    nextIntlMiddleware({
      localePrefix: 'as-needed',
      defaultLocale,
      locales,
    })(request),
  );
export default async function middleware(request: NextRequest, event_: NextFetchEvent) {
  const locale = getLocale(request);
  const { nextUrl: geo } = request;
  // @ts-expect-error || @ts-ignore
  const country = geo?.country || 'US';
  if (country === 'RU') return new Response('', { status: 403 });
  if (locale) setCookie('NEXT_LOCALE', locale);
}
