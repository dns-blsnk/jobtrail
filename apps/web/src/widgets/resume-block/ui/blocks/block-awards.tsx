import type { AwardItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockAwardsProps {
  data: { items: AwardItem[] };
}

export function BlockAwards({ data }: BlockAwardsProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Awards</h2>
      {data.items.map((item) => (
        <div key={item.id} className={s.item}>
          <div className={s.itemHeader}>
            <div className={s.itemTitle}>{item.title}</div>
            <div className={s.itemDate}>{item.date}</div>
          </div>
          {item.description && <p className={s.itemDescription}>{item.description}</p>}
        </div>
      ))}
    </div>
  );
}
