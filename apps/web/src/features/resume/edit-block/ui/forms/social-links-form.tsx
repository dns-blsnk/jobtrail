'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import type { BlockData, SocialLinkItem } from '@/entities/resume/model/types';

type SocialLinksFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'social-links' }>>>;

const deleteButtonSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  p: '5px',
  color: 'var(--ink-3)',
  '&:hover': { color: 'error.main', borderColor: 'error.main', background: 'transparent' },
} as const;

export function SocialLinksForm({ formik }: { formik: SocialLinksFormik }) {
  const t = useTranslations('resumeBuilderPage.editBlock');
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
      <InputLabel sx={{ fontSize: 16, fontWeight: 500, color: 'text.primary', mb: 2 }}>
        {t('socialLinks')}
        <Box component="span" sx={{ ml: 1, fontSize: 16, color: 'text.disabled', fontWeight: 400 }}>
          {values.data.items.length}
        </Box>
      </InputLabel>
      {values.data.items.map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>{t('platform')}</InputLabel>
              <Select
                label={t('platform')}
                value={item.platform}
                onChange={(e) => void setFieldValue(`data.items[${index}].platform`, e.target.value)}
              >
                {platforms.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
              <FormHelperText> </FormHelperText>
            </FormControl>
            <IconButton onClick={() => removeItem(index)} aria-label="Remove" size="small" sx={deleteButtonSx}>
              <Icon name="trash" size={14} />
            </IconButton>
          </Box>
          <TextField
            label={t('url')}
            size="small"
            fullWidth
            value={item.url}
            onChange={(e) => void setFieldValue(`data.items[${index}].url`, e.target.value)}
            onBlur={() => void formik.setFieldTouched(`data.items[${index}].url`, true)}
            error={getIn(formik.touched, `data.items[${index}].url`) && Boolean(getIn(formik.errors, `data.items[${index}].url`))}
            helperText={(getIn(formik.touched, `data.items[${index}].url`) && getIn(formik.errors, `data.items[${index}].url`)) || ' '}
          />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Button startIcon={<Icon name="plus" size={14} />} onClick={addItem} variant="outlined" size="small">
          {t('addLink')}
        </Button>
      </Box>
    </Box>
  );
}
