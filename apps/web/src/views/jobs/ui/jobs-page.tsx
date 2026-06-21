import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { JobsUrlInputWidget } from '@/widgets/jobs-url-input/ui/jobs-url-input';
import { JobsList } from '@/widgets/jobs-list/ui/jobs-list';
import { JobsStackChart } from '@/widgets/jobs-stack-chart/ui/jobs-stack-chart';
import { JobDetailsDrawer } from '@/widgets/job-details-drawer/ui/job-details-drawer';
import { JobsFilterBar } from '@/features/jobs/filter-jobs/ui/jobs-filter-bar';
import s from './jobs-page.module.scss';

export async function JobsPage() {
  const [t, messages] = await Promise.all([getTranslations('jobsPage'), getMessages()]);

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.pageHeader}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>

        <NextIntlClientProvider messages={{ jobsPage: messages.jobsPage }}>
          <JobsUrlInputWidget />
          <JobsFilterBar />
          <div className={s.content}>
            <div className={s.list}>
              <JobsList />
            </div>
            <aside className={s.sidebar}>
              <JobsStackChart />
            </aside>
          </div>
          <JobDetailsDrawer />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
