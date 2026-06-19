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
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import type { BlockData, LanguageItem } from '@/entities/resume/model/types';

type LanguagesFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'languages' }>>>;

const deleteButtonSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  p: '5px',
  color: 'var(--ink-3)',
  '&:hover': { color: 'error.main', borderColor: 'error.main', background: 'transparent' },
} as const;

export function LanguagesForm({ formik }: { formik: LanguagesFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
        <Box
          key={item.id}
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 2 }, mb: 2 }}
        >
          <TextField
            label={t('language')}
            size="small"
            sx={{ flex: 1 }}
            value={item.language}
            onChange={(e) => void setFieldValue(`data.items[${index}].language`, e.target.value)}
            onBlur={() => void formik.setFieldTouched(`data.items[${index}].language`, true)}
            error={getIn(formik.touched, `data.items[${index}].language`) && Boolean(getIn(formik.errors, `data.items[${index}].language`))}
            helperText={(getIn(formik.touched, `data.items[${index}].language`) && getIn(formik.errors, `data.items[${index}].language`)) || ' '}
          />
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
              <InputLabel>{t('level')}</InputLabel>
              <Select
                label={t('level')}
                value={item.level}
                onChange={(e) => void setFieldValue(`data.items[${index}].level`, e.target.value)}
              >
                {levels.map((l) => (
                  <MenuItem key={l} value={l}>{l}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={() => removeItem(index)} aria-label="Remove" size="small" sx={deleteButtonSx}>
              <Icon name="trash" size={14} />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
          {t('addLanguage')}
        </Button>
      </Box>
    </Box>
  );
}
