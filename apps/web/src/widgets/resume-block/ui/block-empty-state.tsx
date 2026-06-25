import type { ComponentType } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import type { BlockType } from '@/entities/resume/model/types';
import s from './resume-block.module.scss';

interface BlockEmptyStateProps {
  blockType: BlockType;
  onAdd: () => void;
}

type IconComponent = ComponentType<{ sx?: object; className?: string }>;

const BLOCK_ICONS: Record<BlockType, IconComponent> = {
  header: AccountCircleOutlinedIcon,
  summary: ArticleOutlinedIcon,
  experience: WorkOutlinedIcon,
  education: SchoolOutlinedIcon,
  skills: StarBorderOutlinedIcon,
  projects: NoteAddOutlinedIcon,
  languages: LanguageOutlinedIcon,
  certifications: CheckOutlinedIcon,
  'social-links': LinkOutlinedIcon,
  awards: StarBorderOutlinedIcon,
  custom: ArticleOutlinedIcon,
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
  const BlockIcon = BLOCK_ICONS[blockType];
  return (
    <div className={s.emptyState}>
      <BlockIcon sx={{ fontSize: 28 }} className={s.emptyStateIcon} />
      <div className={s.emptyStateTitle}>{BLOCK_LABELS[blockType]}</div>
      <div className={s.emptyStateSubtitle}>Click to add</div>
      <button
        type="button"
        className={s.emptyStateBtn}
        onClick={onAdd}
        aria-label={`Add ${BLOCK_LABELS[blockType]}`}
      >
        Add
      </button>
    </div>
  );
}
