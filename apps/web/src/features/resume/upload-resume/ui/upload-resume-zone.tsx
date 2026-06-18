'use client';

import { useRef } from 'react';
import { Icon } from '@/shared/ui/icon/icon';
import { useUploadResume } from '@/features/resume/upload-resume/model/use-upload-resume';
import s from './upload-resume-zone.module.scss';

export function UploadResumeZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleFile } = useUploadResume();

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
        aria-label="Upload resume"
      >
        <Icon name="upload" size={16} strokeWidth={1.9} />
        Upload resume
      </button>
    </>
  );
}
