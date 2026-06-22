import { clsx } from 'clsx';
import s from './features-deep.module.scss';

const JOB_CARDS = [
  {
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    score: 94,
    skills: ['React', 'TypeScript'],
  },
  { company: 'Vercel', role: 'React Developer', score: 87, skills: ['Next.js', 'TypeScript'] },
  { company: 'Linear', role: 'Frontend Engineer', score: 61, skills: ['React', 'GraphQL'] },
  { company: 'Notion', role: 'Full-Stack Engineer', score: 43, skills: ['Node.js', 'PostgreSQL'] },
];

const KANBAN_COLS = [
  { label: 'Saved', cards: [48, 40, 44], accent: false },
  { label: 'Applied', cards: [40, 48], accent: false },
  { label: 'Interview', cards: [44, 40], accent: true },
  { label: 'Offer', cards: [48], accent: true },
];

export function FeaturesDeep() {
  return (
    <div className={s.root}>
      {/* Strip 1 — Resume */}
      <div className={clsx(s.strip, s.stripBgBase)}>
        <div className={s.stripInner}>
          <div className={s.content}>
            <p className={s.label}>Resume</p>
            <h2 className={s.title}>One resume, rewritten for each role</h2>
            <p className={s.body}>
              Your base resume lives in Jobtrail. When you find a job, we highlight exactly which
              sections to update and which keywords to add for that specific posting.
            </p>
          </div>
          <div>
            <div className={s.resumeMock} aria-hidden="true">
              <div className={s.mockName} />
              <div className={s.mockSubLine} />
              <div className={s.mockSection}>
                <span className={s.mockSectionTitle}>Summary</span>
                <div className={s.mockLine} />
                <div className={s.mockLineSm} />
              </div>
              <div className={clsx(s.mockSection, s.mockSectionHighlight)}>
                <span className={clsx(s.mockSectionTitle, s.mockSectionTitleHighlight)}>
                  Experience — update this
                </span>
                <div className={s.mockLine} />
                <div className={s.mockLineSm} />
                <div className={s.mockLine} style={{ width: '70%' }} />
              </div>
              <div className={s.mockSection}>
                <span className={s.mockSectionTitle}>Skills</span>
                <div className={s.mockLine} />
              </div>
              <div className={s.mockKeywords}>
                <span className={s.mockKeywordsLabel}>3 keywords to add:</span>
                {['Docker', 'Terraform', 'gRPC'].map((kw) => (
                  <span key={kw} className={s.mockChip}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strip 2 — Matching */}
      <div className={clsx(s.strip, s.stripBgSurface)}>
        <div className={s.stripInner}>
          <div className={clsx(s.content, s.contentReverse)}>
            <p className={s.label}>Matching</p>
            <h2 className={s.title}>See your score before you apply</h2>
            <p className={s.body}>
              Every saved job shows a match percentage based on your profile stack. The score breaks
              down by skill category — so you know whether it&apos;s a frontend gap, a DevOps gap,
              or just one missing keyword.
            </p>
          </div>
          <div className={s.visualReverse}>
            <div className={s.jobCards} aria-hidden="true">
              {JOB_CARDS.map((job) => (
                <div key={job.company} className={s.jobCard}>
                  <div className={s.jobCardTop}>
                    <span className={s.jobCompany}>{job.company}</span>
                    <span className={clsx(s.jobScore, job.score < 70 && s.jobScoreLow)}>
                      {job.score}%
                    </span>
                  </div>
                  <p className={s.jobRole}>{job.role}</p>
                  <div className={s.jobBar}>
                    <div
                      className={clsx(s.jobBarFill, job.score < 70 && s.jobBarFillLow)}
                      style={{ width: `${job.score}%` }}
                    />
                  </div>
                  <div className={s.jobSkills}>
                    {job.skills.map((skill) => (
                      <span key={skill} className={s.jobSkillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strip 3 — Tracking */}
      <div className={clsx(s.strip, s.stripBgBase)}>
        <div className={s.stripInner}>
          <div className={s.content}>
            <p className={s.label}>Tracking</p>
            <h2 className={s.title}>Your whole search, not just the applications</h2>
            <p className={s.body}>
              Set deadlines, add recruiter notes, mark interviews. See your response rate update in
              real time. Know when a company is worth following up.
            </p>
          </div>
          <div>
            <div className={s.kanban} aria-hidden="true">
              {KANBAN_COLS.map((col) => (
                <div key={col.label} className={s.kanbanCol}>
                  <div className={clsx(s.kanbanHeader, col.accent && s.kanbanHeaderAccent)}>
                    {col.label}
                  </div>
                  {col.cards.map((height, i) => (
                    <div key={i} className={s.kanbanCard} style={{ height: `${height}px` }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
