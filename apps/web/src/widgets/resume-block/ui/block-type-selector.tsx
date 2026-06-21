'use client';

import type { ComponentType } from 'react';
import { clsx } from 'clsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import type { BlockType } from '@/entities/resume/model/types';
import s from './resume-block.module.scss';

interface BlockTypeSelectorProps {
  open: boolean;
  onClose: () => void;
  onTypeSelected: (type: BlockType) => void;
}

type IconComponent = ComponentType<{ sx?: object; className?: string }>;

interface BlockTypeOption {
  type: BlockType;
  label: string;
  icon: IconComponent;
}

const BLOCK_OPTIONS: BlockTypeOption[] = [
  { type: 'summary', label: 'Summary', icon: ArticleOutlinedIcon },
  { type: 'experience', label: 'Experience', icon: WorkOutlinedIcon },
  { type: 'education', label: 'Education', icon: SchoolOutlinedIcon },
  { type: 'skills', label: 'Skills', icon: StarBorderOutlinedIcon },
  { type: 'projects', label: 'Projects', icon: NoteAddOutlinedIcon },
  { type: 'languages', label: 'Languages', icon: LanguageOutlinedIcon },
  { type: 'certifications', label: 'Certifications', icon: CheckOutlinedIcon },
  { type: 'social-links', label: 'Social Links', icon: LinkOutlinedIcon },
  { type: 'awards', label: 'Awards', icon: StarBorderOutlinedIcon },
  { type: 'custom', label: 'Custom', icon: ArticleOutlinedIcon },
];

export function BlockTypeSelector({ open, onClose, onTypeSelected }: BlockTypeSelectorProps) {
  const { drafts, activeDraftId } = useResumeStore();
  const activeDraft = drafts.find((d) => d.id === activeDraftId);
  const usedTypes = new Set(activeDraft?.blocks.map((b) => b.blockData.type) ?? []);

  function handleSelect(type: BlockType) {
    if (usedTypes.has(type) && type !== 'custom') return;
    onClose();
    onTypeSelected(type);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="block-type-selector-title"
    >
      <DialogTitle id="block-type-selector-title">Add section</DialogTitle>
      <DialogContent>
        <div className={s.blockTypeGrid}>
          {BLOCK_OPTIONS.map((option) => {
            const isUsed = usedTypes.has(option.type) && option.type !== 'custom';
            const OptionIcon = option.icon;
            return (
              <button
                key={option.type}
                type="button"
                className={clsx(s.blockTypeCard, isUsed && s.blockTypeCardDisabled)}
                onClick={() => handleSelect(option.type)}
                disabled={isUsed}
                aria-disabled={isUsed}
              >
                <OptionIcon sx={{ fontSize: 22 }} className={s.blockTypeCardIcon} />
                <span className={s.blockTypeCardLabel}>{option.label}</span>
                {isUsed && <span className={s.blockTypeCardBadge}>Added</span>}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
