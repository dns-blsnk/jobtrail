import { authPage } from '@/fsd-app/intl/messages/en/auth-page';
import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import styles from './auth-page.module.scss';

export function AuthPage() {
  const t = authPage;
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoMark} aria-hidden>{t.logoMark}</div>
          <span className={styles.logoName}>{t.logoName}</span>
        </div>
        <AuthFormSection />
      </div>
    </main>
  );
}
