'use client';

import { clsx } from 'clsx';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import type { TemplateId } from '@/entities/resume/model/types';
import s from './resume-editor.module.scss';

interface TemplateOption {
  id: TemplateId;
  label: string;
}

const TEMPLATES: TemplateOption[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
];

interface TemplatePickerProps {
  draftId: string;
  activeTemplate: TemplateId;
}

export function TemplatePicker({ draftId, activeTemplate }: TemplatePickerProps) {
  const setDraftTemplate = useResumeStore((state) => state.setDraftTemplate);

  return (
    <div className={s.templatePicker}>
      <span className={s.templatePickerLabel}>Template:</span>
      {TEMPLATES.map((tpl) => (
        <button
          key={tpl.id}
          type="button"
          className={clsx(s.templateCard, activeTemplate === tpl.id && s.templateCardActive)}
          onClick={() => setDraftTemplate(draftId, tpl.id)}
          aria-label={`Select ${tpl.label} template`}
          aria-pressed={activeTemplate === tpl.id}
        >
          <div className={clsx(s.templateThumbnail, s[`templateThumbnail_${tpl.id}`])}>
            <div className={s.templateThumbnailLine} style={{ width: '60%', height: 6 }} />
            <div className={s.templateThumbnailLine} style={{ width: '40%', height: 4 }} />
            <div className={s.templateThumbnailLine} style={{ width: '80%', height: 3 }} />
            <div className={s.templateThumbnailLine} style={{ width: '70%', height: 3 }} />
          </div>
          <span className={s.templateCardLabel}>{tpl.label}</span>
        </button>
      ))}
    </div>
  );
}
