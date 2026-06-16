import { getTranslations } from 'next-intl/server';
import s from './help-page.module.scss';

export async function HelpPage() {
  const t = await getTranslations('helpPage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <h1 className={s.title}>{t('title')}</h1>
        <p className={s.subtitle}>{t('subtitle')}</p>
        <p className={s.placeholder}>{t('placeholder')}</p>
      </div>
    </div>
  );
}
