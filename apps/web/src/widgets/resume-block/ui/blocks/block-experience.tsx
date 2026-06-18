import type { ExperienceItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockExperienceProps {
  data: { items: ExperienceItem[] };
}

export function BlockExperience({ data }: BlockExperienceProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Experience</h2>
      {data.items.map((item) => (
        <div key={item.id} className={s.item}>
          <div className={s.itemHeader}>
            <div>
              <div className={s.itemTitle}>{item.role}</div>
              <div className={s.itemSubtitle}>{item.company}{item.location ? ` · ${item.location}` : ''}</div>
            </div>
            <div className={s.itemDate}>
              {item.startDate}{item.startDate || item.endDate ? ' – ' : ''}{item.present ? 'Present' : item.endDate}
            </div>
          </div>
          {item.description && <p className={s.itemDescription}>{item.description}</p>}
        </div>
      ))}
    </div>
  );
}
