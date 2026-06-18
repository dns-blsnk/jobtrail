'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { Icon } from '@/shared/ui/icon/icon';
import { row } from '@/features/resume/edit-block/ui/forms/form-row';
import type { BlockData, AwardItem } from '@/entities/resume/model/types';

type AwardsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'awards' }>>>;

export function AwardsForm({ formik }: { formik: AwardsFormik }) {
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

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 600, fontSize: 14 }}>{item.title || `Award ${index + 1}`}</Box>
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
                label="Title" size="small" value={item.title}
                onChange={(e) => void setFieldValue(`data.items[${index}].title`, e.target.value)}
                onBlur={() => void formik.setFieldTouched(`data.items[${index}].title`, true)}
                error={getIn(formik.touched, `data.items[${index}].title`) && Boolean(getIn(formik.errors, `data.items[${index}].title`))}
                helperText={getIn(formik.touched, `data.items[${index}].title`) && getIn(formik.errors, `data.items[${index}].title`)}
              />
              <TextField label="Date" size="small" value={item.date} onChange={(e) => void setFieldValue(`data.items[${index}].date`, e.target.value)} />
            </>
          )}
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
        Add award
      </Button>
    </Box>
  );
}
