'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function ProfileSearchStatusSkeleton() {
  return (
    <Box sx={{ p: '20px', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Skeleton
        variant="rectangular"
        width={120}
        height={16}
        animation="wave"
        sx={{ borderRadius: '6px', mb: 1.5 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            sx={{ flex: 1, height: 60, borderRadius: '12px' }}
            animation="wave"
          />
        ))}
      </Box>
    </Box>
  );
}
