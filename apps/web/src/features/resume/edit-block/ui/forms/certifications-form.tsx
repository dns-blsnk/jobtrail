'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { type useFormik, getIn } from 'formik';
import { useTranslations } from 'next-intl';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { row } from '@/features/resume/edit-block/ui/forms/form-row';
import type { BlockData, CertificationItem } from '@/entities/resume/model/types';

type CertificationsFormik = ReturnType<
  typeof useFormik<Extract<BlockData, { type: 'certifications' }>>
>;

const moveButtonSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  p: '5px',
  color: 'var(--ink-3)',
  '&:hover': { borderColor: 'text.secondary', color: 'text.primary', background: 'transparent' },
  '&.Mui-disabled': { opacity: 0.38, borderColor: 'divider' },
} as const;

const deleteButtonSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  p: '5px',
  color: 'var(--ink-3)',
  '&:hover': { color: 'error.main', borderColor: 'error.main', background: 'transparent' },
} as const;

export function CertificationsForm({ formik }: { formik: CertificationsFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
    void setFieldValue(
      'data.items',
      values.data.items.filter((_, i) => i !== index),
    );
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
        <Box
          key={item.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: { xs: 1.5, sm: 2 },
            mb: 2,
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}
          >
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>
              {item.name || t('certificationNumber', { number: index + 1 })}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => moveUp(index)}
                disabled={index === 0}
                aria-label="Move up"
                size="small"
                sx={moveButtonSx}
              >
                <ArrowUpwardOutlinedIcon sx={{ fontSize: 14 }} />
              </IconButton>
              <IconButton
                onClick={() => moveDown(index)}
                disabled={index === values.data.items.length - 1}
                aria-label="Move down"
                size="small"
                sx={moveButtonSx}
              >
                <ArrowDownwardOutlinedIcon sx={{ fontSize: 14 }} />
              </IconButton>
              <IconButton
                onClick={() => removeItem(index)}
                aria-label="Remove"
                size="small"
                sx={deleteButtonSx}
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {row(
              <>
                <TextField
                  label={t('name')}
                  size="small"
                  value={item.name}
                  onChange={(e) => void setFieldValue(`data.items[${index}].name`, e.target.value)}
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].name`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].name`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].name`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].name`) &&
                      getIn(formik.errors, `data.items[${index}].name`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('issuer')}
                  size="small"
                  value={item.issuer}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].issuer`, e.target.value)
                  }
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].issuer`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].issuer`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].issuer`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].issuer`) &&
                      getIn(formik.errors, `data.items[${index}].issuer`)) ||
                    ' '
                  }
                />
              </>,
            )}
            {row(
              <>
                <TextField
                  label={t('issueDate')}
                  size="small"
                  value={item.issueDate}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].issueDate`, e.target.value)
                  }
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].issueDate`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].issueDate`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].issueDate`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].issueDate`) &&
                      getIn(formik.errors, `data.items[${index}].issueDate`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('expiryDate')}
                  size="small"
                  value={item.expiryDate ?? ''}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].expiryDate`, e.target.value)
                  }
                  onBlur={() =>
                    void formik.setFieldTouched(`data.items[${index}].expiryDate`, true)
                  }
                  error={
                    getIn(formik.touched, `data.items[${index}].expiryDate`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].expiryDate`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].expiryDate`) &&
                      getIn(formik.errors, `data.items[${index}].expiryDate`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('url')}
                  size="small"
                  value={item.url ?? ''}
                  onChange={(e) => void setFieldValue(`data.items[${index}].url`, e.target.value)}
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].url`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].url`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].url`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].url`) &&
                      getIn(formik.errors, `data.items[${index}].url`)) ||
                    ' '
                  }
                />
              </>,
            )}
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Button
          startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}
          onClick={addItem}
          variant="outlined"
          size="small"
        >
          {t('addCertification')}
        </Button>
      </Box>
    </Box>
  );
}
