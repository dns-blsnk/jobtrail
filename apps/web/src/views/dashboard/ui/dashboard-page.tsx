import type { Session } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import s from './dashboard-page.module.scss';

interface DashboardPageProps {
  session: Session;
}

export async function DashboardPage({ session }: DashboardPageProps) {
  const t = await getTranslations('dashboardPage');
  const displayName = session.user.name ?? session.user.email;

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.pageHeader}>
          <h1 className={s.title}>
            {t('welcome')}, {displayName}
          </h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={s.stats}>
          <StatCard label={t('stats.totalApplications')} value="0" />
          <StatCard label={t('stats.interviews')} value="0" />
          <StatCard label={t('stats.offers')} value="0" />
        </div>

        <div className={s.section}>
          <h2 className={s.sectionTitle}>{t('recentActivity')}</h2>
          <div className={s.emptyState}>
            <p className={s.emptyText}>{t('emptyActivity')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={s.statCard}>
      <span className={s.statValue}>{value}</span>
      <span className={s.statLabel}>{label}</span>
    </div>
  );
}
