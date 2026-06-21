'use client';

import { useTranslations } from 'next-intl';
import { useJobStore } from '@/entities/job/model/job-store';
import type { JobStatus } from '@/entities/job/model/types';
import s from './jobs-filter-bar.module.scss';

const STATUS_TABS: Array<{ key: JobStatus | 'ALL'; label: string }> = [
  { key: 'ALL', label: 'all' },
  { key: 'SAVED', label: 'SAVED' },
  { key: 'APPLIED', label: 'APPLIED' },
  { key: 'INTERVIEW', label: 'INTERVIEW' },
  { key: 'OFFER', label: 'OFFER' },
];

export function JobsFilterBar() {
  const t = useTranslations('jobsPage');
  const { filters, setStatus, setRemote, clearFilters } = useJobStore();

  const hasActiveFilters = filters.status || filters.remote || (filters.stack?.length ?? 0) > 0;

  return (
    <div className={s.root}>
      <div className={s.tabs}>
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={s.tab}
            data-active={key === 'ALL' ? !filters.status : filters.status === key}
            onClick={() => setStatus(key === 'ALL' ? undefined : (key as JobStatus))}
          >
            {key === 'ALL' ? t('filters.all') : t(`status.${label}`)}
          </button>
        ))}
      </div>

      <div className={s.chips}>
        <button
          type="button"
          className={s.chip}
          data-active={filters.remote === true}
          onClick={() => setRemote(filters.remote === true ? undefined : true)}
        >
          {t('filters.remoteOnly')}
        </button>

        {hasActiveFilters && (
          <button type="button" className={s.clearBtn} onClick={clearFilters}>
            {t('filters.clearAll')}
          </button>
        )}
      </div>
    </div>
  );
}
