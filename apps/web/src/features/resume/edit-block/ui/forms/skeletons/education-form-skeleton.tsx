'use client';

import Box from '@mui/material/Box';
import { FieldSk, RowSk, CardSk, CardHeaderSk, AddBtnSk } from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function EducationFormSkeleton() {
  return (
    <Box>
      <CardSk>
        <CardHeaderSk />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FieldSk labelWidth={90} />
          <RowSk><FieldSk labelWidth={55} /><FieldSk labelWidth={100} /></RowSk>
          <RowSk><FieldSk labelWidth={80} /><FieldSk labelWidth={70} /><FieldSk labelWidth={35} /></RowSk>
        </Box>
      </CardSk>
      <AddBtnSk width={130} />
    </Box>
  );
}
