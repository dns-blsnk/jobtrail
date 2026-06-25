'use client';

import type { CSSProperties } from 'react';
import { clsx } from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import type { BlockType } from '@/entities/resume/model/types';
import { EditBlockModal } from '@/features/resume/edit-block/ui/edit-block-modal';
import { useEditBlock } from '@/features/resume/edit-block/model/use-edit-block';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { BlockEmptyState } from '@/widgets/resume-block/ui/block-empty-state';
import s from './resume-block.module.scss';

interface BlockWrapperProps {
  id: string;
  isHeader: boolean;
  isPreview: boolean;
  isEmpty: boolean;
  blockType: BlockType;
  children: React.ReactNode;
}

export function BlockWrapper({
  id,
  isHeader,
  isPreview,
  isEmpty,
  blockType,
  children,
}: BlockWrapperProps) {
  const { editingBlockId, isNew, openEdit, closeEdit } = useEditBlock();
  const removeBlock = useResumeStore((state) => state.removeBlock);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: isHeader,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
  };

  const wrapperClass = clsx(s.blockWrapper, isDragging && s.blockWrapperDragging);

  function handleAddClick() {
    openEdit(id, false);
  }

  if (isHeader) {
    return (
      <div className={s.blockWrapper} data-is-header>
        {!isPreview && (
          <div className={s.blockActions}>
            <button
              type="button"
              className={s.editBtn}
              onClick={() => openEdit(id)}
              aria-label="Edit block"
            >
              <EditOutlinedIcon sx={{ fontSize: 14 }} />
              Edit
            </button>
            {blockType !== 'header' && (
              <button
                type="button"
                className={s.deleteBtn}
                onClick={() => removeBlock(id)}
                aria-label="Delete block"
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 14 }} />
              </button>
            )}
          </div>
        )}
        {isEmpty && !isPreview ? (
          <BlockEmptyState blockType={blockType} onAdd={handleAddClick} />
        ) : (
          children
        )}
        <EditBlockModal
          key={editingBlockId}
          open={editingBlockId === id}
          blockId={editingBlockId}
          isNew={isNew}
          onClose={closeEdit}
        />
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={wrapperClass}>
      {!isPreview && (
        <div
          className={s.dragHandle}
          aria-label="Drag to reorder"
          style={{ touchAction: 'none' }}
          {...attributes}
          {...listeners}
        >
          <DragIndicatorIcon sx={{ fontSize: 14 }} />
        </div>
      )}
      {!isPreview && (
        <div className={s.blockActions}>
          <button
            type="button"
            className={s.editBtn}
            onClick={() => openEdit(id)}
            aria-label="Edit block"
          >
            <EditOutlinedIcon sx={{ fontSize: 14 }} />
            Edit
          </button>
          <button
            type="button"
            className={s.deleteBtn}
            onClick={() => removeBlock(id)}
            aria-label="Delete block"
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      )}
      {isEmpty && !isPreview ? (
        <BlockEmptyState blockType={blockType} onAdd={handleAddClick} />
      ) : (
        children
      )}
      <EditBlockModal
        key={editingBlockId}
        open={editingBlockId === id}
        blockId={editingBlockId}
        isNew={isNew}
        onClose={closeEdit}
      />
    </div>
  );
}
