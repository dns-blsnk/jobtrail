'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { type useFormik, getIn } from 'formik';
import { useTranslations } from 'next-intl';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { row } from '@/features/resume/edit-block/ui/forms/form-row';
import type { BlockData, ProjectItem } from '@/entities/resume/model/types';

type ProjectsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'projects' }>>>;

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

export function ProjectsForm({ formik }: { formik: ProjectsFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
    void setFieldValue(
      `data.items[${itemIndex}].techStack`,
      current.filter((tg) => tg !== tag),
    );
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
              {item.name || t('projectNumber', { number: index + 1 })}
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
                  label={t('projectName')}
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
            {row(
              <>
                <TextField
                  label={t('startDate')}
                  size="small"
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
                  value={item.endDate}
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {item.techStack.map((tag) => (
                <Chip key={tag} label={tag} size="small" onDelete={() => removeTech(index, tag)} />
              ))}
            </Box>
            <TextField
              size="small"
              placeholder={t('techPlaceholder')}
              onKeyDown={(e) =>
                handleTechKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)
              }
              fullWidth
              helperText=" "
            />
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
          {t('addProject')}
        </Button>
      </Box>
    </Box>
  );
}
