'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik, getIn } from 'formik';
import { useTranslations } from 'next-intl';
import type { BlockData } from '@/entities/resume/model/types';

type SummaryFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'summary' }>>>;

const MAX_SUMMARY_LENGTH = 600;

export function SummaryForm({ formik }: { formik: SummaryFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
  const textLength = formik.values.data.text.length;
  const textError = getIn(formik.touched, 'data.text') && getIn(formik.errors, 'data.text');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label={t('sectionTitle')}
        size="small"
        name="data.sectionTitle"
        value={formik.values.data.sectionTitle ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          !!getIn(formik.touched, 'data.sectionTitle') &&
          !!getIn(formik.errors, 'data.sectionTitle')
        }
        helperText={
          (getIn(formik.touched, 'data.sectionTitle') &&
            getIn(formik.errors, 'data.sectionTitle')) ||
          ' '
        }
      />
      <TextField
        fullWidth
        multiline
        rows={6}
        label={t('content')}
        name="data.text"
        value={formik.values.data.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!textError}
        slotProps={{ htmlInput: { maxLength: MAX_SUMMARY_LENGTH } }}
        helperText={
          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{textError || ' '}</span>
            <span style={{ flexShrink: 0, marginLeft: 8 }}>
              {textLength} / {MAX_SUMMARY_LENGTH}
            </span>
          </Box>
        }
      />
    </Box>
  );
}
