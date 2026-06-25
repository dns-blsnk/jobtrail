import { getTranslations } from 'next-intl/server';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/Adjust';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import s from './landing-features-v2.module.scss';

const ICON_MAP = {
  article: ArticleOutlinedIcon,
  work: WorkOutlinedIcon,
  adjust: AdjustOutlinedIcon,
  barChart: BarChartOutlinedIcon,
} as const;

type IconKey = keyof typeof ICON_MAP;

interface FeatureItem {
  icon: IconKey;
  title: string;
  description: string;
}

export async function LandingFeaturesV2() {
  const t = await getTranslations('landingPage.features');
  const items = t.raw('items') as FeatureItem[];

  return (
    <section className={s.root}>
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>{t('title')}</h2>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={s.grid}>
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? ArticleOutlinedIcon;
            return (
              <div key={item.icon} className={s.card}>
                <div className={s.iconWrap}>
                  <Icon sx={{ fontSize: 22 }} aria-hidden="true" />
                </div>
                <h3 className={s.cardTitle}>{item.title}</h3>
                <p className={s.cardDesc}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
