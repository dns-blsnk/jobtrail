import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { dashboardPage } from '@/fsd-app/intl/messages/en/dashboard-page';
import type { WithSession } from '@/fsd-app/auth/with-auth-guard';
import styles from './page.module.scss';

function DashboardPage({ session }: WithSession) {
  const t = dashboardPage;
  const displayName = session.user.name ?? session.user.email;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{t.welcome}, {displayName}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.stats}>
          <StatCard label={t.stats.totalApplications} value="0" />
          <StatCard label={t.stats.interviews} value="0" />
          <StatCard label={t.stats.offers} value="0" />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.recentActivity}</h2>
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>{t.emptyActivity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default withAuthGuard(DashboardPage);
