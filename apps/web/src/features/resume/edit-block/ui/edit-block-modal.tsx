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
import Skeleton from '@mui/material/Skeleton';
import {useFormik} from 'formik';
import {useTranslations} from 'next-intl';
import {useResumeStore} from '@/entities/resume/model/resume-store';
import {getValidationSchema} from '@/entities/resume/model/validation-schemas';
import type {BlockData, BlockType} from '@/entities/resume/model/types';
import {HeaderFormSkeleton}       from '@/features/resume/edit-block/ui/forms/skeletons/header-form-skeleton';
import {SummaryFormSkeleton}      from '@/features/resume/edit-block/ui/forms/skeletons/summary-form-skeleton';
import {ExperienceFormSkeleton}   from '@/features/resume/edit-block/ui/forms/skeletons/experience-form-skeleton';
import {EducationFormSkeleton}    from '@/features/resume/edit-block/ui/forms/skeletons/education-form-skeleton';
import {SkillsFormSkeleton}       from '@/features/resume/edit-block/ui/forms/skeletons/skills-form-skeleton';
import {ProjectsFormSkeleton}     from '@/features/resume/edit-block/ui/forms/skeletons/projects-form-skeleton';
import {LanguagesFormSkeleton}    from '@/features/resume/edit-block/ui/forms/skeletons/languages-form-skeleton';
import {CertificationsFormSkeleton} from '@/features/resume/edit-block/ui/forms/skeletons/certifications-form-skeleton';
import {SocialLinksFormSkeleton}  from '@/features/resume/edit-block/ui/forms/skeletons/social-links-form-skeleton';
import {AwardsFormSkeleton}       from '@/features/resume/edit-block/ui/forms/skeletons/awards-form-skeleton';
import {CustomFormSkeleton}       from '@/features/resume/edit-block/ui/forms/skeletons/custom-form-skeleton';

function FormFallback() {
  return (
      <Box sx={{display: 'flex', justifyContent: 'center', py: 6}}>
        <CircularProgress size={28}/>
      </Box>
  );
}

const loading = () => <FormFallback/>;

const BLOCK_FORMS = {
  header:         dynamic(() => import('@/features/resume/edit-block/ui/forms/header-form').then((m) => m.HeaderForm), {loading}),
  summary:        dynamic(() => import('@/features/resume/edit-block/ui/forms/summary-form').then((m) => m.SummaryForm), {loading}),
  experience:     dynamic(() => import('@/features/resume/edit-block/ui/forms/experience-form').then((m) => m.ExperienceForm), {loading}),
  education:      dynamic(() => import('@/features/resume/edit-block/ui/forms/education-form').then((m) => m.EducationForm), {loading}),
  skills:         dynamic(() => import('@/features/resume/edit-block/ui/forms/skills-form').then((m) => m.SkillsForm), {loading}),
  projects:       dynamic(() => import('@/features/resume/edit-block/ui/forms/projects-form').then((m) => m.ProjectsForm), {loading}),
  languages:      dynamic(() => import('@/features/resume/edit-block/ui/forms/languages-form').then((m) => m.LanguagesForm), {loading}),
  certifications: dynamic(() => import('@/features/resume/edit-block/ui/forms/certifications-form').then((m) => m.CertificationsForm), {loading}),
  'social-links': dynamic(() => import('@/features/resume/edit-block/ui/forms/social-links-form').then((m) => m.SocialLinksForm), {loading}),
  awards:         dynamic(() => import('@/features/resume/edit-block/ui/forms/awards-form').then((m) => m.AwardsForm), {loading}),
  custom:         dynamic(() => import('@/features/resume/edit-block/ui/forms/custom-form').then((m) => m.CustomForm), {loading}),
} satisfies Record<BlockType, unknown>;

const BLOCK_SKELETONS: Record<BlockType, ComponentType> = {
  header:         HeaderFormSkeleton,
  summary:        SummaryFormSkeleton,
  experience:     ExperienceFormSkeleton,
  education:      EducationFormSkeleton,
  skills:         SkillsFormSkeleton,
  projects:       ProjectsFormSkeleton,
  languages:      LanguagesFormSkeleton,
  certifications: CertificationsFormSkeleton,
  'social-links': SocialLinksFormSkeleton,
  awards:         AwardsFormSkeleton,
  custom:         CustomFormSkeleton,
};

function getNewBlockFormValues(type: BlockType): BlockData {
  switch (type) {
    case 'header':
      return {
        type: 'header',
        data: { firstName: '', lastName: '', jobTitle: '', email: '', photoShape: 'circle', links: [] },
      };
    case 'summary':
      return { type: 'summary', data: { sectionTitle: '', text: '' } };
    case 'experience':
      return {
        type: 'experience',
        data: {
          items: [{
            id: crypto.randomUUID(),
            company: '', role: '', startDate: '', endDate: '',
            present: false, location: '', description: '',
          }],
        },
      };
    case 'education':
      return {
        type: 'education',
        data: {
          items: [{
            id: crypto.randomUUID(),
            institution: '', degree: '', field: '',
            startDate: '', endDate: '', gpa: '',
          }],
        },
      };
    case 'skills':
      return {
        type: 'skills',
        data: { groups: [{ id: crypto.randomUUID(), name: '', tags: [] }] },
      };
    case 'projects':
      return {
        type: 'projects',
        data: {
          items: [{
            id: crypto.randomUUID(),
            name: '', description: '', techStack: [],
            url: '', startDate: '', endDate: '',
          }],
        },
      };
    case 'languages':
      return {
        type: 'languages',
        data: { items: [{ id: crypto.randomUUID(), language: '', level: 'B2' }] },
      };
    case 'certifications':
      return {
        type: 'certifications',
        data: {
          items: [{
            id: crypto.randomUUID(),
            name: '', issuer: '', issueDate: '', expiryDate: '', url: '',
          }],
        },
      };
    case 'social-links':
      return {
        type: 'social-links',
        data: { items: [{ id: crypto.randomUUID(), platform: 'LinkedIn', url: '' }] },
      };
    case 'awards':
      return {
        type: 'awards',
        data: { items: [{ id: crypto.randomUUID(), title: '', date: '', description: '' }] },
      };
    case 'custom':
      return { type: 'custom', data: { sectionTitle: '', content: '' } };
  }
}

interface EditBlockModalProps {
  open: boolean;
  blockId: string | null;
  pendingBlockType?: BlockType | null;
  isNew: boolean;
  onClose: () => void;
}

export function EditBlockModal({ open, blockId, pendingBlockType, isNew, onClose }: EditBlockModalProps) {
  const t = useTranslations('resumeBuilderPage.editBlockTitles');
  const tBlock = useTranslations('resumeBuilderPage.editBlock');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { drafts, activeDraftId, updateBlock, removeBlock, addBlockWithData } = useResumeStore();
  const isLoading = false;

  const activeDraft = drafts.find((d) => d.id === activeDraftId) ?? null;

  const existingBlock = blockId
    ? (activeDraft?.blocks.find((b) => b.id === blockId) ?? null)
    : null;

  const blockType: BlockType | null =
    existingBlock?.blockData.type ?? pendingBlockType ?? null;

  const initialValues: BlockData =
    existingBlock?.blockData ??
    (pendingBlockType ? getNewBlockFormValues(pendingBlockType) : { type: 'summary', data: { sectionTitle: '', text: '' } });

  const handleClose = useCallback(() => {
    if (isNew && blockId) removeBlock(blockId);
    onClose();
  }, [isNew, blockId, removeBlock, onClose]);

  const formik = useFormik<BlockData>({
    initialValues,
    validationSchema: blockType ? getValidationSchema(blockType) : undefined,
    onSubmit: (values) => {
      if (isNew && !blockId) {
        addBlockWithData(values);
      } else if (blockId) {
        updateBlock(blockId, values);
      }
      onClose();
    },
  });

  if (!blockType) return null;

  if (isLoading) {
    const ActiveSkeleton = BLOCK_SKELETONS[blockType];
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
          <ActiveSkeleton />
        </DialogContent>
        <DialogActions>
          <Skeleton variant="rectangular" width={80} height={36} animation="wave" sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rectangular" width={80} height={36} animation="wave" sx={{ borderRadius: '6px' }} />
        </DialogActions>
      </Dialog>
    );
  }

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
        <Button onClick={handleClose} color="inherit">{tBlock('cancel')}</Button>
        <Button type="submit" form="edit-block-form" variant="contained" disabled={formik.isSubmitting}>
          {isNew ? tBlock('apply') : tBlock('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
