'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const FIELD_H  = 40;
export const LABEL_H  = 14;
const BR = '6px';
const WAVE = 'wave' as const;
const RECT = 'rectangular' as const;

/** Label + field stacked vertically. Grows to fill flex parent (flex:1). */
export function FieldSk({
  labelWidth = 90,
  height = FIELD_H,
}: {
  labelWidth?: number;
  height?: number;
}) {
  return (
    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Skeleton variant={RECT} width={labelWidth} height={LABEL_H} animation={WAVE} sx={{ borderRadius: BR }} />
      <Skeleton variant={RECT} width="100%" height={height} animation={WAVE} sx={{ borderRadius: BR }} />
    </Box>
  );
}

/** Flex row — all direct children share equal space via RowSk's > * rule. */
export function RowSk({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, '& > *': { flex: 1, minWidth: 0 } }}>
      {children}
    </Box>
  );
}

/** Bordered icon button (matches the move/delete icon buttons in forms). */
export function IconBtnSk() {
  return (
    <Skeleton
      variant={RECT}
      width={32}
      height={32}
      animation={WAVE}
      sx={{ borderRadius: '4px', flexShrink: 0 }}
    />
  );
}

/** Card header row: text label on left + three icon buttons on right. */
export function CardHeaderSk({ labelWidth = 140 }: { labelWidth?: number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
      <Skeleton variant={RECT} width={labelWidth} height={16} animation={WAVE} sx={{ borderRadius: '4px' }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconBtnSk /><IconBtnSk /><IconBtnSk />
      </Box>
    </Box>
  );
}

/** Bordered card wrapper matching real form cards. */
export function CardSk({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: { xs: 1.5, sm: 2 }, mb: 2 }}>
      {children}
    </Box>
  );
}

/** Centered "Add X" button skeleton. */
export function AddBtnSk({ width = 120 }: { width?: number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      <Skeleton variant={RECT} width={width} height={32} animation={WAVE} sx={{ borderRadius: '6px' }} />
    </Box>
  );
}

/** Pill chip skeleton (for tech stack / skill tags). */
export function PillSk({ width = 70 }: { width?: number }) {
  return (
    <Skeleton variant={RECT} width={width} height={24} animation={WAVE} sx={{ borderRadius: '12px' }} />
  );
}

/** Fixed-width select-like field (platform pickers, level dropdowns). */
export function SelectSk({ width, labelWidth = 60 }: { width: number; labelWidth?: number }) {
  return (
    <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Skeleton variant={RECT} width={labelWidth} height={LABEL_H} animation={WAVE} sx={{ borderRadius: BR }} />
      <Skeleton variant={RECT} width={width} height={FIELD_H} animation={WAVE} sx={{ borderRadius: BR }} />
    </Box>
  );
}
