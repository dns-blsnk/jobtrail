'use client';

import { clsx } from 'clsx';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { Icon } from '@/shared/ui/icon/icon';
import { CreateDraftButton } from '@/features/resume/manage-draft/ui/create-draft-button';
import { DraftCard } from '@/widgets/resume-sidebar/ui/draft-card';
import s from './resume-sidebar.module.scss';

interface ResumeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeSidebar({ isOpen, onClose }: ResumeSidebarProps) {
  const { drafts, activeDraftId } = useResumeStore();

  function handleDraftSelect(id: string) {
    onClose();
  }

  return (
    <aside
      className={clsx(s.sidebar, isOpen && s.sidebarOpen)}
      aria-label="Resume drafts"
    >
      <div className={s.sidebarHeader}>
        <h2 className={s.sidebarTitle}>Drafts</h2>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close drafts panel"
        >
          <Icon name="x" size={18} strokeWidth={1.9} />
        </button>
      </div>
      <div className={s.sidebarCreate}>
        <CreateDraftButton />
      </div>
      <div className={s.draftList} role="list">
        {drafts.length === 0 && (
          <p className={s.emptyText}>No drafts yet</p>
        )}
        {drafts.map((draft) => (
          <div key={draft.id} role="listitem">
            <DraftCard
              draft={draft}
              isActive={draft.id === activeDraftId}
              onSelect={handleDraftSelect}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
