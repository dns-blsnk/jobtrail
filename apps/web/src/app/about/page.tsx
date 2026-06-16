import { getTranslations } from 'next-intl/server';
import s from './page.module.scss';

export default async function AboutRoute() {
  const t = await getTranslations('aboutPage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <header className={s.hero}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </header>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('introTitle')}</h2>
          <p className={s.body}>{t('introBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('missionTitle')}</h2>
          <p className={s.body}>{t('missionBody')}</p>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('goalsTitle')}</h2>
          <div className={s['goal-grid']}>
            <div className={s['goal-card']}>
              <h3 className={s['goal-title']}>{t('goal1Title')}</h3>
              <p className={s['goal-body']}>{t('goal1Body')}</p>
            </div>
            <div className={s['goal-card']}>
              <h3 className={s['goal-title']}>{t('goal2Title')}</h3>
              <p className={s['goal-body']}>{t('goal2Body')}</p>
            </div>
            <div className={s['goal-card']}>
              <h3 className={s['goal-title']}>{t('goal3Title')}</h3>
              <p className={s['goal-body']}>{t('goal3Body')}</p>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <h2 className={s['section-title']}>{t('storyTitle')}</h2>
          <p className={s.body}>{t('storyBody')}</p>
        </section>
      </div>
    </div>
  );
}
