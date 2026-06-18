'use client';

import { useState } from 'react';

export function useEditBlock() {
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  return {
    editingBlockId,
    isNew,
    openEdit: (blockId: string, isNewBlock = false) => {
      setEditingBlockId(blockId);
      setIsNew(isNewBlock);
    },
    closeEdit: () => {
      setEditingBlockId(null);
      setIsNew(false);
    },
  };
}
