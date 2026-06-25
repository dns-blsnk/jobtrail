import type { SummaryData } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockSummaryProps {
  data: SummaryData;
}

export function BlockSummary({ data }: BlockSummaryProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>{data.sectionTitle || 'Profile'}</h2>
      <p className={s.summaryText}>{data.text}</p>
    </div>
  );
}
