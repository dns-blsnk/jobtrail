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
import type { BlockData, AwardItem } from '@/entities/resume/model/types';

type AwardsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'awards' }>>>;

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

export function AwardsForm({ formik }: { formik: AwardsFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
              {item.title || t('awardNumber', { number: index + 1 })}
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
                  label={t('title')}
                  size="small"
                  value={item.title}
                  onChange={(e) => void setFieldValue(`data.items[${index}].title`, e.target.value)}
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].title`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].title`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].title`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].title`) &&
                      getIn(formik.errors, `data.items[${index}].title`)) ||
                    ' '
                  }
                />
                <TextField
                  label={t('date')}
                  size="small"
                  value={item.date}
                  onChange={(e) => void setFieldValue(`data.items[${index}].date`, e.target.value)}
                  onBlur={() => void formik.setFieldTouched(`data.items[${index}].date`, true)}
                  error={
                    getIn(formik.touched, `data.items[${index}].date`) &&
                    Boolean(getIn(formik.errors, `data.items[${index}].date`))
                  }
                  helperText={
                    (getIn(formik.touched, `data.items[${index}].date`) &&
                      getIn(formik.errors, `data.items[${index}].date`)) ||
                    ' '
                  }
                />
              </>,
            )}
            <TextField
              fullWidth
              multiline
              rows={3}
              label={t('description')}
              value={item.description}
              onChange={(e) =>
                void setFieldValue(`data.items[${index}].description`, e.target.value)
              }
              onBlur={() => void formik.setFieldTouched(`data.items[${index}].description`, true)}
              error={
                getIn(formik.touched, `data.items[${index}].description`) &&
                Boolean(getIn(formik.errors, `data.items[${index}].description`))
              }
              helperText={
                (getIn(formik.touched, `data.items[${index}].description`) &&
                  getIn(formik.errors, `data.items[${index}].description`)) ||
                ' '
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
          {t('addAward')}
        </Button>
      </Box>
    </Box>
  );
}
