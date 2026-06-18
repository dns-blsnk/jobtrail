'use client';

import {type ComponentType, useCallback} from 'react';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useFormik} from 'formik';
import {useTranslations} from 'next-intl';
import {useResumeStore} from '@/entities/resume/model/resume-store';
import {getValidationSchema} from '@/entities/resume/model/validation-schemas';
import type {BlockData, BlockType} from '@/entities/resume/model/types';

function FormFallback() {
  return (
      <Box sx={{display: 'flex', justifyContent: 'center', py: 6}}>
        <CircularProgress size={28}/>
      </Box>
  );
}

const loading = () => <FormFallback/>;

const BLOCK_FORMS = {
  header: dynamic(() => import('@/features/resume/edit-block/ui/forms/header-form').then((m) => m.HeaderForm), {loading}),
  summary: dynamic(() => import('@/features/resume/edit-block/ui/forms/summary-form').then((m) => m.SummaryForm), {loading}),
  experience: dynamic(() => import('@/features/resume/edit-block/ui/forms/experience-form').then((m) => m.ExperienceForm), {loading}),
  education: dynamic(() => import('@/features/resume/edit-block/ui/forms/education-form').then((m) => m.EducationForm), {loading}),
  skills: dynamic(() => import('@/features/resume/edit-block/ui/forms/skills-form').then((m) => m.SkillsForm), {loading}),
  projects: dynamic(() => import('@/features/resume/edit-block/ui/forms/projects-form').then((m) => m.ProjectsForm), {loading}),
  languages: dynamic(() => import('@/features/resume/edit-block/ui/forms/languages-form').then((m) => m.LanguagesForm), {loading}),
  certifications: dynamic(() => import('@/features/resume/edit-block/ui/forms/certifications-form').then((m) => m.CertificationsForm), {loading}),
  'social-links': dynamic(() => import('@/features/resume/edit-block/ui/forms/social-links-form').then((m) => m.SocialLinksForm), {loading}),
  awards: dynamic(() => import('@/features/resume/edit-block/ui/forms/awards-form').then((m) => m.AwardsForm), {loading}),
  custom: dynamic(() => import('@/features/resume/edit-block/ui/forms/custom-form').then((m) => m.CustomForm), {loading}),
} satisfies Record<BlockType, unknown>;


interface EditBlockModalProps {
  open: boolean;
  blockId: string | null;
  isNew: boolean;
  onClose: () => void;
}

export function EditBlockModal({ open, blockId, isNew, onClose }: EditBlockModalProps) {
  const t = useTranslations('resumeBuilderPage.editBlockTitles');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { drafts, activeDraftId, updateBlock, removeBlock } = useResumeStore();

  const activeDraft = drafts.find((d) => d.id === activeDraftId) ?? null;
  const block = activeDraft?.blocks.find((b) => b.id === blockId) ?? null;

  const handleClose = useCallback(() => {
    if (isNew && blockId) removeBlock(blockId);
    onClose();
  }, [isNew, blockId, removeBlock, onClose]);

  const formik = useFormik<BlockData>({
    initialValues: block?.blockData ?? { type: 'summary', data: { text: '' } },
    enableReinitialize: true,
    validationSchema: block ? getValidationSchema(block.blockData.type) : undefined,
    onSubmit: (values) => {
      if (blockId) updateBlock(blockId, values);
      onClose();
    },
  });

  if (!block) return null;

  const blockType = block.blockData.type;
  const ActiveForm = BLOCK_FORMS[blockType] as ComponentType<{ formik: typeof formik }>;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      aria-labelledby="edit-block-title"
    >
      <DialogTitle id="edit-block-title">{t(blockType)}</DialogTitle>
      <DialogContent dividers>
        <form id="edit-block-form" onSubmit={formik.handleSubmit} noValidate>
          <ActiveForm formik={formik}/>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancel</Button>
        <Button type="submit" form="edit-block-form" variant="contained" disabled={formik.isSubmitting}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
