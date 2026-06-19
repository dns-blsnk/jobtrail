'use client';

import Box from '@mui/material/Box';
import { FieldSk, RowSk, CardSk, CardHeaderSk, AddBtnSk } from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function AwardsFormSkeleton() {
  return (
    <Box>
      <CardSk>
        <CardHeaderSk />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <RowSk><FieldSk labelWidth={40} /><FieldSk labelWidth={40} /></RowSk>
          <FieldSk labelWidth={85} height={80} />
        </Box>
      </CardSk>
      <AddBtnSk width={115} />
    </Box>
  );
}
