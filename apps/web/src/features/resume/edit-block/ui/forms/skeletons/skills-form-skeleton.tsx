'use client';

import Box from '@mui/material/Box';
import {
  FieldSk,
  IconBtnSk,
  CardSk,
  AddBtnSk,
  PillSk,
} from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function SkillsFormSkeleton() {
  return (
    <Box>
      <CardSk>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <FieldSk labelWidth={90} />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: '20px' }}>
              <IconBtnSk />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <PillSk width={65} />
            <PillSk width={80} />
            <PillSk width={55} />
          </Box>
          <FieldSk labelWidth={80} />
        </Box>
      </CardSk>
      <AddBtnSk width={110} />
    </Box>
  );
}
