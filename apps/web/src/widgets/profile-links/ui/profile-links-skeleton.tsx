'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function ProfileLinksSkeleton() {
  return (
    <Box sx={{ p: '20px', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Skeleton
          variant="rectangular"
          width={50}
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
      {[160, 140, 180].map((w, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          width={w}
          height={12}
          animation="wave"
          sx={{ borderRadius: '6px', mb: 1 }}
        />
      ))}
    </Box>
  );
}
