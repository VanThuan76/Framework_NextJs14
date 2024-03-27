/**
 * This module provides utilities for managing navigation and
 * locale information in Next.js application using next-intl.
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/navigation
 * @see https://github.com/meienberger/runtipi/blob/develop/src/shared/internationalization/locales.ts
 */

import { createSharedPathnamesNavigation } from "next-intl/navigation";
  // Default locale for the application.
  // export const defaultLocale = "en-us";
  export const defaultLocale = "en-US" as const;

  // Supported locales.
  export const locales = [
    "en-US",
    "vi-VN",
  ] as string[];

  // Labels for each supported locale, used for displaying human-readable names.
  export const labels: { [key: string]: string } = {
    "en-US": "English",
    "vi-VN": "Vietnamese",
  } as const;
  
  // Type representing valid locale strings.
  export type Locale = (typeof locales)[number];
  // Ensure every locale has a label.
  if (process.env.NODE_ENV === "development") {
    locales.forEach((locale) => {
      if (!labels[locale]) {
        console.warn(`No label found for locale: ${locale}`);
      }
    });
  }
  
  // Navigation utilities configured for the defined locales.
  export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales });
