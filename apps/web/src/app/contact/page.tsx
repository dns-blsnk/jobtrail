import { getTranslations } from 'next-intl/server';
import { ContactInfo } from '@/widgets/contact/ui/contact-info';
import { ContactForm } from '@/widgets/contact/ui/contact-form';
import { LocationBlock } from '@/widgets/contact/ui/location-block';
import styles from './page.module.scss';

export const dynamic = 'force-static';

export default async function ContactRoute() {
  const t = await getTranslations('contactPage');
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <div className={styles.grid}>
          <ContactInfo />
          <ContactForm />
        </div>

        <LocationBlock />
      </div>
    </div>
  );
}
