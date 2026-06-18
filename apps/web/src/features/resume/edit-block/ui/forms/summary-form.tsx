'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik, getIn } from 'formik';
import type { BlockData } from '@/entities/resume/model/types';

type SummaryFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'summary' }>>>;

export function SummaryForm({ formik }: { formik: SummaryFormik }) {
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
