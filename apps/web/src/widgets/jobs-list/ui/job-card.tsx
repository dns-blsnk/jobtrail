'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDeleteJob } from '@/entities/job/model/use-jobs';
import { useJobStore } from '@/entities/job/model/job-store';
import { JobStatusSelect } from '@/features/jobs/update-job-status/ui/job-status-select';
import type { Job } from '@/entities/job/model/types';
import s from './job-card.module.scss';

const MAX_VISIBLE_TECH = 5;

function MatchBadge({ score }: { score: number | null }) {
  const t = useTranslations('jobsPage.card');
  if (score === null) {
    return (
      <span className={s.matchBadge} data-variant="none">
        {t('noMatch')}
      </span>
    );
  }
  const variant = score >= 80 ? 'high' : score >= 50 ? 'mid' : 'low';
  return (
    <span className={s.matchBadge} data-variant={variant}>
      {t('matchScore')} {score}%
    </span>
  );
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const t = useTranslations('jobsPage');
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();
  const selectJob = useJobStore((s) => s.selectJob);
  const [showAllTech, setShowAllTech] = useState(false);

  const visibleTech = showAllTech ? job.techStack : job.techStack.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = job.techStack.length - MAX_VISIBLE_TECH;

  const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteJob(job.id);
  };

  return (
    <article
      className={s.card}
      onClick={() => selectJob(job.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && selectJob(job.id)}
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className={s.header}>
        <MatchBadge score={job.matchScore} />
        <div className={s.headerActions} onClick={(e) => e.stopPropagation()}>
          <JobStatusSelect jobId={job.id} currentStatus={job.status} />
          <button
            type="button"
            className={s.deleteBtn}
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={t('card.deleteJob')}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>

      <div className={s.body}>
        <h3 className={s.title}>{job.title}</h3>
        <p className={s.meta}>
          <span className={s.company}>{job.company}</span>
          {job.location && <span className={s.separator}>·</span>}
          {job.location && <span className={s.location}>{job.location}</span>}
          {job.remote && <span className={s.remotePill}>Remote</span>}
          {salary && <span className={s.separator}>·</span>}
          {salary && <span className={s.salary}>{salary}</span>}
        </p>
      </div>

      {job.techStack.length > 0 && (
        <div className={s.techStack}>
          {visibleTech.map((tech) => (
            <span key={tech} className={s.techPill}>
              {tech}
            </span>
          ))}
          {!showAllTech && hiddenCount > 0 && (
            <button
              type="button"
              className={s.moreTech}
              onClick={(e) => {
                e.stopPropagation();
                setShowAllTech(true);
              }}
            >
              {t('card.moreTech', { n: hiddenCount })}
            </button>
          )}
        </div>
      )}

      <div className={s.footer}>
        {job.deadline && (
          <span className={s.footerItem}>
            <span className={s.footerIcon}>⏰</span>
            {t('card.deadline')}: {formatDate(job.deadline)}
          </span>
        )}
        <span className={s.footerItem}>
          <span className={s.footerIcon}>📅</span>
          {t('card.saved')}: {formatDate(job.createdAt)}
        </span>
      </div>
    </article>
  );
}

function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null,
): string | null {
  if (!min && !max) return null;
  const c = currency ?? 'USD';
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)}–${fmt(max)} ${c}`;
  if (min) return `From ${fmt(min)} ${c}`;
  if (max) return `Up to ${fmt(max)} ${c}`;
  return null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
