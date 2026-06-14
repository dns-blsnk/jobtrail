import { helpPage } from '@/fsd-app/intl/messages/en/help-page';
import styles from './help-page.module.scss';

export function HelpPage() {
  const t = helpPage;

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
