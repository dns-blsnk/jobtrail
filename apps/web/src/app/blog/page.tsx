import { getTranslations } from 'next-intl/server';
import s from './page.module.scss';

export default async function BlogRoute() {
  const t = await getTranslations('blogPage');
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
