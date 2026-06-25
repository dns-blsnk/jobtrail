import { getTranslations } from 'next-intl/server';
import s from './resume-strip.module.scss';

export async function ResumeStrip() {
  const t = await getTranslations('landingV2Page.resumeStrip');
  const keywords = t.raw('keywords') as string[];

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.label}>{t('label')}</p>
          <h2 className={s.title}>{t('title')}</h2>
          <p className={s.body}>{t('body')}</p>
        </div>

        <div className={s.visual}>
          <div className={s.resumeCard} aria-hidden="true">
            <div className={s.resumeTop}>
              <div className={s.resumeName}>Alex Morgan</div>
              <div className={s.resumeRole}>Senior Software Engineer</div>
              <div className={s.resumeMeta}>alex@email.com · New York, NY</div>
            </div>

            <div className={s.section}>
              <div className={s.sectionLabel}>Summary</div>
              <div className={s.line} />
              <div className={s.line} style={{ width: '78%' }} />
            </div>

            <div className={`${s.section} ${s.sectionAccent}`}>
              <div className={s.sectionLabelRow}>
                <span className={s.sectionLabelHighlight}>Experience</span>
                <span className={s.updateBadge}>{t('updateLabel')}</span>
              </div>
              <div className={s.lineAccent} />
              <div className={s.lineAccent} style={{ width: '88%' }} />
              <div className={s.lineAccent} style={{ width: '68%' }} />
            </div>

            <div className={s.section}>
              <div className={s.sectionLabel}>Skills</div>
              <div className={s.skillsRow}>
                {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((sk) => (
                  <span key={sk} className={s.skillChip}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className={s.keywordsBar}>
              <span className={s.keywordsLabel}>{t('keywordsLabel')}:</span>
              <div className={s.keywordsChips}>
                {keywords.map((kw) => (
                  <span key={kw} className={s.keywordChip}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
