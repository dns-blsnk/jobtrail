'use client';

import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { DraftActionsMenu } from '@/features/resume/manage-draft/ui/draft-actions-menu';
import { useDraftActions } from '@/features/resume/manage-draft/model/use-draft-actions';
import type { Draft } from '@/entities/resume/model/types';
import s from './resume-sidebar.module.scss';

interface DraftCardProps {
  draft: Draft;
  isActive: boolean;
}

const TEMPLATE_LABELS: Record<Draft['templateId'], string> = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function DraftCard({ draft, isActive }: DraftCardProps) {
  const setActiveDraft = useResumeStore((state) => state.setActiveDraft);
  const actions = useDraftActions(draft.id);
  const [renameMode, setRenameMode] = useState(false);
  const [renameValue, setRenameValue] = useState(draft.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renameMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renameMode]);

  function handleRenameSubmit() {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== draft.name) {
      actions.rename(trimmed);
    }
    setRenameMode(false);
  }

  function handleRenameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleRenameSubmit();
    if (e.key === 'Escape') {
      setRenameValue(draft.name);
      setRenameMode(false);
    }
  }

  return (
    <div
      className={clsx(s.draftCard, isActive && s.draftCardActive)}
      onClick={() => setActiveDraft(draft.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveDraft(draft.id); }}
    >
      <div className={s.draftCardMain}>
        {renameMode ? (
          <input
            ref={inputRef}
            className={s.draftCardRenameInput}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleRenameKeyDown}
            onClick={(e) => e.stopPropagation()}
            aria-label="Rename draft"
          />
        ) : (
          <div className={s.draftCardName}>{draft.name}</div>
        )}
        <div className={s.draftCardMeta}>
          <span className={s.draftCardTemplate}>{TEMPLATE_LABELS[draft.templateId]}</span>
          <span className={s.draftCardDate}>{formatDate(draft.updatedAt)}</span>
        </div>
      </div>
      <div className={s.draftCardActions} onClick={(e) => e.stopPropagation()}>
        <DraftActionsMenu
          draftId={draft.id}
          onRenameStart={() => setRenameMode(true)}
        />
      </div>
    </div>
  );
}
