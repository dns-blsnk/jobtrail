import { getTranslations } from 'next-intl/server';
import s from './terms-page.module.scss';

export async function TermsPage() {
  const t = await getTranslations('termsPage');
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
          <h2 className={s['section-title']}>{t('serviceTitle')}</h2>
          <p className={s.body}>{t('serviceBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('accountTitle')}</h2>
          <p className={s.body}>{t('accountBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('conductTitle')}</h2>
          <p className={s.body}>{t('conductBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('prohibitedTitle')}</h2>
          <p className={s.body}>{t('prohibitedBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('ipTitle')}</h2>
          <p className={s.body}>{t('ipBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('liabilityTitle')}</h2>
          <p className={s.body}>{t('liabilityBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('terminationTitle')}</h2>
          <p className={s.body}>{t('terminationBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('contactTitle')}</h2>
          <p className={s.body}>{t('contactBody')}</p>
        </section>
      </div>
    </div>
  );
}
