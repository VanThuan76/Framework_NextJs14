import type { PropsWithChildren } from "react";
import type { LocaleLayoutParams, WithChildren } from '@/types';

type LocaleLayoutProperties = PropsWithChildren<LocaleLayoutParams>;
export default async function LocaleLayout({ children, params: { locale } }: WithChildren<LocaleLayoutProperties>) {}
