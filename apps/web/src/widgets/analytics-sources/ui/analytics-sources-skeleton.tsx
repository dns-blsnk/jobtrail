import s from './analytics-sources.module.scss';

export function AnalyticsSourcesSkeleton() {
  return (
    <section className={s.root}>
      <div className={s.skeletonTitle} />
      <div className={s.skeletonDonut} />
    </section>
  );
}
