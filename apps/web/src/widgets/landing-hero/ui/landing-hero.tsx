import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import s from './landing-hero.module.scss';

export async function LandingHero() {
  const t = await getTranslations('landingPage.hero');

  return (
    <section className={s.root} aria-labelledby="hero-heading">
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.eyebrow} aria-hidden="true">
            {t('eyebrow')}
          </p>
          <h1 id="hero-heading" className={s.heading}>
            {t('title')}
          </h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
          <div className={s.buttons}>
            <Link href="/auth" className={s.btnPrimary}>
              {t('ctaPrimary')}
            </Link>
            <Link href="#how-it-works" className={s.btnSecondary}>
              {t('ctaSecondary')}
              <ArrowForwardOutlinedIcon sx={{ fontSize: 16 }} />
            </Link>
          </div>
        </div>

        <div className={s.preview} aria-hidden="true">
          <div className={s.window}>
            <div className={s.chrome}>
              <div className={s.chromeDots}>
                <span className={s.dotRed} />
                <span className={s.dotYellow} />
                <span className={s.dotGreen} />
              </div>
              <div className={s.chromeUrl}>jobtrail.app/jobs</div>
            </div>

            <div className={s.windowBody}>
              <aside className={s.sidebar}>
                <p className={s.sidebarHeading}>{t('preview.sidebarHeading')}</p>
                <ul className={s.jobList}>
                  <li className={`${s.jobItem} ${s.jobItemActive}`}>
                    <span className={s.jobDotActive} />
                    <div className={s.jobInfo}>
                      <span className={s.jobName}>Stripe</span>
                      <span className={s.jobPct}>87% match</span>
                    </div>
                  </li>
                  <li className={s.jobItem}>
                    <span className={s.jobDot} />
                    <div className={s.jobInfo}>
                      <span className={s.jobName}>Vercel</span>
                      <span className={s.jobPct}>73% match</span>
                    </div>
                  </li>
                  <li className={s.jobItem}>
                    <span className={s.jobDot} />
                    <div className={s.jobInfo}>
                      <span className={s.jobName}>Linear</span>
                      <span className={s.jobPct}>61% match</span>
                    </div>
                  </li>
                  <li className={s.jobItem}>
                    <span className={s.jobDot} />
                    <div className={s.jobInfo}>
                      <span className={s.jobName}>Notion</span>
                      <span className={s.jobPct}>58% match</span>
                    </div>
                  </li>
                  <li className={s.jobItem}>
                    <span className={s.jobDot} />
                    <div className={s.jobInfo}>
                      <span className={s.jobName}>Figma</span>
                      <span className={s.jobPct}>52% match</span>
                    </div>
                  </li>
                </ul>
              </aside>

              <div className={s.resumePane}>
                <div className={s.paneHeader}>
                  <div className={s.paneName} />
                  <div className={s.paneTitle} />
                </div>
                <hr className={s.paneDivider} />
                <div className={s.paneSection}>
                  <div className={s.paneSectionLabel} />
                  <div className={s.paneLine} />
                  <div className={s.paneLine} style={{ width: '78%' }} />
                  <div className={s.paneLine} style={{ width: '60%' }} />
                </div>
                <hr className={s.paneDivider} />
                <div className={s.paneSection}>
                  <div className={s.paneSectionLabel} />
                  <div className={s.paneLine} />
                  <div className={s.paneLine} style={{ width: '85%' }} />
                </div>
                <hr className={s.paneDivider} />
                <div className={s.paneSection}>
                  <div className={s.paneSectionLabel} />
                  <div className={s.paneSkills}>
                    <span className={s.paneChip}>React</span>
                    <span className={s.paneChip}>TypeScript</span>
                    <span className={s.paneChip}>Node.js</span>
                  </div>
                </div>
                <div className={s.paneSpacer} />
              </div>
            </div>
          </div>

          <div className={s.atsBadge}>
            <span className={s.atsScore}>94</span>
            <div className={s.atsInfo}>
              <span className={s.atsLabel}>{t('preview.atsLabel')}</span>
              <span className={s.atsStatus}>{t('preview.atsStatus')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
