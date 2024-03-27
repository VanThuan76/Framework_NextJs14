import { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { defaultLocale, locales } from '@/navigation';

export function getLocale(req: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  // biome-ignore lint/complexity/noForEach: <explanation>
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages() ?? [];
  return matchLocale(languages, locales, defaultLocale);
}
