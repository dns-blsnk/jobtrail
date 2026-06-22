import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { HeroCanvas } from '@/widgets/landing-hero-v2/ui/hero-canvas';
import s from './landing-hero-v2.module.scss';

export async function LandingHeroV2() {
  const t = await getTranslations('landingPage.heroV2');

  return (
    <section className={s.root} aria-labelledby="hero-v2-heading">
      <HeroCanvas />
      <div className={s.overlay} />
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.eyebrow}>{t('eyebrow')}</p>
          <h1 id="hero-v2-heading" className={s.heading}>
            {t('title')}{' '}
            <span className={s.accent}>{t('titleAccent')}</span>
          </h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
          <div className={s.buttons}>
            <Link href="/auth" className={s.btnPrimary}>{t('ctaPrimary')}</Link>
            <Link href="#how-it-works" className={s.btnSecondary}>{t('ctaSecondary')}</Link>
          </div>
        </div>

        <div className={s.statsGrid} aria-label="Key stats">
          {[
            { value: '5,200+', label: 'Resumes built' },
            { value: '1,800+', label: 'Jobs tracked' },
            { value: '340+',   label: 'Interviews landed' },
            { value: '71%',    label: 'Avg match score' },
          ].map(({ value, label }) => (
            <div key={label} className={s.statCard}>
              <span className={s.statValue}>{value}</span>
              <span className={s.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
