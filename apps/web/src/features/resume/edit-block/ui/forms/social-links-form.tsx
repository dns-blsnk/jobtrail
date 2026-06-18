'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { Icon } from '@/shared/ui/icon/icon';
import type { BlockData, SocialLinkItem } from '@/entities/resume/model/types';

type SocialLinksFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'social-links' }>>>;

export function SocialLinksForm({ formik }: { formik: SocialLinksFormik }) {
  const { values, setFieldValue } = formik;

  function addItem() {
    const newItem: SocialLinkItem = {
      id: crypto.randomUUID(),
      platform: 'LinkedIn',
      url: '',
    };
    void setFieldValue('data.items', [...values.data.items, newItem]);
  }

  function removeItem(index: number) {
    void setFieldValue('data.items', values.data.items.filter((_, i) => i !== index));
  }

  const platforms: SocialLinkItem['platform'][] = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter', 'Other'];

  return (
    <Box>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Platform</InputLabel>
            <Select
              label="Platform"
              value={item.platform}
              onChange={(e) => void setFieldValue(`data.items[${index}].platform`, e.target.value)}
            >
              {platforms.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="URL"
            size="small"
            sx={{ flex: 1 }}
            value={item.url}
            onChange={(e) => void setFieldValue(`data.items[${index}].url`, e.target.value)}
            onBlur={() => void formik.setFieldTouched(`data.items[${index}].url`, true)}
            error={getIn(formik.touched, `data.items[${index}].url`) && Boolean(getIn(formik.errors, `data.items[${index}].url`))}
            helperText={getIn(formik.touched, `data.items[${index}].url`) && getIn(formik.errors, `data.items[${index}].url`)}
          />
          <IconButton onClick={() => removeItem(index)} aria-label="Remove">
            <Icon name="trash" size={14} />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
        Add link
      </Button>
    </Box>
  );
}
