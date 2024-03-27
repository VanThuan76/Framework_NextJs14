import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

// Import all the locale JSON files
import en_US from '@/resource/lang/en-US.json';
import vi_VN from '@/resource/lang/vi-VN.json';

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localeMessages = {
  'en-US': en_US,
  'vi-VN': vi_VN,
};

// Exporting default function that asynchronously receives
// the locale object and returns the configuration object
export default getRequestConfig(({ locale }) => {
  // Load messages for the current locale
  //@ts-ignore
  const primaryMessages: AbstractIntlMessages = localeMessages[locale] || localeMessages['en-US'];

  // Load messages for the fallback locale
  const fallbackMessages: AbstractIntlMessages = localeMessages['en-US'];

  // Merge primary locale messages with fallback locale messages
  const messages = deepmerge(fallbackMessages, primaryMessages);

  // When using Turbopack we enable HMR for locale
  // This approach also works fine without --turbo
  return { messages };
});

// When not using next dev --turbo, we can simplify imports:
// export default getRequestConfig(async ({ locale }) => ({
//   messages: (await import(`./data/i18n/${locale}.json`)).default,
// }));

/**
 * Learn more and resources
 * ========================
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 * @see https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 * @see https://github.com/amannn/next-intl/issues?q=turbo
 * @see https://github.com/amannn/next-intl/issues/718
 * @see https://github.com/amannn/next-intl/pull/641
 * @see https://github.com/vercel/turbo/issues/2372
 */
