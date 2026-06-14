import { en } from '@/fsd-app/intl/messages/en';
import styles from './contact-page.module.scss';

export function ContactPage() {
  const t = en.pages.contact;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.emailRow}>
          <span className={styles.emailLabel}>{t.emailLabel}</span>
          <a className={styles.emailLink} href={`mailto:${t.emailAddress}`}>
            {t.emailAddress}
          </a>
        </div>
      </div>
    </div>
  );
}
