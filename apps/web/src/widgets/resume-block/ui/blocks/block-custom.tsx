import type { CustomData } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockCustomProps {
  data: CustomData;
}

export function BlockCustom({ data }: BlockCustomProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>{data.sectionTitle || 'Custom Section'}</h2>
      <p className={s.summaryText}>{data.content}</p>
    </div>
  );
}
