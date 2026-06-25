'use client';

import { useResumeStore } from '@/entities/resume/model/resume-store';

export function useDraftActions(draftId: string) {
  const { deleteDraft, duplicateDraft, renameDraft } = useResumeStore();
  return {
    delete: () => deleteDraft(draftId),
    duplicate: () => duplicateDraft(draftId),
    rename: (name: string) => renameDraft(draftId, name),
  };
}
