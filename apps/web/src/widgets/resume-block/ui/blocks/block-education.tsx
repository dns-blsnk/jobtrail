import type { EducationItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockEducationProps {
  data: { items: EducationItem[] };
}

export function BlockEducation({ data }: BlockEducationProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Education</h2>
      {data.items.map((item) => (
        <div key={item.id} className={s.item}>
          <div className={s.itemHeader}>
            <div>
              <div className={s.itemTitle}>{item.institution}</div>
              <div className={s.itemSubtitle}>
                {[item.degree, item.field].filter(Boolean).join(', ')}
                {item.gpa ? ` · GPA: ${item.gpa}` : ''}
              </div>
            </div>
            <div className={s.itemDate}>
              {item.startDate}
              {item.startDate || item.endDate ? ' – ' : ''}
              {item.endDate}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
