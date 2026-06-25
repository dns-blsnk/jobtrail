'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAnalyticsDashboard } from '@/entities/analytics/model/use-analytics';
import { EmptyState } from '@/shared/ui/empty-state/empty-state';
import { AnalyticsSummaryBar } from '@/widgets/analytics-summary-bar/ui/analytics-summary-bar';
import { AnalyticsFunnel } from '@/widgets/analytics-funnel/ui/analytics-funnel';
import { AnalyticsSkillsGap } from '@/widgets/analytics-skills-gap/ui/analytics-skills-gap';
import { AnalyticsSalary } from '@/widgets/analytics-salary/ui/analytics-salary';
import { AnalyticsActivity } from '@/widgets/analytics-activity/ui/analytics-activity';
import { AnalyticsSources } from '@/widgets/analytics-sources/ui/analytics-sources';
import { AnalyticsSkeleton } from './analytics-skeleton';
import s from './analytics-page.module.scss';

export function AnalyticsContent() {
  const t = useTranslations('analyticsPage');
  const { data, isLoading } = useAnalyticsDashboard();

  if (isLoading) return <AnalyticsSkeleton />;

  if (!data || data.totalJobs < 3) {
    return (
      <EmptyState
        title={t('empty.title')}
        hint={t('empty.hint')}
        action={
          <Link href="/jobs" className={s.emptyCta}>
            {t('empty.cta')}
          </Link>
        }
      />
    );
  }

  return (
    <div className={s.grid}>
      <AnalyticsSummaryBar data={data} />
      <AnalyticsFunnel data={data.funnel} />
      <AnalyticsSkillsGap data={data} />
      <div className={s.row}>
        <AnalyticsSalary data={data.salary} />
        <AnalyticsActivity data={data.activity} />
      </div>
      <AnalyticsSources data={data.sources} />
    </div>
  );
}
