'use client';

import { useTranslations } from 'next-intl';
import { useJobs, useStackStats } from '@/entities/job/model/use-jobs';
import { useJobStore } from '@/entities/job/model/job-store';
import s from './jobs-stack-chart.module.scss';

const MIN_JOBS_FOR_CHART = 4;

export function JobsStackChart() {
  const t = useTranslations('jobsPage.stackChart');
  const filters = useJobStore((st) => st.filters);
  const { data: jobsData } = useJobs(filters);
  const { data: stats, isLoading } = useStackStats();

  const totalJobs = jobsData?.pages[0]?.total ?? 0;

  if (totalJobs < MIN_JOBS_FOR_CHART) {
    return (
      <div className={s.root}>
        <h3 className={s.title}>{t('title')}</h3>
        <p className={s.minJobsHint}>{t('minJobs')}</p>
      </div>
    );
  }

  const top = stats?.slice(0, 15) ?? [];
  const maxCount = top[0]?.count ?? 1;

  return (
    <div className={s.root}>
      <h3 className={s.title}>{t('title')}</h3>
      <p className={s.subtitle}>{t('jobsCount', { n: totalJobs })}</p>

      {isLoading ? (
        <div className={s.skeleton}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={s.skeletonBar} style={{ width: `${90 - i * 8}%` }} />
          ))}
        </div>
      ) : (
        <ul className={s.chart} role="list">
          {top.map(({ tech, count }) => (
            <li key={tech} className={s.row} title={t('tooltip', { n: count })}>
              <span className={s.label}>{tech}</span>
              <div className={s.barTrack}>
                <div
                  className={s.bar}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                  role="img"
                  aria-label={`${tech}: ${count} jobs`}
                />
              </div>
              <span className={s.count}>{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
