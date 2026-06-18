import type { BlockType } from '@/entities/resume/model/types';
import { Icon } from '@/shared/ui/icon/icon';
import type { IconName } from '@/shared/ui/icon/icon';
import s from './resume-block.module.scss';

interface BlockEmptyStateProps {
  blockType: BlockType;
  onAdd: () => void;
}

const BLOCK_ICONS: Record<BlockType, IconName> = {
  header: 'userCircle',
  summary: 'fileText',
  experience: 'briefcase',
  education: 'graduationCap',
  skills: 'star',
  projects: 'filePlus',
  languages: 'globe',
  certifications: 'check',
  'social-links': 'link2',
  awards: 'star',
  custom: 'fileText',
};

const BLOCK_LABELS: Record<BlockType, string> = {
  header: 'Header',
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  languages: 'Languages',
  certifications: 'Certifications',
  'social-links': 'Social Links',
  awards: 'Awards',
  custom: 'Custom Section',
};

export function BlockEmptyState({ blockType, onAdd }: BlockEmptyStateProps) {
  return (
    <div className={s.emptyState}>
      <Icon name={BLOCK_ICONS[blockType]} size={28} strokeWidth={1.5} className={s.emptyStateIcon} />
      <div className={s.emptyStateTitle}>{BLOCK_LABELS[blockType]}</div>
      <div className={s.emptyStateSubtitle}>Click to add</div>
      <button type="button" className={s.emptyStateBtn} onClick={onAdd} aria-label={`Add ${BLOCK_LABELS[blockType]}`}>
        Add
      </button>
    </div>
  );
}
