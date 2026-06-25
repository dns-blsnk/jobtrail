'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { type useFormik, getIn } from 'formik';
import { useTranslations } from 'next-intl';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { row } from '@/features/resume/edit-block/ui/forms/form-row';
import type { BlockData, ExperienceItem } from '@/entities/resume/model/types';

type ExperienceFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'experience' }>>>;

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

export function ExperienceForm({ formik }: { formik: ExperienceFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
              {item.role || item.company || t('positionNumber', { number: index + 1 })}
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
                aria-label="Remove position"
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
                  label={t('company')}
                  size="small"
                  value={item.company}
                  onChange={(e) =>
                    void setFieldValue(`data.items[${index}].company`, e.target.value)
                  }
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].company`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].company`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].company`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].company`) &&
                      getIn(formik.errors, `data.items[${index}].company`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('role')}
                  size="small"
                  value={item.role}
                  onChange={(e) => void setFieldValue(`data.items[${index}].role`, e.target.value)}
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].role`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].role`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].role`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].role`) &&
                      getIn(formik.errors, `data.items[${index}].role`)) ||
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
                  placeholder="Jan 2022"
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
                  placeholder="Dec 2023"
                  value={item.endDate}
                  disabled={item.present}
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
              </>,
            )}

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1 1 200px',
                  ml: 1,
                }}
              >
                <Checkbox
                  size="small"
                  checked={item.present}
                  onChange={(e) => {
                    void setFieldValue(`data.items[${index}].present`, e.target.checked);
                    if (e.target.checked) void setFieldValue(`data.items[${index}].endDate`, '');
                  }}
                  sx={{
                    p: '11px',
                    '@media (pointer: coarse)': { p: '15px' },
                  }}
                />
                <Box
                  component="span"
                  sx={{ fontSize: 14, color: 'text.primary', userSelect: 'none' }}
                >
                  {t('present')}
                </Box>
              </Box>
              <TextField
                label={t('location')}
                size="small"
                sx={{ flex: '1 1 200px' }}
                value={item.location}
                onChange={(e) =>
                  void setFieldValue(`data.items[${index}].location`, e.target.value)
                }
              />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label={t('description')}
              value={item.description}
              onChange={(e) =>
                void setFieldValue(`data.items[${index}].description`, e.target.value)
              }
            />
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
          {t('addPosition')}
        </Button>
      </Box>
    </Box>
  );
}
