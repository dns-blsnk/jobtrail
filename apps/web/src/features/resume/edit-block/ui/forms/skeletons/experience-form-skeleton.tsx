'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { FieldSk, RowSk, CardSk, CardHeaderSk, AddBtnSk, FIELD_H } from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function ExperienceFormSkeleton() {
  return (
    <Box>
      <CardSk>
        <CardHeaderSk />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <RowSk><FieldSk labelWidth={70} /><FieldSk labelWidth={45} /></RowSk>
          <RowSk><FieldSk labelWidth={80} /><FieldSk labelWidth={70} /></RowSk>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="rectangular" width={120} height={FIELD_H} animation="wave" sx={{ borderRadius: '6px', flexShrink: 0 }} />
            <Skeleton variant="rectangular" height={FIELD_H} animation="wave" sx={{ flex: 1, borderRadius: '6px' }} />
          </Box>
          <Skeleton variant="rectangular" width="100%" height={88} animation="wave" sx={{ borderRadius: '6px' }} />
        </Box>
      </CardSk>
      <AddBtnSk width={130} />
    </Box>
  );
}
