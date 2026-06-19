'use client';

import { useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { Icon } from '@/shared/ui/icon/icon';
import { PhotoCropDialog } from '@/features/resume/edit-block/ui/photo-crop-dialog';
import type { BlockData, SocialLinkItem } from '@/entities/resume/model/types';

export const MAX_HEADER_LINKS = 4;

type HeaderFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'header' }>>>;

export function HeaderForm({ formik }: { formik: HeaderFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
  const { values, handleChange, handleBlur, setFieldValue } = formik;
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropOpen, setCropOpen] = useState(false);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setCropSrc(evt.target?.result as string);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handleCropConfirm(croppedUrl: string) {
    void setFieldValue('data.photoUrl', croppedUrl);
    setCropOpen(false);
    setCropSrc(null);
  }

  function handleCropCancel() {
    setCropOpen(false);
    setCropSrc(null);
  }

  const shape = values.data.photoShape ?? 'circle';
  const shapePreview: Record<typeof shape, { borderRadius: string; width: number; height: number }> = {
    circle:   { borderRadius: '50%',  width: 80, height: 80  },
    square:   { borderRadius: '12px', width: 80, height: 80  },
    portrait: { borderRadius: '8px',  width: 80, height: 112 },
  };
  const shapeOptions: Array<{ value: typeof shape; label: string }> = [
    { value: 'circle',   label: t('circle')   },
    { value: 'square',   label: t('square')   },
    { value: 'portrait', label: t('portrait') },
  ];

  const links = values.data.links ?? [];
  const platforms: SocialLinkItem['platform'][] = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter', 'Other'];

  // Track link-field touched state by link ID (not by array index).
  // This prevents stale touched from showing on a new link added at the same index.
  const [touchedLinkIds, setTouchedLinkIds] = useState(() => new Set<string>());
  const touchLink = useCallback((id: string) => {
    setTouchedLinkIds((prev) => { const next = new Set(prev); next.add(id); return next; });
  }, []);

  // Track which link IDs were present when the form was last submitted.
  const submittedLinkIds = useRef(new Set<string>());
  const prevSubmitCount = useRef(formik.submitCount);
  if (formik.submitCount > prevSubmitCount.current) {
    prevSubmitCount.current = formik.submitCount;
    submittedLinkIds.current = new Set(links.map((l) => l.id));
  }

  function addLink() {
    if (links.length >= MAX_HEADER_LINKS) return;
    void setFieldValue('data.links', [
      ...links,
      { id: crypto.randomUUID(), platform: 'LinkedIn', title: '', url: '' } satisfies SocialLinkItem,
    ]);
  }

  function removeLink(index: number) {
    void setFieldValue('data.links', links.filter((_, i) => i !== index));
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      {/* Photo upload */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
        {/* Left: photo preview */}
        <Box
          onClick={() => photoInputRef.current?.click()}
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
            cursor: 'pointer',
            transition: 'border-color 0.15s ease, border-radius 0.15s ease, width 0.15s ease, height 0.15s ease',
            '&:hover': { borderColor: 'var(--accent)' },
          }}
        >
          {values.data.photoUrl ? (
            <Box component="img" src={values.data.photoUrl} alt="Profile"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Icon name="user" size={32} strokeWidth={1.4} style={{ color: 'var(--ink-3)' }} />
          )}
        </Box>

        {/* Middle: upload / remove */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => photoInputRef.current?.click()}
            startIcon={<Icon name="upload" size={14} strokeWidth={1.9} />}
            sx={{ fontSize: 12, textTransform: 'none' }}
          >
            {values.data.photoUrl ? t('changePhoto') : t('uploadPhoto')}
          </Button>
          {values.data.photoUrl && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => void setFieldValue('data.photoUrl', undefined)}
              startIcon={<Icon name="trash" size={14} strokeWidth={1.9} />}
              sx={{ fontSize: 12, textTransform: 'none' }}
            >
              {t('removePhoto')}
            </Button>
          )}
        </Box>

        {/* Shape picker */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ fontSize: 12, color: 'text.secondary' }}>{t('shape')}</Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {shapeOptions.map(({ value, label }) => (
              <Button
                key={value}
                variant={shape === value ? 'contained' : 'outlined'}
                size="small"
                onClick={() => void setFieldValue('data.photoShape', value)}
                sx={{ fontSize: 12, textTransform: 'none', minWidth: 76 }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>

        <input ref={photoInputRef} type="file" accept="image/*"
          onChange={handlePhoto} style={{ display: 'none' }} aria-hidden="true" />
      </Box>

      {/* Name */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label={t('firstName')} size="small" name="data.firstName" sx={{ flex: 1 }}
          value={values.data.firstName} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.firstName') && !!getIn(formik.errors, 'data.firstName')}
          helperText={(getIn(formik.touched, 'data.firstName') && getIn(formik.errors, 'data.firstName')) || ' '}
        />
        <TextField
          label={t('lastName')} size="small" name="data.lastName" sx={{ flex: 1 }}
          value={values.data.lastName} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.lastName') && !!getIn(formik.errors, 'data.lastName')}
          helperText={(getIn(formik.touched, 'data.lastName') && getIn(formik.errors, 'data.lastName')) || ' '}
        />
      </Box>

      {/* Job title */}
      <TextField
        fullWidth label={t('jobTitle')} size="small" name="data.jobTitle"
        value={values.data.jobTitle} onChange={handleChange} onBlur={handleBlur}
        error={!!getIn(formik.touched, 'data.jobTitle') && !!getIn(formik.errors, 'data.jobTitle')}
        helperText={(getIn(formik.touched, 'data.jobTitle') && getIn(formik.errors, 'data.jobTitle')) || ' '}
      />

      {/* Email + Phone (optional) */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label={t('email')} size="small" type="email" name="data.email" sx={{ flex: 1 }}
          value={values.data.email} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.email') && !!getIn(formik.errors, 'data.email')}
          helperText={(getIn(formik.touched, 'data.email') && getIn(formik.errors, 'data.email')) || ' '}
        />
        <TextField
          label={t('phoneOptional')} size="small" name="data.phone" sx={{ flex: 1 }}
          value={values.data.phone ?? ''}
          onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.phone') && !!getIn(formik.errors, 'data.phone')}
          helperText={(getIn(formik.touched, 'data.phone') && getIn(formik.errors, 'data.phone')) || ' '}
        />
      </Box>

      {/* Location (optional) + Website (optional) */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label={t('locationOptional')} size="small" name="data.location" sx={{ flex: 1 }}
          value={values.data.location ?? ''} onChange={handleChange} onBlur={handleBlur}
          helperText=" "
        />
        <TextField
          label={t('websiteOptional')} size="small" name="data.website" sx={{ flex: 1 }}
          value={values.data.website ?? ''} onChange={handleChange} onBlur={handleBlur}
          error={!!getIn(formik.touched, 'data.website') && !!getIn(formik.errors, 'data.website')}
          helperText={(getIn(formik.touched, 'data.website') && getIn(formik.errors, 'data.website')) || ' '}
        />
      </Box>

      {/* Social links */}
      <Box>
        <InputLabel sx={{ fontSize: 16, fontWeight: 500, color: 'text.primary', mb: 2.5 }}>
          {t('socialLinks')}
          <Box component="span" sx={{ ml: 1, fontSize: 16, color: 'text.disabled', fontWeight: 400 }}>
            {links.length}/{MAX_HEADER_LINKS}
          </Box>
        </InputLabel>

        {links.map((link, index) => (
          <Box key={link.id} sx={{ mb: 2 }}>
            {/* Row 1: platform + title + delete — all top-aligned */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <FormControl size="small" sx={{ minWidth: 130, flexShrink: 0 }}>
                <InputLabel>{t('platform')}</InputLabel>
                <Select
                  label={t('platform')}
                  value={link.platform}
                  onChange={(e) => void setFieldValue(`data.links[${index}].platform`, e.target.value)}
                >
                  {platforms.map((p) => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
                {/* spacer matches TextField helperText height so both columns are equal */}
                <FormHelperText> </FormHelperText>
              </FormControl>
              <TextField
                size="small"
                sx={{ flex: 1 }}
                value={link.title ?? ''}
                placeholder={link.platform !== 'Other' ? link.platform : 'My Portfolio'}
                onChange={(e) => void setFieldValue(`data.links[${index}].title`, e.target.value)}
                onBlur={() => touchLink(link.id)}
                error={
                  (touchedLinkIds.has(link.id) || submittedLinkIds.current.has(link.id)) &&
                  Boolean(getIn(formik.errors, `data.links[${index}].title`))
                }
                helperText={
                  ((touchedLinkIds.has(link.id) || submittedLinkIds.current.has(link.id)) &&
                  getIn(formik.errors, `data.links[${index}].title`)) || ' '
                }
              />
              <IconButton
                onClick={() => removeLink(index)}
                aria-label="Remove link"
                size="small"
                sx={{
                  flexShrink: 0,
                  color: 'var(--ink-3)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: '5px',
                  '&:hover': { color: 'error.main', borderColor: 'error.main', background: 'transparent' },
                }}
              >
                <Icon name="trash" size={14} strokeWidth={1.9} />
              </IconButton>
            </Box>
            {/* Row 2: URL — extra top gap to separate from row 1 */}
            <Box sx={{ mt: 1.5 }}>
              <TextField
                label={t('url')}
                size="small"
                fullWidth
                value={link.url}
                onChange={(e) => void setFieldValue(`data.links[${index}].url`, e.target.value)}
                onBlur={() => touchLink(link.id)}
                error={
                  (touchedLinkIds.has(link.id) || submittedLinkIds.current.has(link.id)) &&
                  Boolean(getIn(formik.errors, `data.links[${index}].url`))
                }
                helperText={
                  ((touchedLinkIds.has(link.id) || submittedLinkIds.current.has(link.id)) &&
                  getIn(formik.errors, `data.links[${index}].url`)) || ' '
                }
              />
            </Box>
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Button
            startIcon={<Icon name="plus" size={13} strokeWidth={2} />}
            onClick={addLink}
            disabled={links.length >= MAX_HEADER_LINKS}
            variant="outlined"
            size="small"
            sx={{ fontSize: 12, textTransform: 'none' }}
          >
            {t('addLink')}
          </Button>
        </Box>
      </Box>

      {cropSrc && (
        <PhotoCropDialog
          open={cropOpen}
          src={cropSrc}
          shape={shape}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}

    </Box>
  );
}
