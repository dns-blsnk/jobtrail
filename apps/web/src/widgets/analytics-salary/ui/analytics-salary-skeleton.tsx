import s from './analytics-salary.module.scss';

export function AnalyticsSalarySkeleton() {
  return (
    <section className={s.root}>
      <div className={s.skeletonTitle} />
      <div className={s.skeletonBasedOn} />
      <div className={s.skeletonMedian} />
      <div className={s.skeletonRange} />
    </section>
  );
}
