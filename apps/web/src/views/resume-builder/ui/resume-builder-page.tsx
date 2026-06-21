'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/icon/icon';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { ResumeSidebar } from '@/widgets/resume-sidebar/ui/resume-sidebar';
import { ResumeEditor } from '@/widgets/resume-editor/ui/resume-editor';
import { UploadResumeZone } from '@/features/resume/upload-resume/ui/upload-resume-zone';
import s from './resume-builder-page.module.scss';

export function ResumeBuilderPage() {
  const activeDraftId = useResumeStore((st) => st.activeDraftId);
  const [isPreview, setIsPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleDownloadPdf() {
    // TODO: implement real PDF export
    window.print();
  }

  function handleAiFill() {
    // TODO: integrate with AI API
    alert('AI-powered resume filling coming soon');
  }

  return (
    <div className={s.page}>
      <div className={s.topBar}>
        <div className={s.topBarLeft}>
          <button
            type="button"
            className={s.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open drafts"
            aria-expanded={sidebarOpen}
          >
            <Icon name="menu" size={20} strokeWidth={1.9} />
          </button>
          <h1 className={s.topBarTitle}>Resume Builder</h1>
        </div>

        {activeDraftId ? (
          <div className={s.topBarRight}>
            <UploadResumeZone activeDraftId={activeDraftId} />
            <button
              type="button"
              className={s.topBarBtn}
              onClick={handleDownloadPdf}
              aria-label="Download PDF"
            >
              <Icon name="download" size={16} strokeWidth={1.9} />
              <span className={s.btnLabel}>Download PDF</span>
            </button>
            <button
              type="button"
              className={isPreview ? s.topBarBtnActive : s.topBarBtn}
              onClick={() => setIsPreview((prev) => !prev)}
              aria-label="Toggle preview"
              aria-pressed={isPreview}
            >
              <Icon name="eye" size={16} strokeWidth={1.9} />
              <span className={s.btnLabel}>Preview</span>
            </button>
            <button
              type="button"
              className={s.topBarBtnAccent}
              onClick={handleAiFill}
              aria-label="AI Fill"
            >
              <Icon name="star" size={16} strokeWidth={1.9} />
              <span className={s.btnLabel}>AI Fill</span>
            </button>
          </div>
        ) : (
          <p className={s.topBarHint}>Select or create a draft to start</p>
        )}
      </div>

      <div className={s.content}>
        <ResumeSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && (
          <div className={s.backdrop} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}
        <ResumeEditor isPreview={isPreview} />
      </div>
    </div>
  );
}
