'use client';

import { useRef } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useUploadResume } from '@/features/resume/upload-resume/model/use-upload-resume';
import s from './upload-resume-zone.module.scss';

interface UploadResumeZoneProps {
  activeDraftId: string | null;
}

export function UploadResumeZone({ activeDraftId }: UploadResumeZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleFile } = useUploadResume({ activeDraftId });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
      e.target.value = '';
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        style={{ display: 'none' }}
        onChange={handleChange}
        aria-label="Upload resume file"
      />
      <button
        type="button"
        className={s.btn}
        onClick={() => inputRef.current?.click()}
        title={
          activeDraftId
            ? 'Upload and import into current draft'
            : 'Upload — a new draft will be created'
        }
        aria-label="Upload resume"
      >
        <FileUploadOutlinedIcon sx={{ fontSize: 16 }} />
        <span className={s.label}>Upload resume</span>
      </button>
    </>
  );
}
