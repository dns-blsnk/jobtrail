'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik, getIn } from 'formik';
import type { BlockData } from '@/entities/resume/model/types';

type CustomFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'custom' }>>>;

export function CustomForm({ formik }: { formik: CustomFormik }) {
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
