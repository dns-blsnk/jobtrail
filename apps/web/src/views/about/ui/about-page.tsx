import { aboutPage } from '@/fsd-app/intl/messages/en/about-page';
import styles from './about-page.module.scss';

export function AboutPage() {
  const t = aboutPage;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.section}>
          <p className={styles.body}>{t.body}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.missionTitle}</h2>
          <p className={styles.body}>{t.missionBody}</p>
        </div>
      </div>
    </div>
  );
}
