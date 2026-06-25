import { getTranslations } from 'next-intl/server';
import s from './landing-stats.module.scss';

interface StatItem {
  value: string;
  label: string;
}

export async function LandingStats() {
  const t = await getTranslations('landingPage.stats');
  const items = t.raw('items') as StatItem[];

  return (
    <section className={s.root}>
      <div className={s.inner}>
        {items.map(({ value, label }) => (
          <div key={label} className={s.card}>
            <p className={s.value}>{value}</p>
            <p className={s.label}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
