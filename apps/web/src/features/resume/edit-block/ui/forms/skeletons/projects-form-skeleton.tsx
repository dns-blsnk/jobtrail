'use client';

import Box from '@mui/material/Box';
import { FieldSk, RowSk, CardSk, CardHeaderSk, AddBtnSk, PillSk } from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function ProjectsFormSkeleton() {
  return (
    <Box>
      <CardSk>
        <CardHeaderSk />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <RowSk><FieldSk labelWidth={95} /><FieldSk labelWidth={30} /></RowSk>
          <RowSk><FieldSk labelWidth={80} /><FieldSk labelWidth={70} /></RowSk>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <PillSk width={60} /><PillSk width={75} />
          </Box>
          <FieldSk labelWidth={80} />
          <FieldSk labelWidth={85} height={80} />
        </Box>
      </CardSk>
      <AddBtnSk width={115} />
    </Box>
  );
}
