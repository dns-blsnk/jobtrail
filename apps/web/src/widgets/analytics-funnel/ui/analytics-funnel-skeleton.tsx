import { BarListSkeleton } from '@/shared/ui/bar-list/bar-list';
import s from './analytics-funnel.module.scss';

export function AnalyticsFunnelSkeleton() {
  return (
    <section className={s.root}>
      <div className={s.skeletonTitle} />
      <BarListSkeleton rows={5} />
    </section>
  );
}
