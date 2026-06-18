'use client';

import { useCallback, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { getValidationSchema } from '@/entities/resume/model/validation-schemas';
import { Icon } from '@/shared/ui/icon/icon';
import type {
  BlockData,
  BlockType,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  LanguageItem,
  CertificationItem,
  SocialLinkItem,
  AwardItem,
  SkillsData,
} from '@/entities/resume/model/types';

interface EditBlockModalProps {
  open: boolean;
  blockId: string | null;
  isNew: boolean;
  onClose: () => void;
}

function getModalTitle(type: BlockType): string {
  const titles: Record<BlockType, string> = {
    header: 'Edit Header',
    summary: 'Edit Profile',
    experience: 'Edit Experience',
    education: 'Edit Education',
    skills: 'Edit Skills',
    projects: 'Edit Projects',
    languages: 'Edit Languages',
    certifications: 'Edit Certifications',
    'social-links': 'Edit Social Links',
    awards: 'Edit Awards',
    custom: 'Edit Custom Section',
  };
  return titles[type];
}

function getInitialValues(blockData: BlockData): BlockData {
  return blockData;
}

export function EditBlockModal({ open, blockId, isNew, onClose }: EditBlockModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { drafts, activeDraftId, updateBlock, removeBlock } = useResumeStore();

  const activeDraft = drafts.find((d) => d.id === activeDraftId) ?? null;
  const block = activeDraft?.blocks.find((b) => b.id === blockId) ?? null;

  const handleClose = useCallback(() => {
    if (isNew && blockId) {
      removeBlock(blockId);
    }
    onClose();
  }, [isNew, blockId, removeBlock, onClose]);

  const formik = useFormik<BlockData>({
    initialValues: block?.blockData ?? { type: 'summary', data: { text: '' } },
    enableReinitialize: true,
    validationSchema: block ? getValidationSchema(block.blockData.type) : undefined,
    onSubmit: (values) => {
      if (blockId) {
        updateBlock(blockId, values);
      }
      onClose();
    },
  });

  if (!block) return null;

  const blockType = block.blockData.type;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      aria-labelledby="edit-block-title"
    >
      <DialogTitle id="edit-block-title">{getModalTitle(blockType)}</DialogTitle>
      <DialogContent dividers>
        <form id="edit-block-form" onSubmit={formik.handleSubmit} noValidate>
          {blockType === 'header' && formik.values.type === 'header' && (
            <HeaderForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'header' }>>>} />
          )}
          {blockType === 'summary' && formik.values.type === 'summary' && (
            <SummaryForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'summary' }>>>} />
          )}
          {blockType === 'experience' && formik.values.type === 'experience' && (
            <ExperienceForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'experience' }>>>} />
          )}
          {blockType === 'education' && formik.values.type === 'education' && (
            <EducationForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'education' }>>>} />
          )}
          {blockType === 'skills' && formik.values.type === 'skills' && (
            <SkillsForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'skills' }>>>} />
          )}
          {blockType === 'projects' && formik.values.type === 'projects' && (
            <ProjectsForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'projects' }>>>} />
          )}
          {blockType === 'languages' && formik.values.type === 'languages' && (
            <LanguagesForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'languages' }>>>} />
          )}
          {blockType === 'certifications' && formik.values.type === 'certifications' && (
            <CertificationsForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'certifications' }>>>} />
          )}
          {blockType === 'social-links' && formik.values.type === 'social-links' && (
            <SocialLinksForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'social-links' }>>>} />
          )}
          {blockType === 'awards' && formik.values.type === 'awards' && (
            <AwardsForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'awards' }>>>} />
          )}
          {blockType === 'custom' && formik.values.type === 'custom' && (
            <CustomForm formik={formik as ReturnType<typeof useFormik<Extract<BlockData, { type: 'custom' }>>>} />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancel</Button>
        <Button type="submit" form="edit-block-form" variant="contained" disabled={formik.isSubmitting}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

// ---- Sub-forms ----

type HeaderFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'header' }>>>;
type SummaryFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'summary' }>>>;
type ExperienceFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'experience' }>>>;
type EducationFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'education' }>>>;
type SkillsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'skills' }>>>;
type ProjectsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'projects' }>>>;
type LanguagesFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'languages' }>>>;
type CertificationsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'certifications' }>>>;
type SocialLinksFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'social-links' }>>>;
type AwardsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'awards' }>>>;
type CustomFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'custom' }>>>;

function row(children: React.ReactNode) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', '& > *': { flex: '1 1 200px' } }}>
      {children}
    </Box>
  );
}

function HeaderForm({ formik }: { formik: HeaderFormik }) {
  const { values, handleChange, handleBlur, setFieldValue } = formik;
  const photoInputRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      void setFieldValue('data.photoUrl', evt.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const shape = values.data.photoShape ?? 'circle';
  const shapePreview: Record<typeof shape, { borderRadius: string; width: number; height: number }> = {
    circle:   { borderRadius: '50%',  width: 80, height: 80  },
    square:   { borderRadius: '12px', width: 80, height: 80  },
    portrait: { borderRadius: '8px',  width: 60, height: 84  },
  };
  const shapeOptions: Array<{ value: typeof shape; label: string }> = [
    { value: 'circle',   label: 'Circle'   },
    { value: 'square',   label: 'Square'   },
    { value: 'portrait', label: 'Portrait' },
  ];

  const links = values.data.links ?? [];
  const platforms: SocialLinkItem['platform'][] = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter', 'Other'];

  function addLink() {
    void setFieldValue('data.links', [
      ...links,
      { id: crypto.randomUUID(), platform: 'LinkedIn', url: '' } satisfies SocialLinkItem,
    ]);
  }

  function removeLink(index: number) {
    void setFieldValue('data.links', links.filter((_, i) => i !== index));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      {/* Photo upload */}
      <Box>
        <InputLabel sx={{ mb: 1.5, fontSize: 13 }}>Profile Photo</InputLabel>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            onClick={() => !values.data.photoUrl && photoInputRef.current?.click()}
            sx={{
              width:        shapePreview[shape].width,
              height:       shapePreview[shape].height,
              borderRadius: shapePreview[shape].borderRadius,
              border: '2px dashed',
              borderColor: values.data.photoUrl ? 'var(--border)' : 'var(--border-2)',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--surface-2)',
              cursor: values.data.photoUrl ? 'default' : 'pointer',
              transition: 'border-color 0.15s ease, border-radius 0.15s ease, width 0.15s ease, height 0.15s ease',
              '&:hover': values.data.photoUrl ? {} : { borderColor: 'var(--accent)' },
            }}
          >
            {values.data.photoUrl ? (
              <Box
                component="img"
                src={values.data.photoUrl}
                alt="Profile"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Icon name="user" size={28} strokeWidth={1.5} style={{ color: 'var(--ink-3)' }} />
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => photoInputRef.current?.click()}
              startIcon={<Icon name="upload" size={14} strokeWidth={1.9} />}
              sx={{ fontSize: 12, textTransform: 'none' }}
            >
              {values.data.photoUrl ? 'Change photo' : 'Upload photo'}
            </Button>
            {values.data.photoUrl && (
              <Button
                variant="text"
                size="small"
                color="error"
                onClick={() => void setFieldValue('data.photoUrl', undefined)}
                startIcon={<Icon name="trash" size={14} strokeWidth={1.9} />}
                sx={{ fontSize: 12, textTransform: 'none' }}
              >
                Remove photo
              </Button>
            )}
          </Box>
        </Box>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      </Box>

      {/* Photo shape */}
      <Box>
        <InputLabel sx={{ mb: 1, fontSize: 13 }}>Photo shape</InputLabel>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {shapeOptions.map(({ value, label }) => (
            <Button
              key={value}
              variant={shape === value ? 'contained' : 'outlined'}
              size="small"
              onClick={() => void setFieldValue('data.photoShape', value)}
              sx={{ fontSize: 12, textTransform: 'none', flex: 1 }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Name */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="First Name" size="small" name="data.firstName" sx={{ flex: 1 }}
          value={values.data.firstName} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.firstName') && !!getIn(formik.errors, 'data.firstName')}
          helperText={(getIn(formik.touched, 'data.firstName') && getIn(formik.errors, 'data.firstName')) || ' '}
        />
        <TextField
          label="Last Name" size="small" name="data.lastName" sx={{ flex: 1 }}
          value={values.data.lastName} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.lastName') && !!getIn(formik.errors, 'data.lastName')}
          helperText={(getIn(formik.touched, 'data.lastName') && getIn(formik.errors, 'data.lastName')) || ' '}
        />
      </Box>

      {/* Job title */}
      <TextField
        fullWidth label="Job Title" size="small" name="data.jobTitle"
        value={values.data.jobTitle} onChange={handleChange} onBlur={handleBlur}
        error={!!getIn(formik.touched, 'data.jobTitle') && !!getIn(formik.errors, 'data.jobTitle')}
        helperText={(getIn(formik.touched, 'data.jobTitle') && getIn(formik.errors, 'data.jobTitle')) || ' '}
      />

      {/* Email + Phone (optional) */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Email" size="small" type="email" name="data.email" sx={{ flex: 1 }}
          value={values.data.email} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.email') && !!getIn(formik.errors, 'data.email')}
          helperText={(getIn(formik.touched, 'data.email') && getIn(formik.errors, 'data.email')) || ' '}
        />
        <TextField
          label="Phone (optional)" size="small" name="data.phone" sx={{ flex: 1 }}
          value={values.data.phone ?? ''}
          onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.phone') && !!getIn(formik.errors, 'data.phone')}
          helperText={(getIn(formik.touched, 'data.phone') && getIn(formik.errors, 'data.phone')) || ' '}
        />
      </Box>

      {/* Location (optional) + Website (optional) */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Location (optional)" size="small" name="data.location" sx={{ flex: 1 }}
          value={values.data.location ?? ''} onChange={handleChange} onBlur={handleBlur}
          helperText=" "
        />
        <TextField
          label="Website (optional)" size="small" name="data.website" sx={{ flex: 1 }}
          value={values.data.website ?? ''} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.website') && !!getIn(formik.errors, 'data.website')}
          helperText={(getIn(formik.touched, 'data.website') && getIn(formik.errors, 'data.website')) || ' '}
        />
      </Box>

      {/* Social links */}
      <Box>
        <InputLabel sx={{ mb: 1.5, fontSize: 13 }}>Social Links</InputLabel>
        {links.map((link, index) => (
          <Box key={link.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1 }}>
            <FormControl size="small" sx={{ minWidth: 140, flexShrink: 0 }}>
              <InputLabel>Platform</InputLabel>
              <Select
                label="Platform"
                value={link.platform}
                onChange={(e) => void setFieldValue(`data.links[${index}].platform`, e.target.value)}
              >
                {platforms.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="URL"
              size="small"
              sx={{ flex: 1 }}
              value={link.url}
              onChange={(e) => void setFieldValue(`data.links[${index}].url`, e.target.value)}
              onBlur={() => void formik.setFieldTouched(`data.links[${index}].url`, true)}
              error={
                getIn(formik.touched, `data.links[${index}].url`) &&
                Boolean(getIn(formik.errors, `data.links[${index}].url`))
              }
              helperText={
                (getIn(formik.touched, `data.links[${index}].url`) &&
                getIn(formik.errors, `data.links[${index}].url`)) || ' '
              }
            />
            <IconButton
              onClick={() => removeLink(index)}
              aria-label="Remove link"
            >
              <Icon name="trash" size={14} strokeWidth={1.9} />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<Icon name="plus" size={14} strokeWidth={1.9} />}
          onClick={addLink}
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Add link
        </Button>
      </Box>

    </Box>
  );
}

function SummaryForm({ formik }: { formik: SummaryFormik }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Section title (optional)"
        size="small"
        name="data.sectionTitle"
        placeholder="Profile"
        value={formik.values.data.sectionTitle ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        fullWidth
        multiline
        rows={6}
        label="Content"
        name="data.text"
        value={formik.values.data.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!getIn(formik.touched, 'data.text') && !!getIn(formik.errors, 'data.text')}
        helperText={getIn(formik.touched, 'data.text') && getIn(formik.errors, 'data.text')}
      />
    </Box>
  );
}

function ExperienceForm({ formik }: { formik: ExperienceFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: ExperienceItem = {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      present: false,
      location: '',
      description: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...values.data.items];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    void setFieldValue('data.items', arr);
  }

  function moveDown(index: number) {
    if (index === values.data.items.length - 1) return;
    const arr = [...values.data.items];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    void setFieldValue('data.items', arr);
  }

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>{item.role || item.company || `Position ${index + 1}`}</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => moveUp(index)} disabled={index === 0} aria-label="Move up">
                <Icon name="moveUp" size={14} />
              </IconButton>
              <IconButton onClick={() => moveDown(index)} disabled={index === values.data.items.length - 1} aria-label="Move down">
                <Icon name="moveDown" size={14} />
              </IconButton>
              <IconButton onClick={() => removeItem(index)} aria-label="Remove position">
                <Icon name="trash" size={14} />
              </IconButton>
            </Box>
          </Box>
          {row(
            <>
              <TextField
                label="Company" size="small" value={item.company}
                onChange={(e) => void setFieldValue(`data.items[${index}].company`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].company`, true)}
                error={getIn(formik.touched, `data.items[${index}].company`) && Boolean(getIn(formik.errors, `data.items[${index}].company`))}
                helperText={getIn(formik.touched, `data.items[${index}].company`) && getIn(formik.errors, `data.items[${index}].company`)}
              />
              <TextField
                label="Role" size="small" value={item.role}
                onChange={(e) => void setFieldValue(`data.items[${index}].role`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].role`, true)}
                error={getIn(formik.touched, `data.items[${index}].role`) && Boolean(getIn(formik.errors, `data.items[${index}].role`))}
                helperText={getIn(formik.touched, `data.items[${index}].role`) && getIn(formik.errors, `data.items[${index}].role`)}
              />
            </>
          )}
          {row(
            <>
              <TextField
                label="Start Date" size="small" placeholder="Jan 2022" value={item.startDate}
                onChange={(e) => void setFieldValue(`data.items[${index}].startDate`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].startDate`, true)}
                error={getIn(formik.touched, `data.items[${index}].startDate`) && Boolean(getIn(formik.errors, `data.items[${index}].startDate`))}
                helperText={getIn(formik.touched, `data.items[${index}].startDate`) && getIn(formik.errors, `data.items[${index}].startDate`)}
              />
              <TextField
                label="End Date" size="small" placeholder="Dec 2023" value={item.endDate}
                disabled={item.present}
                onChange={(e) => void setFieldValue(`data.items[${index}].endDate`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].endDate`, true)}
                error={getIn(formik.touched, `data.items[${index}].endDate`) && Boolean(getIn(formik.errors, `data.items[${index}].endDate`))}
                helperText={getIn(formik.touched, `data.items[${index}].endDate`) && getIn(formik.errors, `data.items[${index}].endDate`)}
              />
            </>
          )}
          {row(
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.present}
                    onChange={(e) => {
                      void setFieldValue(`data.items[${index}].present`, e.target.checked);
                      if (e.target.checked) void setFieldValue(`data.items[${index}].endDate`, '');
                    }}
                    size="small"
                  />
                }
                label="Present"
              />
              <TextField label="Location" size="small" value={item.location} onChange={(e) => void setFieldValue(`data.items[${index}].location`, e.target.value)} />
            </>
          )}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={item.description}
            onChange={(e) => void setFieldValue(`data.items[${index}].description`, e.target.value)}
          />
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add position
      </Button>
    </Box>
  );
}

function EducationForm({ formik }: { formik: EducationFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: EducationItem = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...values.data.items];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    void setFieldValue('data.items', arr);
  }

  function moveDown(index: number) {
    if (index === values.data.items.length - 1) return;
    const arr = [...values.data.items];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    void setFieldValue('data.items', arr);
  }

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>{item.institution || `Institution ${index + 1}`}</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => moveUp(index)} disabled={index === 0} aria-label="Move up">
                <Icon name="moveUp" size={14} />
              </IconButton>
              <IconButton onClick={() => moveDown(index)} disabled={index === values.data.items.length - 1} aria-label="Move down">
                <Icon name="moveDown" size={14} />
              </IconButton>
              <IconButton onClick={() => removeItem(index)} aria-label="Remove">
                <Icon name="trash" size={14} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth label="Institution" size="small" value={item.institution}
              onChange={(e) => void setFieldValue(`data.items[${index}].institution`, e.target.value)}
              onBlur={() => void formik.setFieldTouched(`data.items[${index}].institution`, true)}
              error={getIn(formik.touched, `data.items[${index}].institution`) && Boolean(getIn(formik.errors, `data.items[${index}].institution`))}
              helperText={getIn(formik.touched, `data.items[${index}].institution`) && getIn(formik.errors, `data.items[${index}].institution`)}
            />
          </Box>
          {row(
            <>
              <TextField
                label="Degree" size="small" value={item.degree}
                onChange={(e) => void setFieldValue(`data.items[${index}].degree`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].degree`, true)}
                error={getIn(formik.touched, `data.items[${index}].degree`) && Boolean(getIn(formik.errors, `data.items[${index}].degree`))}
                helperText={getIn(formik.touched, `data.items[${index}].degree`) && getIn(formik.errors, `data.items[${index}].degree`)}
              />
              <TextField
                label="Field of Study" size="small" value={item.field}
                onChange={(e) => void setFieldValue(`data.items[${index}].field`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].field`, true)}
                error={getIn(formik.touched, `data.items[${index}].field`) && Boolean(getIn(formik.errors, `data.items[${index}].field`))}
                helperText={getIn(formik.touched, `data.items[${index}].field`) && getIn(formik.errors, `data.items[${index}].field`)}
              />
            </>
          )}
          {row(
            <>
              <TextField
                label="Start Date" size="small" placeholder="Sep 2018" value={item.startDate}
                onChange={(e) => void setFieldValue(`data.items[${index}].startDate`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].startDate`, true)}
                error={getIn(formik.touched, `data.items[${index}].startDate`) && Boolean(getIn(formik.errors, `data.items[${index}].startDate`))}
                helperText={getIn(formik.touched, `data.items[${index}].startDate`) && getIn(formik.errors, `data.items[${index}].startDate`)}
              />
              <TextField label="End Date" size="small" placeholder="Jun 2022" value={item.endDate} onChange={(e) => void setFieldValue(`data.items[${index}].endDate`, e.target.value)} />
              <TextField label="GPA" size="small" value={item.gpa ?? ''} onChange={(e) => void setFieldValue(`data.items[${index}].gpa`, e.target.value)} />
            </>
          )}
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add education
      </Button>
    </Box>
  );
}

function SkillsForm({ formik }: { formik: SkillsFormik }) {
  const { values, setFieldValue } = formik;

  function addGroup() {
    const newGroup: SkillsData['groups'][number] = {
      id: crypto.randomUUID(),
      name: '',
      tags: [],
    };
    void setFieldValue('data.groups', [...values.data.groups, newGroup]);
  }

  function removeGroup(index: number) {
    void setFieldValue('data.groups', values.data.groups.filter((_, i) => i !== index));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      const tag = input.value.trim();
      if (!tag) return;
      const current = values.data.groups[index].tags;
      if (!current.includes(tag)) {
        void setFieldValue(`data.groups[${index}].tags`, [...current, tag]);
      }
      input.value = '';
    }
  }

  function removeTag(groupIndex: number, tag: string) {
    const current = values.data.groups[groupIndex].tags;
    void setFieldValue(`data.groups[${groupIndex}].tags`, current.filter((t) => t !== tag));
  }

  return (
    <Box>
      {values.data.groups.map((group, index) => (
        <Box key={group.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <TextField
              label="Group name"
              size="small"
              value={group.name}
              onChange={(e) => void setFieldValue(`data.groups[${index}].name`, e.target.value)}
              onBlur={() => void formik.setFieldTouched(`data.groups[${index}].name`, true)}
              error={getIn(formik.touched, `data.groups[${index}].name`) && Boolean(getIn(formik.errors, `data.groups[${index}].name`))}
              helperText={getIn(formik.touched, `data.groups[${index}].name`) && getIn(formik.errors, `data.groups[${index}].name`)}
              sx={{ flex: 1 }}
            />
            <IconButton onClick={() => removeGroup(index)} aria-label="Remove group">
              <Icon name="trash" size={14} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {group.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" onDelete={() => removeTag(index, tag)} />
            ))}
          </Box>
          <TextField
            size="small"
            placeholder="Type skill and press Enter"
            onKeyDown={(e) => handleTagKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
            fullWidth
            error={getIn(formik.touched, `data.groups[${index}].tags`) && Boolean(getIn(formik.errors, `data.groups[${index}].tags`))}
            helperText={getIn(formik.touched, `data.groups[${index}].tags`) && getIn(formik.errors, `data.groups[${index}].tags`)}
          />
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addGroup} variant="outlined" size="small">
        Add group
      </Button>
    </Box>
  );
}

function ProjectsForm({ formik }: { formik: ProjectsFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: ProjectItem = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      techStack: [],
      url: '',
      startDate: '',
      endDate: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...values.data.items];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    void setFieldValue('data.items', arr);
  }

  function moveDown(index: number) {
    if (index === values.data.items.length - 1) return;
    const arr = [...values.data.items];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    void setFieldValue('data.items', arr);
  }

  function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      const tag = input.value.trim();
      if (!tag) return;
      const current = values.data.items[index].techStack;
      if (!current.includes(tag)) {
        void setFieldValue(`data.items[${index}].techStack`, [...current, tag]);
      }
      input.value = '';
    }
  }

  function removeTech(itemIndex: number, tag: string) {
    const current = values.data.items[itemIndex].techStack;
    void setFieldValue(`data.items[${itemIndex}].techStack`, current.filter((t) => t !== tag));
  }

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>{item.name || `Project ${index + 1}`}</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => moveUp(index)} disabled={index === 0} aria-label="Move up">
                <Icon name="moveUp" size={14} />
              </IconButton>
              <IconButton onClick={() => moveDown(index)} disabled={index === values.data.items.length - 1} aria-label="Move down">
                <Icon name="moveDown" size={14} />
              </IconButton>
              <IconButton onClick={() => removeItem(index)} aria-label="Remove">
                <Icon name="trash" size={14} />
              </IconButton>
            </Box>
          </Box>
          {row(
            <>
              <TextField
                label="Project Name" size="small" value={item.name}
                onChange={(e) => void setFieldValue(`data.items[${index}].name`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].name`, true)}
                error={getIn(formik.touched, `data.items[${index}].name`) && Boolean(getIn(formik.errors, `data.items[${index}].name`))}
                helperText={getIn(formik.touched, `data.items[${index}].name`) && getIn(formik.errors, `data.items[${index}].name`)}
              />
              <TextField
                label="URL" size="small" value={item.url ?? ''}
                onChange={(e) => void setFieldValue(`data.items[${index}].url`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].url`, true)}
                error={getIn(formik.touched, `data.items[${index}].url`) && Boolean(getIn(formik.errors, `data.items[${index}].url`))}
                helperText={getIn(formik.touched, `data.items[${index}].url`) && getIn(formik.errors, `data.items[${index}].url`)}
              />
            </>
          )}
          {row(
            <>
              <TextField label="Start Date" size="small" value={item.startDate} onChange={(e) => void setFieldValue(`data.items[${index}].startDate`, e.target.value)} />
              <TextField label="End Date" size="small" value={item.endDate} onChange={(e) => void setFieldValue(`data.items[${index}].endDate`, e.target.value)} />
            </>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {item.techStack.map((tag) => (
              <Chip key={tag} label={tag} size="small" onDelete={() => removeTech(index, tag)} />
            ))}
          </Box>
          <TextField
            size="small"
            placeholder="Add tech (Enter)"
            onKeyDown={(e) => handleTechKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={item.description}
            onChange={(e) => void setFieldValue(`data.items[${index}].description`, e.target.value)}
          />
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add project
      </Button>
    </Box>
  );
}

function LanguagesForm({ formik }: { formik: LanguagesFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: LanguageItem = {
      id: crypto.randomUUID(),
      language: '',
      level: 'B2',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  const levels: LanguageItem['level'][] = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            label="Language"
            size="small"
            sx={{ flex: 1 }}
            value={item.language}
            onChange={(e) => void setFieldValue(`data.items[${index}].language`, e.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Level</InputLabel>
            <Select
              label="Level"
              value={item.level}
              onChange={(e) => void setFieldValue(`data.items[${index}].level`, e.target.value)}
            >
              {levels.map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => removeItem(index)} aria-label="Remove">
            <Icon name="trash" size={14} />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add language
      </Button>
    </Box>
  );
}

function CertificationsForm({ formik }: { formik: CertificationsFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: CertificationItem = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      url: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...values.data.items];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    void setFieldValue('data.items', arr);
  }

  function moveDown(index: number) {
    if (index === values.data.items.length - 1) return;
    const arr = [...values.data.items];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    void setFieldValue('data.items', arr);
  }

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>{item.name || `Certification ${index + 1}`}</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => moveUp(index)} disabled={index === 0} aria-label="Move up">
                <Icon name="moveUp" size={14} />
              </IconButton>
              <IconButton onClick={() => moveDown(index)} disabled={index === values.data.items.length - 1} aria-label="Move down">
                <Icon name="moveDown" size={14} />
              </IconButton>
              <IconButton onClick={() => removeItem(index)} aria-label="Remove">
                <Icon name="trash" size={14} />
              </IconButton>
            </Box>
          </Box>
          {row(
            <>
              <TextField
                label="Name" size="small" value={item.name}
                onChange={(e) => void setFieldValue(`data.items[${index}].name`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].name`, true)}
                error={getIn(formik.touched, `data.items[${index}].name`) && Boolean(getIn(formik.errors, `data.items[${index}].name`))}
                helperText={getIn(formik.touched, `data.items[${index}].name`) && getIn(formik.errors, `data.items[${index}].name`)}
              />
              <TextField
                label="Issuer" size="small" value={item.issuer}
                onChange={(e) => void setFieldValue(`data.items[${index}].issuer`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].issuer`, true)}
                error={getIn(formik.touched, `data.items[${index}].issuer`) && Boolean(getIn(formik.errors, `data.items[${index}].issuer`))}
                helperText={getIn(formik.touched, `data.items[${index}].issuer`) && getIn(formik.errors, `data.items[${index}].issuer`)}
              />
            </>
          )}
          {row(
            <>
              <TextField
                label="Issue Date" size="small" value={item.issueDate}
                onChange={(e) => void setFieldValue(`data.items[${index}].issueDate`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].issueDate`, true)}
                error={getIn(formik.touched, `data.items[${index}].issueDate`) && Boolean(getIn(formik.errors, `data.items[${index}].issueDate`))}
                helperText={getIn(formik.touched, `data.items[${index}].issueDate`) && getIn(formik.errors, `data.items[${index}].issueDate`)}
              />
              <TextField label="Expiry Date" size="small" value={item.expiryDate ?? ''} onChange={(e) => void setFieldValue(`data.items[${index}].expiryDate`, e.target.value)} />
              <TextField
                label="URL" size="small" value={item.url ?? ''}
                onChange={(e) => void setFieldValue(`data.items[${index}].url`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].url`, true)}
                error={getIn(formik.touched, `data.items[${index}].url`) && Boolean(getIn(formik.errors, `data.items[${index}].url`))}
                helperText={getIn(formik.touched, `data.items[${index}].url`) && getIn(formik.errors, `data.items[${index}].url`)}
              />
            </>
          )}
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add certification
      </Button>
    </Box>
  );
}

function SocialLinksForm({ formik }: { formik: SocialLinksFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: SocialLinkItem = {
      id: crypto.randomUUID(),
      platform: 'LinkedIn',
      url: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  const platforms: SocialLinkItem['platform'][] = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter', 'Other'];

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Platform</InputLabel>
            <Select
              label="Platform"
              value={item.platform}
              onChange={(e) => void setFieldValue(`data.items[${index}].platform`, e.target.value)}
            >
              {platforms.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="URL"
            size="small"
            sx={{ flex: 1 }}
            value={item.url}
            onChange={(e) => void setFieldValue(`data.items[${index}].url`, e.target.value)}
            onBlur={() => void formik.setFieldTouched(`data.items[${index}].url`, true)}
            error={getIn(formik.touched, `data.items[${index}].url`) && Boolean(getIn(formik.errors, `data.items[${index}].url`))}
            helperText={getIn(formik.touched, `data.items[${index}].url`) && getIn(formik.errors, `data.items[${index}].url`)}
          />
          <IconButton onClick={() => removeItem(index)} aria-label="Remove">
            <Icon name="trash" size={14} />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add link
      </Button>
    </Box>
  );
}

function AwardsForm({ formik }: { formik: AwardsFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: AwardItem = {
      id: crypto.randomUUID(),
      title: '',
      date: '',
      description: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...values.data.items];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    void setFieldValue('data.items', arr);
  }

  function moveDown(index: number) {
    if (index === values.data.items.length - 1) return;
    const arr = [...values.data.items];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    void setFieldValue('data.items', arr);
  }

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>{item.title || `Award ${index + 1}`}</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => moveUp(index)} disabled={index === 0} aria-label="Move up">
                <Icon name="moveUp" size={14} />
              </IconButton>
              <IconButton onClick={() => moveDown(index)} disabled={index === values.data.items.length - 1} aria-label="Move down">
                <Icon name="moveDown" size={14} />
              </IconButton>
              <IconButton onClick={() => removeItem(index)} aria-label="Remove">
                <Icon name="trash" size={14} />
              </IconButton>
            </Box>
          </Box>
          {row(
            <>
              <TextField
                label="Title" size="small" value={item.title}
                onChange={(e) => void setFieldValue(`data.items[${index}].title`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].title`, true)}
                error={getIn(formik.touched, `data.items[${index}].title`) && Boolean(getIn(formik.errors, `data.items[${index}].title`))}
                helperText={getIn(formik.touched, `data.items[${index}].title`) && getIn(formik.errors, `data.items[${index}].title`)}
              />
              <TextField label="Date" size="small" value={item.date} onChange={(e) => void setFieldValue(`data.items[${index}].date`, e.target.value)} />
            </>
          )}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={item.description}
            onChange={(e) => void setFieldValue(`data.items[${index}].description`, e.target.value)}
          />
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add award
      </Button>
    </Box>
  );
}

function CustomForm({ formik }: { formik: CustomFormik }) {
  const { values, handleChange, handleBlur, touched, errors } = formik;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Section Title"
        size="small"
        name="data.sectionTitle"
        value={values.data.sectionTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!getIn(touched, 'data.sectionTitle') && !!getIn(errors, 'data.sectionTitle')}
        helperText={getIn(touched, 'data.sectionTitle') && getIn(errors, 'data.sectionTitle')}
      />
      <TextField
        fullWidth
        multiline
        rows={6}
        label="Content"
        name="data.content"
        value={values.data.content}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  );
}

export { getInitialValues };
