import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ContactInfo } from '@/widgets/contact/ui/contact-info';
import { ContactForm } from '@/widgets/contact/ui/contact-form';
import { LocationBlock } from '@/widgets/contact/ui/location-block';
import s from './contact-page.module.scss';

export async function ContactPage() {
  const [t, messages] = await Promise.all([getTranslations('contactPage'), getMessages()]);
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <header className={s.hero}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
          <p className={s.description}>{t('description')}</p>
        </header>

        <NextIntlClientProvider messages={{ contactPage: messages.contactPage }}>
          <ContactInfo />
          <ContactForm />
          <LocationBlock />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
