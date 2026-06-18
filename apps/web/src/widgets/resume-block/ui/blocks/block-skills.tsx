import type { SkillsData } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockSkillsProps {
  data: SkillsData;
}

export function BlockSkills({ data }: BlockSkillsProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Skills</h2>
      {data.groups.map((group) => (
        <div key={group.id} className={s.skillGroup}>
          {group.name && <div className={s.skillGroupName}>{group.name}</div>}
          <div className={s.tagList}>
            {group.tags.map((tag) => (
              <span key={tag} className={s.tag}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
