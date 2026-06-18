'use client';

import { useResumeStore } from '@/entities/resume/model/resume-store';

export function useUploadResume() {
  const createDraft = useResumeStore((s) => s.createDraft);

  return {
    handleFile: (file: File) => {
      const name = file.name.replace(/\.(pdf|docx)$/i, '');
      createDraft(name);
      // TODO: replace with actual parsing API call
      alert('Resume uploaded — parsing is coming soon. A blank draft was created.');
    },
  };
}
