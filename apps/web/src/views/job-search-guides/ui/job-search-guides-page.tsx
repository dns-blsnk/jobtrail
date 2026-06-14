import { jobSearchGuidesPage } from '@/fsd-app/intl/messages/en/job-search-guides-page';
import styles from './job-search-guides-page.module.scss';

export function JobSearchGuidesPage() {
  const t = jobSearchGuidesPage;

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
