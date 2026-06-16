import { getTranslations } from 'next-intl/server';
import s from './resume-templates-page.module.scss';

export async function ResumeTemplatesPage() {
  const t = await getTranslations('resumeTemplatesPage');
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
