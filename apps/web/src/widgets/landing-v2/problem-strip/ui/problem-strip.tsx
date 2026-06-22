import { getTranslations } from 'next-intl/server';
import CloseRounded from '@mui/icons-material/CloseRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import s from './problem-strip.module.scss';

export async function ProblemStrip() {
  const t = await getTranslations('landingV2Page.problem');
  const withoutItems = t.raw('withoutItems') as string[];
  const withItems = t.raw('withItems') as string[];

  return (
    <section id="how-it-works" className={s.root} aria-label="Before and after Jobtrail">
      <div className={s.inner}>
        <div className={s.grid}>
          <div className={s.card}>
            <div className={s.cardHead}>
              <div className={s.iconBad}>
                <CloseRounded fontSize="inherit" />
              </div>
              <h2 className={s.cardTitle}>{t('without')}</h2>
            </div>
            <ul className={s.list} aria-label="Pain points without Jobtrail">
              {withoutItems.map((item) => (
                <li key={item} className={s.itemBad}>
                  <CloseRounded className={s.iconItemBad} fontSize="small" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${s.card} ${s.cardGood}`}>
            <div className={s.cardHead}>
              <div className={s.iconGood}>
                <CheckRounded fontSize="inherit" />
              </div>
              <h2 className={`${s.cardTitle} ${s.cardTitleGood}`}>{t('with')}</h2>
            </div>
            <ul className={s.list} aria-label="Benefits with Jobtrail">
              {withItems.map((item) => (
                <li key={item} className={s.itemGood}>
                  <CheckRounded className={s.iconItemGood} fontSize="small" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
