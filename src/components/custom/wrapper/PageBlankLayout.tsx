import { typography } from '@/utils/other/text';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageBlankLayout({ children, title }: Props) {
  return (
    <main className='bg-background text-foreground antialiased'>
      <div className='animate-in fade-in container grid min-h-screen place-content-center text-center duration-700'>
        <h1 className={typography.h1}>{title}</h1>
        {children}
      </div>
    </main>
  );
}
