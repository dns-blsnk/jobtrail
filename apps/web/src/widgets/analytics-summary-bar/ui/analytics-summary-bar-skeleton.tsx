import s from './analytics-summary-bar.module.scss';

export function AnalyticsSummaryBarSkeleton() {
  return (
    <div className={s.root}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={s.card}>
          <div className={s.skeletonValue} />
          <div className={s.skeletonLabel} />
        </div>
      ))}
    </div>
  );
}
