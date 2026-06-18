'use client';

import { useResumeStore } from '@/entities/resume/model/resume-store';
import { CreateDraftButton } from '@/features/resume/manage-draft/ui/create-draft-button';
import { DraftCard } from '@/widgets/resume-sidebar/ui/draft-card';
import s from './resume-sidebar.module.scss';

export function ResumeSidebar() {
  const { drafts, activeDraftId } = useResumeStore();

  return (
    <aside className={s.sidebar} aria-label="Resume drafts">
      <div className={s.sidebarHeader}>
        <h2 className={s.sidebarTitle}>Drafts</h2>
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
            <DraftCard draft={draft} isActive={draft.id === activeDraftId} />
          </div>
        ))}
      </div>
    </aside>
  );
}
