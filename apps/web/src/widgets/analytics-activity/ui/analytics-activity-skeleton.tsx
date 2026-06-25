import s from './analytics-activity.module.scss';

export function AnalyticsActivitySkeleton() {
  return (
    <section className={s.root}>
      <div className={s.skeletonTitle} />
      <div className={s.skeletonChart}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={s.skeletonBar}
            style={{ height: `${25 + ((i * 17) % 55)}%` }}
          />
        ))}
      </div>
    </section>
  );
}
