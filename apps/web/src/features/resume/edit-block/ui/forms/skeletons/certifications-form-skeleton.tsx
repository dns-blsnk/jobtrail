'use client';

import Box from '@mui/material/Box';
import {
  FieldSk,
  RowSk,
  CardSk,
  CardHeaderSk,
  AddBtnSk,
} from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function CertificationsFormSkeleton() {
  return (
    <Box>
      <CardSk>
        <CardHeaderSk />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <RowSk>
            <FieldSk labelWidth={45} />
            <FieldSk labelWidth={55} />
          </RowSk>
          <RowSk>
            <FieldSk labelWidth={80} />
            <FieldSk labelWidth={90} />
            <FieldSk labelWidth={30} />
          </RowSk>
        </Box>
      </CardSk>
      <AddBtnSk width={150} />
    </Box>
  );
}
