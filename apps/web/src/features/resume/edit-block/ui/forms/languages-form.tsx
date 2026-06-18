'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';
import { Icon } from '@/shared/ui/icon/icon';
import type { BlockData, LanguageItem } from '@/entities/resume/model/types';

type LanguagesFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'languages' }>>>;

export function LanguagesForm({ formik }: { formik: LanguagesFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: LanguageItem = {
      id: crypto.randomUUID(),
      language: '',
      level: 'B2',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  const levels: LanguageItem['level'][] = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            label="Language"
            size="small"
            sx={{ flex: 1 }}
            value={item.language}
            onChange={(e) => void setFieldValue(`data.items[${index}].language`, e.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Level</InputLabel>
            <Select
              label="Level"
              value={item.level}
              onChange={(e) => void setFieldValue(`data.items[${index}].level`, e.target.value)}
            >
              {levels.map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => removeItem(index)} aria-label="Remove">
            <Icon name="trash" size={14} />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add language
      </Button>
    </Box>
  );
}
