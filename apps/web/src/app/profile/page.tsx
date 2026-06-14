import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { profilePage } from '@/fsd-app/intl/messages/en/profile-page';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import type { WithSession } from '@/fsd-app/auth/with-auth-guard';
import styles from './page.module.scss';

function ProfilePage({ session }: WithSession) {
  const t = profilePage;
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>
        <ProfileCard user={session.user} />
      </div>
    </div>
  );
}

export default withAuthGuard(ProfilePage);
