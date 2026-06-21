import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import s from './landing-cta.module.scss';

export async function LandingCta() {
  const t = await getTranslations('landingPage.cta');

  return (
    <section className={s.root}>
      <div className={s.inner}>
        <h2 className={s.title}>{t('title')}</h2>
        <p className={s.subtitle}>{t('subtitle')}</p>
        <Link href="/auth" className={s.btn}>
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
