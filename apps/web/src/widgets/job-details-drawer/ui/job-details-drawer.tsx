'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useJobStore } from '@/entities/job/model/job-store';
import { useJobs, useUpdateJob } from '@/entities/job/model/use-jobs';
import { JobStatusSelect } from '@/features/jobs/update-job-status/ui/job-status-select';
import type { Job } from '@/entities/job/model/types';
import s from './job-details-drawer.module.scss';

function useSelectedJob(selectedId: string | null): Job | null {
  const filters = useJobStore((st) => st.filters);
  const { data } = useJobs(filters);
  const allJobs = data?.pages.flatMap((p) => p.data) ?? [];
  return allJobs.find((j) => j.id === selectedId) ?? null;
}

export function JobDetailsDrawer() {
  const t = useTranslations('jobsPage');
  const selectedJobId = useJobStore((s) => s.selectedJobId);
  const selectJob = useJobStore((s) => s.selectJob);
  const job = useSelectedJob(selectedJobId);
  const { mutate: updateJob } = useUpdateJob();
  const [notes, setNotes] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (job) setNotes(job.notes ?? '');
  }, [job?.id]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (job) updateJob({ id: job.id, payload: { notes: value } });
    }, 1000);
  };

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  const isOpen = !!selectedJobId;

  return (
    <>
      {isOpen && <div className={s.backdrop} onClick={() => selectJob(null)} aria-hidden="true" />}
      <aside className={s.drawer} data-open={isOpen} aria-label="Job details" aria-hidden={!isOpen}>
        {job && (
          <div className={s.content}>
            <div className={s.drawerHeader}>
              <div className={s.drawerTitleGroup}>
                <h2 className={s.drawerTitle}>{job.title}</h2>
                <p className={s.drawerCompany}>{job.company}</p>
              </div>
              <button
                type="button"
                className={s.closeBtn}
                onClick={() => selectJob(null)}
                aria-label={t('drawer.close')}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={s.meta}>
              {job.location && <span className={s.metaItem}>{job.location}</span>}
              {job.workFormat && (
                <span className={s.metaItem}>
                  {t(`drawer.${job.workFormat.toLowerCase() as 'remote' | 'hybrid' | 'onsite'}`)}
                </span>
              )}
              {(job.salaryMin ?? job.salaryMax) && (
                <span className={s.metaItem}>
                  {formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                </span>
              )}
            </div>

            <div className={s.statusRow}>
              <JobStatusSelect jobId={job.id} currentStatus={job.status} />
              {job.sourceUrl && (
                <a
                  className={s.originalLink}
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('drawer.viewOriginal')} ↗
                </a>
              )}
            </div>

            {job.techStack.length > 0 && (
              <div className={s.techSection}>
                <div className={s.techPills}>
                  {job.techStack.map((tech) => (
                    <span key={tech} className={s.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={s.notesSection}>
              <label className={s.sectionLabel} htmlFor="job-notes">
                {t('drawer.notes')}
              </label>
              <textarea
                id="job-notes"
                className={s.notesTextarea}
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder={t('drawer.notesPlaceholder')}
                rows={4}
              />
            </div>

            {job.description && (
              <section className={s.section}>
                <h3 className={s.sectionLabel}>{t('drawer.description')}</h3>
                <div className={s.sectionBody}>{job.description}</div>
              </section>
            )}

            {job.requirements && (
              <section className={s.section}>
                <h3 className={s.sectionLabel}>{t('drawer.requirements')}</h3>
                <div className={s.sectionBody}>{job.requirements}</div>
              </section>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

function formatSalaryRange(
  min: number | null,
  max: number | null,
  currency: string | null,
): string {
  const c = currency ?? 'USD';
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)}–${fmt(max)} ${c}`;
  if (min) return `From ${fmt(min)} ${c}`;
  if (max) return `Up to ${fmt(max)} ${c}`;
  return '';
}
