'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { useFormik, getIn } from 'formik';
import { Icon } from '@/shared/ui/icon/icon';
import type { BlockData, SkillsData } from '@/entities/resume/model/types';

type SkillsFormik = ReturnType<typeof useFormik<Extract<BlockData, { type: 'skills' }>>>;

export function SkillsForm({ formik }: { formik: SkillsFormik }) {
  const { values, setFieldValue } = formik;

  function addGroup() {
    const newGroup: SkillsData['groups'][number] = {
      id: crypto.randomUUID(),
      name: '',
      tags: [],
    };
    void setFieldValue('data.groups', [...values.data.groups, newGroup]);
  }

  function removeGroup(index: number) {
    void setFieldValue('data.groups', values.data.groups.filter((_, i) => i !== index));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      const tag = input.value.trim();
      if (!tag) return;
      const current = values.data.groups[index].tags;
      if (!current.includes(tag)) {
        void setFieldValue(`data.groups[${index}].tags`, [...current, tag]);
      }
      input.value = '';
    }
  }

  function removeTag(groupIndex: number, tag: string) {
    const current = values.data.groups[groupIndex].tags;
    void setFieldValue(`data.groups[${groupIndex}].tags`, current.filter((t) => t !== tag));
  }

  return (
    <Box>
      {values.data.groups.map((group, index) => (
        <Box key={group.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <TextField
              label="Group name"
              size="small"
              value={group.name}
              onChange={(e) => void setFieldValue(`data.groups[${index}].name`, e.target.value)}
              onBlur={() => void formik.setFieldTouched(`data.groups[${index}].name`, true)}
              error={getIn(formik.touched, `data.groups[${index}].name`) && Boolean(getIn(formik.errors, `data.groups[${index}].name`))}
              helperText={getIn(formik.touched, `data.groups[${index}].name`) && getIn(formik.errors, `data.groups[${index}].name`)}
              sx={{ flex: 1 }}
            />
            <IconButton onClick={() => removeGroup(index)} aria-label="Remove group">
              <Icon name="trash" size={14} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {group.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" onDelete={() => removeTag(index, tag)} />
            ))}
          </Box>
          <TextField
            size="small"
            placeholder="Type skill and press Enter"
            onKeyDown={(e) => handleTagKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
            fullWidth
            error={getIn(formik.touched, `data.groups[${index}].tags`) && Boolean(getIn(formik.errors, `data.groups[${index}].tags`))}
            helperText={getIn(formik.touched, `data.groups[${index}].tags`) && getIn(formik.errors, `data.groups[${index}].tags`)}
          />
        </Box>
      ))}
      <Button startIcon={<Icon name="plus" size={14} />} onClick={addGroup} variant="outlined" size="small">
        Add group
      </Button>
    </Box>
  );
}
