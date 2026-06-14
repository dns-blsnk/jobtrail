import { getTranslations } from 'next-intl/server';
import styles from './page.module.scss';

export default async function ContactRoute() {
  const t = await getTranslations('contactPage');
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
        <div className={styles.emailRow}>
          <span className={styles.emailLabel}>{t('emailLabel')}</span>
          <a className={styles.emailLink} href={`mailto:${t('emailAddress')}`}>
            {t('emailAddress')}
          </a>
        </div>
      </div>
    </div>
  );
}
