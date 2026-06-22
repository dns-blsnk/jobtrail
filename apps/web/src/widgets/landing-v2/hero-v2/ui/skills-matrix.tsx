'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import s from './skills-matrix.module.scss';

const SKILLS = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'AWS'];
const COMPANIES = ['Stripe', 'Vercel', 'Linear', 'Notion'];
const MATRIX: Record<string, string[]> = {
  Stripe: ['React', 'TypeScript', 'GraphQL', 'Node.js'],
  Vercel: ['React', 'TypeScript', 'Node.js', 'Docker'],
  Linear: ['React', 'TypeScript', 'GraphQL', 'AWS'],
  Notion: ['React', 'TypeScript', 'Node.js', 'AWS'],
};
const USER_STACK = ['React', 'TypeScript', 'Node.js', 'GraphQL'];

export function SkillsMatrix() {
  const t = useTranslations('landingV2Page.matrix');
  const [activeCompanyIdx, setActiveCompanyIdx] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [scanDone, setScanDone] = useState(false);
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matrixRef.current) {
      const w = matrixRef.current.offsetWidth - 96;
      matrixRef.current.style.setProperty('--sweep-dist', `${w}px`);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCompanyIdx((prev) => (prev + 1) % COMPANIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeCompany = COMPANIES[activeCompanyIdx];
  const required = MATRIX[activeCompany];
  const matched = required.filter((skill) => USER_STACK.includes(skill)).length;
  const score = Math.round((matched / required.length) * 100);

  return (
    <div className={s.root}>
      {/* Score bar */}
      <div className={s.scoreBar}>
        <span className={s.scoreCompany}>{activeCompany}</span>
        <div className={s.scoreTrack}>
          <div className={s.scoreFill} style={{ width: `${score}%` }} />
        </div>
        <span className={s.scoreLabel}>
          {matched} {t('of')} {required.length} {t('matched')}
        </span>
      </div>

      {/* Matrix */}
      <div ref={matrixRef} className={s.matrix} role="grid" aria-label="Skills match matrix">
        {/* Corner cell */}
        <div className={s.cornerCell} role="gridcell" />

        {/* Company headers */}
        {COMPANIES.map((company, ci) => (
          <div
            key={company}
            role="columnheader"
            className={clsx(s.colHeader, ci === activeCompanyIdx && s.colHeaderActive)}
          >
            {company}
          </div>
        ))}

        {/* Skill rows */}
        {SKILLS.map((skill, si) => (
          <Fragment key={skill}>
            <div
              role="rowheader"
              className={clsx(s.rowLabel, hoveredSkill === skill && s.rowLabelHovered)}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill}
            </div>
            {COMPANIES.map((company, ci) => {
              const isMatch = MATRIX[company].includes(skill);
              const isActive = ci === activeCompanyIdx;
              const isHovered = hoveredSkill === skill;
              const delay = (si * COMPANIES.length + ci) * 40;
              return (
                <div
                  key={company}
                  role="gridcell"
                  aria-label={`${skill} × ${company}: ${isMatch ? 'matched' : 'not matched'}`}
                  className={clsx(
                    s.cell,
                    isMatch && s.cellMatch,
                    isMatch && isActive && s.cellMatchActive,
                    isHovered && isMatch && s.cellHovered,
                  )}
                  style={{ '--delay': `${delay}ms` } as React.CSSProperties}
                />
              );
            })}
          </Fragment>
        ))}

        {/* Scan line */}
        {!scanDone && <div className={s.scanLine} onAnimationEnd={() => setScanDone(true)} />}
      </div>

      <p className={s.matrixFooter}>{t('basedOn')}</p>
    </div>
  );
}
