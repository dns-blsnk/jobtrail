import { getTranslations } from 'next-intl/server';
import styles from './page.module.scss';

export default async function BlogRoute() {
  const t = await getTranslations('blogPage');
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <p className={styles.placeholder}>{t('placeholder')}</p>
      </div>
    </div>
  );
}
