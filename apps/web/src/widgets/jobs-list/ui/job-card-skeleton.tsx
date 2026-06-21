'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function JobCardSkeletonItem() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton
          variant="rectangular"
          width={80}
          height={22}
          animation="wave"
          sx={{ borderRadius: '12px' }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width={90}
            height={28}
            animation="wave"
            sx={{ borderRadius: '6px' }}
          />
          <Skeleton
            variant="rectangular"
            width={28}
            height={28}
            animation="wave"
            sx={{ borderRadius: '6px' }}
          />
        </Box>
      </Box>
      <Box>
        <Skeleton
          variant="rectangular"
          width="60%"
          height={20}
          animation="wave"
          sx={{ borderRadius: '4px', mb: 0.5 }}
        />
        <Skeleton
          variant="rectangular"
          width="40%"
          height={16}
          animation="wave"
          sx={{ borderRadius: '4px' }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {[70, 90, 60, 80, 50].map((w, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={w}
            height={24}
            animation="wave"
            sx={{ borderRadius: '12px' }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={14}
          animation="wave"
          sx={{ borderRadius: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={14}
          animation="wave"
          sx={{ borderRadius: '4px' }}
        />
      </Box>
    </Box>
  );
}

export function JobCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeletonItem key={i} />
      ))}
    </Box>
  );
}
