'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/icon/icon';
import { BlockTypeSelector } from '@/widgets/resume-block/ui/block-type-selector';
import { EditBlockModal } from '@/features/resume/edit-block/ui/edit-block-modal';
import s from './resume-block.module.scss';

export function AddBlockButton() {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [editingNewBlockId, setEditingNewBlockId] = useState<string | null>(null);

  function handleBlockAdded(blockId: string) {
    setEditingNewBlockId(blockId);
  }

  function handleEditClose() {
    setEditingNewBlockId(null);
  }

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
        onBlockAdded={handleBlockAdded}
      />
      <EditBlockModal
        open={editingNewBlockId !== null}
        blockId={editingNewBlockId}
        isNew={true}
        onClose={handleEditClose}
      />
    </>
  );
}
