import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SkillsMatrix } from '@/widgets/landing-v2/hero-v2/ui/skills-matrix';
import s from './hero-v2.module.scss';

export async function HeroV2() {
  const t = await getTranslations('landingV2Page.hero');

  return (
    <section className={s.heroRoot} aria-labelledby="hero-v2-heading">
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.label}>{t('label')}</p>

          <h1 id="hero-v2-heading" className={s.heading}>
            {t('headingLine1')}
            <br />
            {t('headingLine2')}{' '}
            <span className={s.wavyWord}>
              {t('headingAccent')}
              <svg
                aria-hidden="true"
                className={s.wavy}
                viewBox="0 0 336 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,6 Q12,0 24,6 Q36,12 48,6 Q60,0 72,6 Q84,12 96,6 Q108,0 120,6 Q132,12 144,6 Q156,0 168,6 Q180,12 192,6 Q204,0 216,6 Q228,12 240,6 Q252,0 264,6 Q276,12 288,6 Q300,0 312,6 Q324,12 336,6"
                  stroke="#375dfb"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </span>{' '}
            {t('headingEnd')}
          </h1>

          <p className={s.subtitle}>{t('subtitle')}</p>

          <div className={s.actions}>
            <Link href="/auth" className={s.btnPrimary}>
              {t('ctaPrimary')}
            </Link>
            <a href="#how-it-works" className={s.btnGhost}>
              {t('ctaSecondary')}
            </a>
          </div>

          <p className={s.trust}>{t('trust')}</p>
        </div>

        <div className={s.matrixCol}>
          <div className={s.matrixCard}>
            <SkillsMatrix />
          </div>
        </div>
      </div>
    </section>
  );
}
