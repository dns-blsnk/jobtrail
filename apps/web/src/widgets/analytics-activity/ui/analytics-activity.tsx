'use client';

import { useTranslations } from 'next-intl';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { WeekActivity } from '@/entities/analytics/model/types';
import s from './analytics-activity.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface Props {
  data: WeekActivity[];
}

const OPTIONS: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (ctx) => ` ${ctx.raw as number} jobs added` } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#8c8c8c', font: { size: 10 } } },
    y: {
      beginAtZero: true,
      grid: { color: '#f0f0f0' },
      ticks: { color: '#8c8c8c', font: { size: 10 }, stepSize: 1 },
    },
  },
};

export function AnalyticsActivity({ data }: Props) {
  const t = useTranslations('analyticsPage.activity');

  const chartData = {
    labels: data.map((d) => d.week),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: '#375dfb',
        borderRadius: 4,
        maxBarThickness: 24,
      },
    ],
  };

  return (
    <section className={s.root}>
      <h2 className={s.title}>{t('title')}</h2>
      <div className={s.chartWrap}>
        <Bar data={chartData} options={OPTIONS} />
      </div>
    </section>
  );
}
