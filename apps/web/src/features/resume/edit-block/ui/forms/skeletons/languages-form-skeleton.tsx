'use client';

import Box from '@mui/material/Box';
import { FieldSk, SelectSk, IconBtnSk, AddBtnSk } from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function LanguagesFormSkeleton() {
  return (
    <Box>
      {[0, 1, 2].map((i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
          <FieldSk labelWidth={75} />
          <SelectSk width={120} labelWidth={40} />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: '20px' }}>
            <IconBtnSk />
          </Box>
        </Box>
      ))}
      <AddBtnSk width={125} />
    </Box>
  );
}
