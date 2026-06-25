'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useJobs } from '@/entities/job/model/use-jobs';
import { useJobStore } from '@/entities/job/model/job-store';
import { JobCard } from '@/widgets/jobs-list/ui/job-card';
import { JobCardSkeleton } from '@/widgets/jobs-list/ui/job-card-skeleton';
import s from './jobs-list.module.scss';

export function JobsList() {
  const t = useTranslations('jobsPage');
  const filters = useJobStore((s) => s.filters);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useJobs(filters);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersect, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  if (isLoading) return <JobCardSkeleton count={3} />;

  const allJobs = data?.pages.flatMap((p) => p.data) ?? [];

  if (!allJobs.length) {
    return (
      <div className={s.empty}>
        <p className={s.emptyTitle}>{t('empty')}</p>
        <p className={s.emptyHint}>{t('emptyHint')}</p>
      </div>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.list}>
        {allJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {isFetchingNextPage && <JobCardSkeleton count={1} />}
      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  );
}
