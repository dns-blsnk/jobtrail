'use client';

import { useTranslations } from 'next-intl';
import type { AnalyticsDashboard } from '@/entities/analytics/model/types';
import s from './analytics-summary-bar.module.scss';

interface Props {
  data: AnalyticsDashboard;
}

export function AnalyticsSummaryBar({ data }: Props) {
  const t = useTranslations('analyticsPage.summary');

  const kpis = [
    {
      key: 'totalJobs',
      label: t('totalJobs'),
      value: String(data.totalJobs),
    },
    {
      key: 'avgMatch',
      label: t('avgMatch'),
      value: data.avgMatchScore !== null ? `${data.avgMatchScore}%` : t('noData'),
    },
    {
      key: 'remoteRatio',
      label: t('remoteRatio'),
      value: `${data.remoteRatio}%`,
    },
    {
      key: 'responseRate',
      label: t('responseRate'),
      value: data.responseRate !== null ? `${data.responseRate}%` : t('noData'),
    },
  ];

  return (
    <ul className={s.root}>
      {kpis.map(({ key, label, value }) => (
        <li key={key} className={s.card}>
          <strong className={s.value}>{value}</strong>
          <p className={s.label}>{label}</p>
        </li>
      ))}
    </ul>
  );
}
