import { BarListSkeleton } from '@/shared/ui/bar-list/bar-list';
import s from './analytics-skills-gap.module.scss';

export function AnalyticsSkillsGapSkeleton() {
  return (
    <section className={s.root}>
      <header className={s.header}>
        <div>
          <div className={s.skeletonTitle} />
          <div className={s.skeletonSubtitle} />
        </div>
      </header>
      <BarListSkeleton rows={5} />
    </section>
  );
}
