import { getTranslations } from 'next-intl/server';
import s from './analytics-page.module.scss';

export async function AnalyticsPage() {
  const t = await getTranslations('analyticsPage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.pageHeader}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>
        <div className={s.emptyState}>
          <p className={s.emptyTitle}>{t('empty')}</p>
          <p className={s.emptyHint}>{t('emptyHint')}</p>
        </div>
      </div>
    </div>
  );
}
