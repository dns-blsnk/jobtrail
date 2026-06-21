'use client';

import { useResumeStore } from '@/entities/resume/model/resume-store';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
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
      <AddOutlinedIcon sx={{ fontSize: 14 }} />
      New draft
    </button>
  );
}
