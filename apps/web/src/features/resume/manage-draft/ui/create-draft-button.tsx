'use client';

import { useResumeStore } from '@/entities/resume/model/resume-store';
import { Icon } from '@/shared/ui/icon/icon';
import s from './create-draft-button.module.scss';

export function CreateDraftButton() {
  const createDraft = useResumeStore((state) => state.createDraft);

  return (
    <button
      type="button"
      className={s.btn}
      onClick={() => createDraft()}
      aria-label="Create new draft"
    >
      <Icon name="plus" size={14} strokeWidth={2.2} />
      New draft
    </button>
  );
}
