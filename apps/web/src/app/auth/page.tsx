import { authPage } from '@/fsd-app/intl/messages/en/auth-page';
import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import styles from './page.module.scss';

export default function AuthRoute() {
  const t = authPage;
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div aria-hidden className={styles.logoMark}>{t.logoMark}</div>
          <span className={styles.logoName}>{t.logoName}</span>
        </div>
        <AuthFormSection />
      </div>
    </main>
  );
}
