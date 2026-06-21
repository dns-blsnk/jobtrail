'use client';

import { useTranslations } from 'next-intl';
import { useUpdateJob } from '@/entities/job/model/use-jobs';
import type { JobStatus } from '@/entities/job/model/types';
import s from './job-status-select.module.scss';

const STATUS_ORDER: JobStatus[] = [
  'SAVED',
  'APPLYING',
  'APPLIED',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'ARCHIVED',
];

interface JobStatusSelectProps {
  jobId: string;
  currentStatus: JobStatus;
}

export function JobStatusSelect({ jobId, currentStatus }: JobStatusSelectProps) {
  const t = useTranslations('jobsPage.status');
  const { mutate, isPending } = useUpdateJob();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as JobStatus;
    if (newStatus === currentStatus) return;
    mutate({ id: jobId, payload: { status: newStatus } });
  };

  return (
    <select
      className={s.select}
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      aria-label="Job status"
      data-status={currentStatus}
    >
      {STATUS_ORDER.map((status) => (
        <option key={status} value={status}>
          {t(status)}
        </option>
      ))}
    </select>
  );
}
