'use client';

import { useTranslations } from 'next-intl';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { SourceCount } from '@/entities/analytics/model/types';
import s from './analytics-sources.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: SourceCount[];
}

const COLORS = ['#375dfb', '#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#8c8c8c'];

const OPTIONS: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: { boxWidth: 10, padding: 16, font: { size: 12 }, color: '#262626' },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.raw as number} jobs`,
      },
    },
  },
};

export function AnalyticsSources({ data }: Props) {
  const t = useTranslations('analyticsPage.sources');

  if (!data.length) return null;

  const chartData = {
    labels: data.map((d) => d.source),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: data.map((_, i) => COLORS[i % COLORS.length]),
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <section className={s.root}>
      <h2 className={s.title}>{t('title')}</h2>
      <div className={s.chartWrap}>
        <Doughnut data={chartData} options={OPTIONS} />
      </div>
    </section>
  );
}
