/**
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 */

import { Link } from '@/navigation';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Balancer } from 'react-wrap-balancer';
import { Button } from '@/components/common/button';
import PageBlankLayout from '@/components/custom/wrapper/PageBlankLayout';

export default function NotFoundContent() {
  const t = useTranslations('pages.not-found');
  return (
    <PageBlankLayout title={t('title')}>
      <Balancer as='p' className='text-muted-foreground mx-auto mt-4 !block leading-normal sm:text-lg sm:leading-7'>
        {t('description')}
      </Balancer>
      <Button className='mx-auto mt-6 w-fit gap-1' asChild>
        <Link href='/'>
          <ChevronLeft size={16} />
          <span>{t('go-home')}</span>
        </Link>
      </Button>
    </PageBlankLayout>
  );
}
