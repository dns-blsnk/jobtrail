import { getTranslations } from 'next-intl/server';
import s from './landing-how-it-works-v2.module.scss';

interface StepItem {
  number: string;
  title: string;
  description: string;
}

export async function LandingHowItWorksV2() {
  const t = await getTranslations('landingPage.howItWorks');
  const steps = t.raw('steps') as StepItem[];

  return (
    <section id="how-it-works" className={s.root}>
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>{t('title')}</h2>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={s.steps}>
          {steps.map((step, i) => (
            <div key={step.number} className={s.step}>
              <div className={s.stepTop}>
                <div className={s.stepNumber}>{step.number}</div>
                {i < steps.length - 1 && <div className={s.connector} aria-hidden="true" />}
              </div>
              <div className={s.stepBody}>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
