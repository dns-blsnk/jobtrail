import { termsPage } from '@/fsd-app/intl/messages/en/terms-page';
import styles from './terms-page.module.scss';

export function TermsPage() {
  const t = termsPage;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <p className={styles.placeholder}>{t.placeholder}</p>
      </div>
    </div>
  );
}
