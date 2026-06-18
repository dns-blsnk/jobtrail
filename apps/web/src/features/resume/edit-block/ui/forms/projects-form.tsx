'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { Icon } from '@/shared/ui/icon/icon';
import { row } from '@/features/resume/edit-block/ui/forms/form-row';
import type { BlockData, ProjectItem } from '@/entities/resume/model/types';

type ProjectsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'projects' }>>>;

export function ProjectsForm({ formik }: { formik: ProjectsFormik }) {
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
