import { en } from '@/fsd-app/intl/messages/en';
import styles from './blog-page.module.scss';

export function BlogPage() {
  const t = en.pages.blog;

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
