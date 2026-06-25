'use client';

import { useResumeStore } from '@/entities/resume/model/resume-store';

interface UseUploadResumeOptions {
  activeDraftId: string | null;
}

export function useUploadResume({ activeDraftId }: UseUploadResumeOptions) {
  const { createDraft, drafts } = useResumeStore();

  return {
    handleFile: (file: File) => {
      const name = file.name.replace(/\.(pdf|docx)$/i, '');

      if (activeDraftId) {
        const draft = drafts.find((d) => d.id === activeDraftId);
        const draftName = draft?.name ?? 'current draft';
        // TODO: replace with actual parsing API call — send file to backend,
        // receive structured block data, call updateBlock() for each block
        alert(`Resume parsing coming soon. File will be imported into "${draftName}" once ready.`);
      } else {
        createDraft(name);
        alert('No draft selected — a new blank draft was created. Resume parsing coming soon.');
      }
    },
  };
}
