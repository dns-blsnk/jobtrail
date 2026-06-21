'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import { row } from '@/features/resume/edit-block/ui/forms/form-row';
import type { BlockData, EducationItem } from '@/entities/resume/model/types';

type EducationFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'education' }>>>;

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

export function EducationForm({ formik }: { formik: EducationFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
              {item.institution || t('institutionNumber', { number: index + 1 })}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => moveUp(index)}
                disabled={index === 0}
                aria-label="Move up"
                size="small"
                sx={moveButtonSx}
              >
                <Icon name="moveUp" size={14} />
              </IconButton>
              <IconButton
                onClick={() => moveDown(index)}
                disabled={index === values.data.items.length - 1}
                aria-label="Move down"
                size="small"
                sx={moveButtonSx}
              >
                <Icon name="moveDown" size={14} />
              </IconButton>
              <IconButton
                onClick={() => removeItem(index)}
                aria-label="Remove"
                size="small"
                sx={deleteButtonSx}
              >
                <Icon name="trash" size={14} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              label={t('institution')}
              size="small"
              value={item.institution}
              onChange={(e) =>
                void setFieldValue(`data.items[${index}].institution`, e.target.value)
              }
              onBlur={() => void formik.setFieldTouched(`data.items[${index}].institution`, true)}
              error={
                getIn(formik.touched, `data.items[${index}].institution`) &&
                Boolean(getIn(formik.errors, `data.items[${index}].institution`))
              }
              helperText={
                (getIn(formik.touched, `data.items[${index}].institution`) &&
                  getIn(formik.errors, `data.items[${index}].institution`)) ||
                ' '
              }
            />
            {row(
              <>
                <TextField
                  label={t('degree')}
                  size="small"
                  value={item.degree}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].degree`, e.target.value)
                  }
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].degree`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].degree`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].degree`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].degree`) &&
                      getIn(formik.errors, `data.items[${index}].degree`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('fieldOfStudy')}
                  size="small"
                  value={item.field}
                  onChange={(e) => void setFieldValue(`data.items[${index}].field`, e.target.value)}
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].field`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].field`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].field`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].field`) &&
                      getIn(formik.errors, `data.items[${index}].field`)) ||
                    ' '
                  }
                />
              </>,
            )}
            {row(
              <>
                <TextField
                  label={t('startDate')}
                  size="small"
                  placeholder="Sep 2018"
                  value={item.startDate}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].startDate`, e.target.value)
                  }
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].startDate`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].startDate`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].startDate`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].startDate`) &&
                      getIn(formik.errors, `data.items[${index}].startDate`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('endDate')}
                  size="small"
                  placeholder="Jun 2022"
                  value={item.endDate ?? ''}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].endDate`, e.target.value)
                  }
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].endDate`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].endDate`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].endDate`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].endDate`) &&
                      getIn(formik.errors, `data.items[${index}].endDate`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('gpa')}
                  size="small"
                  value={item.gpa ?? ''}
                  onChange={(e) => void setFieldValue(`data.items[${index}].gpa`, e.target.value)}
                  helperText=" "
                />
              </>,
            )}
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Button
          startIcon={<Icon name="plus" size={14} />}
          onClick={addItem}
          variant="outlined"
          size="small"
        >
          {t('addEducation')}
        </Button>
      </Box>
    </Box>
  );
}
