import { getTranslations } from 'next-intl/server';
import s from './matching-strip.module.scss';

interface CompanyMatch {
  name: string;
  role: string;
  score: number;
}

const COMPANY_COLORS: Record<string, string> = {
  GitHub: '#24292e',
  Figma: '#a259ff',
  Shopify: '#5e8e3e',
  Discord: '#5865f2',
};

function fitLabel(score: number, labels: Record<string, string>): string {
  if (score >= 85) return labels.strongFit;
  if (score >= 70) return labels.goodFit;
  if (score >= 50) return labels.partialFit;
  return labels.weakFit;
}

export async function MatchingStrip() {
  const t = await getTranslations('landingV2Page.matchingStrip');
  const companies = t.raw('companies') as CompanyMatch[];
  const fitLabels = {
    strongFit: t('strongFit'),
    goodFit: t('goodFit'),
    partialFit: t('partialFit'),
    weakFit: t('weakFit'),
  };

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.label}>{t('label')}</p>
          <h2 className={s.title}>{t('title')}</h2>
          <p className={s.body}>{t('body')}</p>
        </div>

        <div className={s.grid} aria-hidden="true">
          {companies.map((co) => {
            const color = COMPANY_COLORS[co.name] ?? '#375dfb';
            const isWeak = co.score < 50;
            const isPartial = co.score >= 50 && co.score < 70;
            return (
              <div key={co.name} className={s.card}>
                <div className={s.cardTop}>
                  <div className={s.avatar} style={{ background: color }}>
                    {co.name[0]}
                  </div>
                  <div className={s.cardMeta}>
                    <span className={s.company}>{co.name}</span>
                    <span className={s.role}>{co.role}</span>
                  </div>
                </div>
                <div className={s.scoreRow}>
                  <span
                    className={`${s.score} ${isWeak ? s.scoreWeak : ''} ${isPartial ? s.scorePartial : ''}`}
                  >
                    {co.score}%
                  </span>
                  <span
                    className={`${s.fitBadge} ${isWeak ? s.fitBadgeWeak : ''} ${isPartial ? s.fitBadgePartial : ''}`}
                  >
                    {fitLabel(co.score, fitLabels)}
                  </span>
                </div>
                <div className={s.bar}>
                  <div
                    className={`${s.barFill} ${isWeak ? s.barFillWeak : ''} ${isPartial ? s.barFillPartial : ''}`}
                    style={{ width: `${co.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
