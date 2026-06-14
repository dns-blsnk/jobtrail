import { jobsPage } from '@/fsd-app/intl/messages/en/jobs-page';
import type { WithSession } from '@/fsd-app/auth/with-auth-guard';
import styles from './jobs-page.module.scss';

export function JobsPage(_props: WithSession) {
  const t = jobsPage;

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
