'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { AnalyticsDashboard } from '@/entities/analytics/model/types';
import { BarList } from '@/shared/ui/bar-list/bar-list';
import type { BarListItem } from '@/shared/ui/bar-list/bar-list';
import s from './analytics-skills-gap.module.scss';

interface Props {
  data: AnalyticsDashboard;
}

export function AnalyticsSkillsGap({ data }: Props) {
  const t = useTranslations('analyticsPage.skillsGap');
  const { skillsGap, hasProfileStack } = data;
  const maxCount = Math.max(...skillsGap.map((g) => g.count), 1);

  const items: BarListItem[] = skillsGap.map((skill) => ({
    key: skill.tech,
    label: skill.tech,
    barWidthPct: (skill.count / maxCount) * 100,
    trailing: (
      <>
        <span className={s.jobCount}>{skill.count} jobs</span>
        <span className={s.reachBadge}>{t('reach', { n: skill.coverageIfAdded })}</span>
      </>
    ),
  }));

  return (
    <section className={s.root}>
      <header className={s.header}>
        <div>
          <h2 className={s.title}>{t('title')}</h2>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>
        <Link href="/profile" className={s.ctaLink}>{t('cta')} →</Link>
      </header>

      {!hasProfileStack ? (
        <p className={s.notice}>{t('noProfile')}</p>
      ) : skillsGap.length === 0 ? (
        <p className={s.notice}>{t('noGap')}</p>
      ) : (
        <BarList items={items} />
      )}
    </section>
  );
}
