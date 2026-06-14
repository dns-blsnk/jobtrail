import { resumeTemplatesPage } from '@/fsd-app/intl/messages/en/resume-templates-page';
import styles from './resume-templates-page.module.scss';

export function ResumeTemplatesPage() {
  const t = resumeTemplatesPage;

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
