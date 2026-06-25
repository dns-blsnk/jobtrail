import { AnalyticsSummaryBarSkeleton } from '@/widgets/analytics-summary-bar/ui/analytics-summary-bar-skeleton';
import { AnalyticsFunnelSkeleton } from '@/widgets/analytics-funnel/ui/analytics-funnel-skeleton';
import { AnalyticsSkillsGapSkeleton } from '@/widgets/analytics-skills-gap/ui/analytics-skills-gap-skeleton';
import { AnalyticsSalarySkeleton } from '@/widgets/analytics-salary/ui/analytics-salary-skeleton';
import { AnalyticsActivitySkeleton } from '@/widgets/analytics-activity/ui/analytics-activity-skeleton';
import { AnalyticsSourcesSkeleton } from '@/widgets/analytics-sources/ui/analytics-sources-skeleton';
import s from './analytics-page.module.scss';

export function AnalyticsSkeleton() {
  return (
    <div className={s.grid}>
      <AnalyticsSummaryBarSkeleton />
      <AnalyticsFunnelSkeleton />
      <AnalyticsSkillsGapSkeleton />
      <div className={s.row}>
        <AnalyticsSalarySkeleton />
        <AnalyticsActivitySkeleton />
      </div>
      <AnalyticsSourcesSkeleton />
    </div>
  );
}
