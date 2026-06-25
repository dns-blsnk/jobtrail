'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import {
  FieldSk,
  RowSk,
  IconBtnSk,
  AddBtnSk,
  FIELD_H,
  LABEL_H,
} from '@/features/resume/edit-block/ui/forms/skeletons/parts';

export function HeaderFormSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Photo + upload buttons + shape selector */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton
            variant="circular"
            width={80}
            height={80}
            animation="wave"
            sx={{ flexShrink: 0 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Skeleton
              variant="rectangular"
              width={120}
              height={36}
              animation="wave"
              sx={{ borderRadius: '6px' }}
            />
            <Skeleton
              variant="rectangular"
              width={120}
              height={28}
              animation="wave"
              sx={{ borderRadius: '6px' }}
            />
          </Box>
        </Box>

        {/* Shape selector buttons */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width={50}
            height={LABEL_H}
            animation="wave"
            sx={{ borderRadius: '4px' }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ flex: 1, height: 36, borderRadius: '6px' }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ flex: 1, height: 36, borderRadius: '6px' }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ flex: 1, height: 36, borderRadius: '6px' }}
            />
          </Box>
        </Box>
      </Box>

      {/* First name + Last name */}
      <RowSk>
        <FieldSk labelWidth={80} />
        <FieldSk labelWidth={80} />
      </RowSk>

      {/* Job title */}
      <FieldSk labelWidth={70} />

      {/* Email + Phone */}
      <RowSk>
        <FieldSk labelWidth={45} />
        <FieldSk labelWidth={55} />
      </RowSk>

      {/* Location + Website */}
      <RowSk>
        <FieldSk labelWidth={70} />
        <FieldSk labelWidth={70} />
      </RowSk>

      {/* Social links section */}
      <Box>
        <Skeleton
          variant="rectangular"
          width={100}
          height={18}
          animation="wave"
          sx={{ borderRadius: '4px', mb: 2 }}
        />

        {[0, 1, 2].map((i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <Skeleton
                variant="rectangular"
                width={140}
                height={FIELD_H}
                animation="wave"
                sx={{ borderRadius: '6px', flexShrink: 0 }}
              />
              <FieldSk labelWidth={45} />
              <IconBtnSk />
            </Box>
          </Box>
        ))}

        <AddBtnSk width={100} />
      </Box>
    </Box>
  );
}
