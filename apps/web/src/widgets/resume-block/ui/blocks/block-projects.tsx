import type { ProjectItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockProjectsProps {
  data: { items: ProjectItem[] };
}

export function BlockProjects({ data }: BlockProjectsProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Projects</h2>
      {data.items.map((item) => (
        <div key={item.id} className={s.item}>
          <div className={s.itemHeader}>
            <div>
              <div className={s.itemTitle}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.itemLink}
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
            </div>
            <div className={s.itemDate}>
              {item.startDate}
              {item.startDate || item.endDate ? ' – ' : ''}
              {item.endDate}
            </div>
          </div>
          {item.techStack.length > 0 && (
            <div className={s.tagList}>
              {item.techStack.map((tech) => (
                <span key={tech} className={s.tag}>
                  {tech}
                </span>
              ))}
            </div>
          )}
          {item.description && <p className={s.itemDescription}>{item.description}</p>}
        </div>
      ))}
    </div>
  );
}
