import type { LanguageItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockLanguagesProps {
  data: { items: LanguageItem[] };
}

export function BlockLanguages({ data }: BlockLanguagesProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Languages</h2>
      <div className={s.languageGrid}>
        {data.items.map((item) => (
          <div key={item.id} className={s.languageItem}>
            <span className={s.languageName}>{item.language}</span>
            <span className={s.languageLevel}>{item.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
