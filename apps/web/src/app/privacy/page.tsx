import { getTranslations } from 'next-intl/server';
import s from './page.module.scss';

export default async function PrivacyRoute() {
  const t = await getTranslations('privacyPage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <header className={s.hero}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s['last-updated']}>{t('lastUpdated')}</p>
        </header>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('introTitle')}</h2>
          <p className={s.body}>{t('introBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('collectTitle')}</h2>
          <p className={s.body}>{t('collectBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('useTitle')}</h2>
          <p className={s.body}>{t('useBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('cookiesTitle')}</h2>
          <p className={s.body}>{t('cookiesBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('retentionTitle')}</h2>
          <p className={s.body}>{t('retentionBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('rightsTitle')}</h2>
          <p className={s.body}>{t('rightsBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('securityTitle')}</h2>
          <p className={s.body}>{t('securityBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('contactTitle')}</h2>
          <p className={s.body}>{t('contactBody')}</p>
        </section>
      </div>
    </div>
  );
}
