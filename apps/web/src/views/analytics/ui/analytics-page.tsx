import { analyticsPage } from '@/fsd-app/intl/messages/en/analytics-page';
import type { WithSession } from '@/fsd-app/auth/with-auth-guard';
import styles from './analytics-page.module.scss';

export function AnalyticsPage(_props: WithSession) {
  const t = analyticsPage;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>{t.empty}</p>
          <p className={styles.emptyHint}>{t.emptyHint}</p>
        </div>
      </div>
    </div>
  );
}
