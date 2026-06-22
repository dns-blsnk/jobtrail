import { getTranslations } from 'next-intl/server';
import s from './problem-strip.module.scss';

const WITHOUT_ITEMS = [
  'Copy-paste the same resume for every role',
  'Google "what skills does [company] use"',
  "Track applications in a spreadsheet that's already out of date",
  "Send 50 applications, hear back from 3, don't know why",
  'Wait weeks to realize your resume has an ATS keyword problem',
];

const WITH_ITEMS = [
  'One resume, customised per role in one click',
  'Parse any job URL — tech stack extracted automatically',
  'Every application tracked with status, deadline, and match score',
  'See your response rate and know exactly which roles fit your stack',
  'ATS score shown before you apply',
];

export async function ProblemStrip() {
  const t = await getTranslations('landingV2Page.problem');

  return (
    <section id="how-it-works" className={s.root} aria-label="Before and after Jobtrail">
      <div className={s.inner}>
        <div className={s.grid}>
          <div className={s.col}>
            <h2 className={`${s.colHeader} ${s.colHeaderWithout}`}>{t('without')}</h2>
            <ul className={s.list} aria-label="Pain points without Jobtrail">
              {WITHOUT_ITEMS.map((item) => (
                <li key={item} className={s.itemWithout}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.col}>
            <h2 className={`${s.colHeader} ${s.colHeaderWith}`}>{t('with')}</h2>
            <ul className={s.list} aria-label="Benefits with Jobtrail">
              {WITH_ITEMS.map((item) => (
                <li key={item} className={s.itemWith}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
