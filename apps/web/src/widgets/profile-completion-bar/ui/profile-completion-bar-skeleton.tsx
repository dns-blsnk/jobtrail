'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function ProfileCompletionBarSkeleton() {
  return (
    <Box sx={{ p: '16px 20px', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={14}
          animation="wave"
          sx={{ borderRadius: '6px' }}
        />
        <Skeleton
          variant="rectangular"
          width={30}
          height={14}
          animation="wave"
          sx={{ borderRadius: '6px' }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={6}
        animation="wave"
        sx={{ borderRadius: '4px', mb: 0.75 }}
      />
      <Skeleton
        variant="rectangular"
        width={200}
        height={12}
        animation="wave"
        sx={{ borderRadius: '6px' }}
      />
    </Box>
  );
}
