import { getTranslations } from 'next-intl/server';
import { SkillBubbles } from '@/widgets/landing-v2/hero-variants/ui/skill-bubbles';
import s from './skill-cloud.module.scss';

export async function SkillCloudStrip() {
  const t = await getTranslations('landingV2Page.skillCloud');

  return (
    <section className={s.root} aria-labelledby="skill-cloud-heading">
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.label}>{t('label')}</p>
          <h2 id="skill-cloud-heading" className={s.title}>
            {t('title')}
          </h2>
          <p className={s.body}>{t('body')}</p>
        </div>
        <SkillBubbles className={s.canvasWrap} />
      </div>
    </section>
  );
}
