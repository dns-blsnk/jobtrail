import { getTranslations } from 'next-intl/server';
import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import styles from './page.module.scss';

export default withAuthGuard(async () => {
  const t = await getTranslations('applicationsPage');
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>{t('empty')}</p>
          <p className={styles.emptyHint}>{t('emptyHint')}</p>
        </div>
      </div>
    </div>
  );
});
