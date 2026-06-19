import Box from '@mui/material/Box';

export function row(children: React.ReactNode) {
  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      '& > *': { flex: '1 1 200px' },
      '@media (max-width: 767px)': {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        gap: 1,
      },
    }}>
      {children}
    </Box>
  );
}
