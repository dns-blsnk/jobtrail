'use client';

import { clsx } from 'clsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { Icon } from '@/shared/ui/icon/icon';
import type { IconName } from '@/shared/ui/icon/icon';
import type { BlockType } from '@/entities/resume/model/types';
import s from './resume-block.module.scss';

interface BlockTypeSelectorProps {
  open: boolean;
  onClose: () => void;
  onTypeSelected: (type: BlockType) => void;
}

interface BlockTypeOption {
  type: BlockType;
  label: string;
  icon: IconName;
}

const BLOCK_OPTIONS: BlockTypeOption[] = [
  { type: 'summary', label: 'Summary', icon: 'fileText' },
  { type: 'experience', label: 'Experience', icon: 'briefcase' },
  { type: 'education', label: 'Education', icon: 'graduationCap' },
  { type: 'skills', label: 'Skills', icon: 'star' },
  { type: 'projects', label: 'Projects', icon: 'filePlus' },
  { type: 'languages', label: 'Languages', icon: 'globe' },
  { type: 'certifications', label: 'Certifications', icon: 'check' },
  { type: 'social-links', label: 'Social Links', icon: 'link2' },
  { type: 'awards', label: 'Awards', icon: 'star' },
  { type: 'custom', label: 'Custom', icon: 'fileText' },
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
            return (
              <button
                key={option.type}
                type="button"
                className={clsx(s.blockTypeCard, isUsed && s.blockTypeCardDisabled)}
                onClick={() => handleSelect(option.type)}
                disabled={isUsed}
                aria-disabled={isUsed}
              >
                <Icon
                  name={option.icon}
                  size={22}
                  strokeWidth={1.7}
                  className={s.blockTypeCardIcon}
                />
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
