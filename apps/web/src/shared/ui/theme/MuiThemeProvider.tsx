'use client';

import { ThemeProvider } from '@mui/material/styles';
import { globalTheme } from '@/shared/ui/theme/mui-theme';

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}
