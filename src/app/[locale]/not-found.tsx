/**
 * This file is used to render a 404 page.
 * This file serves as Layout for 404 page.
 * Visit <NotFoundContent /> to check more.
 */

'use client';

import { defaultLocale } from '@/navigation';
import { getCookie } from 'cookies-next';
import pick from 'lodash/pick';
import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';

import en_US from '@/resource/lang/en-US.json';
import vi_VN from '@/resource/lang/vi-VN.json';
import NotFoundContent from '@/components/custom/NotFoundContent';

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localeMessages: Record<string, AbstractIntlMessages> = {
  'en-US': en_US,
  'vi-VN': vi_VN,
};

export default function NotFoundPage() {
  const locale = getCookie('NEXT_LOCALE')?.toString() || defaultLocale;
  // console.log("locale from cookie", locale); // for debug purposes

  // Use the mapping object to select messages
  // This approach also works without --turbo
  const messages: AbstractIntlMessages | any = localeMessages[locale] || localeMessages['en-US'];

  // When not using next dev --turbo, we can use this:
  /*  let messages: AbstractIntlMessages = {};
  try {
    messages = require(`~/data/i18n/${locale}.json`);
  } catch (error) {
    // Assign fallback set of messages when error
    messages = require("~/data/i18n/en-us.json");
    // console.error(error); // browser console
  } */

  return (
    <NextIntlClientProvider
      locale={locale}
      // Provide only needed messages for NotFound
      messages={pick(messages, 'pages.not-found')}
    >
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}

/**
 * Learn more and resources
 * ========================
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 * @see https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files
 * @see https://github.com/amannn/next-intl/issues?q=turbo
 * @see https://github.com/amannn/next-intl/issues/718
 * @see https://github.com/amannn/next-intl/pull/641
 * @see https://github.com/vercel/turbo/issues/2372
 */
