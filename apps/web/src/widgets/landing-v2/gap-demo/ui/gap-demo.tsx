'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import s from './gap-demo.module.scss';

const ROLE_DICT: Record<string, string[]> = {
  'Frontend Engineer': ['React', 'TypeScript', 'CSS', 'Next.js', 'GraphQL'],
  'Backend Engineer': ['Node.js', 'PostgreSQL', 'Docker', 'REST API', 'Redis'],
  'Fullstack Engineer': ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
  'React Developer': ['React', 'TypeScript', 'Redux', 'CSS', 'Jest'],
  'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
  'Node.js Developer': ['Node.js', 'TypeScript', 'Express', 'REST API', 'MongoDB'],
  'TypeScript Developer': ['TypeScript', 'React', 'Node.js', 'Jest', 'ESLint'],
  'GraphQL Developer': ['GraphQL', 'React', 'TypeScript', 'Apollo', 'Node.js'],
};

const PRESETS: Record<string, string[]> = {
  Frontend: ['React', 'TypeScript', 'CSS', 'Next.js'],
  Backend: ['Node.js', 'PostgreSQL', 'Docker', 'REST API'],
  Fullstack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
};

interface RoleResult {
  role: string;
  score: number;
  missing: string[];
}

function computeResults(tags: string[]): RoleResult[] {
  return Object.entries(ROLE_DICT)
    .map(([role, required]) => {
      const matchCount = required.filter((skill) => tags.includes(skill)).length;
      const score = Math.round((matchCount / required.length) * 100);
      const missing = required.filter((skill) => !tags.includes(skill));
      return { role, score, missing };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
}

function TagInput({ tags, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState('');

  function addTag(val: string) {
    const tag = val.trim();
    if (!tag || tags.includes(tag)) return;
    onChange([...tags, tag]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
      setInput('');
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className={s.tagInput}>
      {tags.map((tag) => (
        <span key={tag} className={s.tagChip}>
          {tag}
          <button
            type="button"
            className={s.tagRemove}
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (input) {
            addTag(input);
            setInput('');
          }
        }}
        placeholder={tags.length === 0 ? placeholder : ''}
        className={s.tagInputField}
        aria-label="Add a skill"
      />
    </div>
  );
}

export function GapDemo() {
  const t = useTranslations('landingV2Page.gapDemo');
  const [tags, setTags] = useState<string[]>([]);

  const results = tags.length >= 2 ? computeResults(tags) : [];

  return (
    <section className={s.root} aria-labelledby="gap-demo-heading">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 id="gap-demo-heading" className={s.heading}>
            {t('title')}
          </h2>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={s.presets}>
          <span className={s.presetsLabel}>Try:</span>
          {Object.entries(PRESETS).map(([label, skills]) => (
            <button
              key={label}
              type="button"
              className={s.presetBtn}
              onClick={() => setTags(skills)}
            >
              {t(`preset${label as 'Frontend' | 'Backend' | 'Fullstack'}`)}
            </button>
          ))}
        </div>

        <TagInput tags={tags} onChange={setTags} placeholder={t('placeholder')} />

        {results.length > 0 && (
          <>
            <div className={s.results} aria-live="polite" aria-label="Role match results">
              {results.map((r) => (
                <div key={r.role} className={s.resultCard}>
                  <div className={s.resultTop}>
                    <span className={s.resultRole}>{r.role}</span>
                    <span className={s.resultScore}>{r.score}%</span>
                  </div>
                  <div className={s.resultBar}>
                    <div className={s.resultBarFill} style={{ width: `${r.score}%` }} />
                  </div>
                  {r.missing.length > 0 && (
                    <div className={s.resultMissing}>
                      <span className={s.resultMissingLabel}>{t('missing')}</span>
                      {r.missing.map((skill) => (
                        <span key={skill} className={s.resultMissingChip}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link href="/auth" className={s.ctaLink}>
              {t('cta')}
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
