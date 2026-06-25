'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import {
  FieldSk,
  SelectSk,
  IconBtnSk,
  AddBtnSk,
  LABEL_H,
} from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function SocialLinksFormSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        width={110}
        height={LABEL_H + 4}
        animation="wave"
        sx={{ borderRadius: '4px', mb: 2 }}
      />

      {[0, 1, 2].map((i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
          <SelectSk width={140} labelWidth={65} />
          <FieldSk labelWidth={30} />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: '20px' }}>
            <IconBtnSk />
          </Box>
        </Box>
      ))}

      <AddBtnSk width={100} />
    </Box>
  );
}
