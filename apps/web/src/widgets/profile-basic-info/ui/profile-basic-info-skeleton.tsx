'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function ProfileBasicInfoSkeleton() {
  return (
    <Box sx={{ p: '20px', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Skeleton
          variant="rectangular"
          width={80}
          height={16}
          animation="wave"
          sx={{ borderRadius: '6px' }}
        />
        <Skeleton
          variant="rectangular"
          width={36}
          height={16}
          animation="wave"
          sx={{ borderRadius: '6px' }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        width="60%"
        height={14}
        animation="wave"
        sx={{ borderRadius: '6px', mb: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={44}
        animation="wave"
        sx={{ borderRadius: '6px', mb: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="40%"
        height={12}
        animation="wave"
        sx={{ borderRadius: '6px' }}
      />
    </Box>
  );
}
