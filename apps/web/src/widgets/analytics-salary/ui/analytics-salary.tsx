'use client';

import { useTranslations } from 'next-intl';
import type { SalaryInsights } from '@/entities/analytics/model/types';
import s from './analytics-salary.module.scss';

interface Props {
  data: SalaryInsights;
}

function formatSalary(value: number): string {
  return value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value}`;
}

export function AnalyticsSalary({ data }: Props) {
  const t = useTranslations('analyticsPage.salary');

  const hasData = data.median !== null && data.min !== null && data.max !== null;

  const medianPos =
    hasData && data.max !== data.min
      ? ((data.median! - data.min!) / (data.max! - data.min!)) * 100
      : 50;

  return (
    <section className={s.root}>
      <h2 className={s.title}>{t('title')}</h2>

      {!hasData ? (
        <p className={s.empty}>{t('notEnough')}</p>
      ) : (
        <>
          <p className={s.basedOn}>{t('basedOn', { n: data.count })}</p>
          <strong className={s.medianValue}>{formatSalary(data.median!)}</strong>
          <div className={s.rangeWrap}>
            <div className={s.rangeLine} />
            <div
              className={s.medianDot}
              style={{ left: `${medianPos}%` }}
              aria-label={`Median: ${formatSalary(data.median!)}`}
            />
            <div className={s.rangeLabels}>
              <span>{formatSalary(data.min!)}</span>
              <span>{formatSalary(data.max!)}</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
