'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FunnelStep } from '@/entities/analytics/model/types';
import { BarList } from '@/shared/ui/bar-list/bar-list';
import type { BarListItem } from '@/shared/ui/bar-list/bar-list';
import s from './analytics-funnel.module.scss';

interface Props {
  data: FunnelStep[];
}

export function AnalyticsFunnel({ data }: Props) {
  const t = useTranslations('analyticsPage.funnel');
  const router = useRouter();

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const items: BarListItem[] = data.map((step, i) => {
    const prev = i > 0 ? data[i - 1] : null;
    const conversion =
      prev && prev.count > 0 ? Math.round((step.count / prev.count) * 100) : null;

    return {
      key: step.status,
      label: step.status,
      barWidthPct: (step.count / maxCount) * 100,
      trailing: (
        <>
          <span className={s.count}>{step.count}</span>
          {conversion !== null && step.count > 0 && (
            <span className={s.conversion}>
              {conversion}% {t('conversionFrom')}
            </span>
          )}
        </>
      ),
      onClick: () => router.push(`/jobs?status=${step.status}`),
    };
  });

  return (
    <section className={s.root}>
      <h2 className={s.title}>{t('title')}</h2>
      <BarList items={items} />
    </section>
  );
}
