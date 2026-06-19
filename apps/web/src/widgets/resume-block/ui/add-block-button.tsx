'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/icon/icon';
import { BlockTypeSelector } from '@/widgets/resume-block/ui/block-type-selector';
import { EditBlockModal } from '@/features/resume/edit-block/ui/edit-block-modal';
import type { BlockType } from '@/entities/resume/model/types';
import s from './resume-block.module.scss';

export function AddBlockButton() {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [pendingBlockType, setPendingBlockType] = useState<BlockType | null>(null);

  return (
    <>
      <button
        type="button"
        className={s.addBlockBtn}
        onClick={() => setSelectorOpen(true)}
        aria-label="Add section"
      >
        <Icon name="plus" size={16} strokeWidth={2.2} />
        Add section
      </button>

      <BlockTypeSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onTypeSelected={(type) => setPendingBlockType(type)}
      />

      <EditBlockModal
        open={pendingBlockType !== null}
        blockId={null}
        pendingBlockType={pendingBlockType}
        isNew={true}
        onClose={() => setPendingBlockType(null)}
      />
    </>
  );
}
