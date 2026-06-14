import { getTranslations } from 'next-intl/server';
import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import styles from './page.module.scss';

export default withAuthGuard(async ({ session }) => {
  const t = await getTranslations('profilePage');
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
        <ProfileCard user={session.user} />
      </div>
    </div>
  );
});
