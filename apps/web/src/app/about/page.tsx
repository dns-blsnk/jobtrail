import { getTranslations } from 'next-intl/server';
import s from './page.module.scss';

export default async function AboutRoute() {
  const t = await getTranslations('aboutPage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.hero}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>
        <div className={s.section}>
          <p className={s.body}>{t('body')}</p>
        </div>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>{t('missionTitle')}</h2>
          <p className={s.body}>{t('missionBody')}</p>
        </div>
      </div>
    </div>
  );
}
