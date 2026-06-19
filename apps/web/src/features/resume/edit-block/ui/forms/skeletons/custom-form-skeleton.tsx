'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { FieldSk, LABEL_H } from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function CustomFormSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FieldSk labelWidth={100} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Skeleton variant="rectangular" width={65} height={LABEL_H} animation="wave" sx={{ borderRadius: '6px' }} />
        <Skeleton variant="rectangular" width="100%" height={160} animation="wave" sx={{ borderRadius: '6px' }} />
      </Box>
    </Box>
  );
}
