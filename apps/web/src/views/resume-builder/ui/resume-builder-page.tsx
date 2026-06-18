'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/icon/icon';
import { ResumeSidebar } from '@/widgets/resume-sidebar/ui/resume-sidebar';
import { ResumeEditor } from '@/widgets/resume-editor/ui/resume-editor';
import { UploadResumeZone } from '@/features/resume/upload-resume/ui/upload-resume-zone';
import s from './resume-builder-page.module.scss';

export function ResumeBuilderPage() {
  const [isPreview, setIsPreview] = useState(false);

  function handleDownloadPdf() {
    // TODO: implement real PDF export
    window.print();
  }

  function handleAiFill() {
    alert('AI-powered resume filling coming soon');
  }

  return (
    <div className={s.page}>
      <div className={s.topBar}>
        <div className={s.topBarLeft}>
          <h1 className={s.topBarTitle}>Resume Builder</h1>
        </div>
        <div className={s.topBarRight}>
          <UploadResumeZone />
          <button
            type="button"
            className={s.topBarBtn}
            onClick={handleDownloadPdf}
            aria-label="Download PDF"
          >
            <Icon name="download" size={16} strokeWidth={1.9} />
            Download PDF
          </button>
          <button
            type="button"
            className={isPreview ? s.topBarBtnActive : s.topBarBtn}
            onClick={() => setIsPreview((prev) => !prev)}
            aria-label="Toggle preview"
            aria-pressed={isPreview}
          >
            <Icon name="eye" size={16} strokeWidth={1.9} />
            Preview
          </button>
          <button
            type="button"
            className={s.topBarBtnAccent}
            onClick={handleAiFill}
            aria-label="AI Fill"
          >
            <Icon name="star" size={16} strokeWidth={1.9} />
            AI Fill
          </button>
        </div>
      </div>
      <div className={s.content}>
        <ResumeSidebar />
        <ResumeEditor isPreview={isPreview} />
      </div>
    </div>
  );
}
