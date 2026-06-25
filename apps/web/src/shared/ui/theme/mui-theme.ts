import { createTheme } from '@mui/material/styles';
import { color } from '@job-search-tracker/tokens';

export const globalTheme = createTheme({
  shape: { borderRadius: 6 },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: color.borderDefault,
          },
          '&:not(.Mui-error):hover .MuiOutlinedInput-notchedOutline': {
            borderColor: color.borderHover,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: color.borderError,
          },
          '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: color.borderError,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          minHeight: '1.25em',
          marginTop: 3,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 40,
          minHeight: 40,
          '@media (pointer: coarse)': {
            minWidth: 48,
            minHeight: 48,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 40,
          '@media (pointer: coarse)': {
            minHeight: 48,
          },
        },
        sizeSmall: {
          minHeight: 36,
          '@media (pointer: coarse)': {
            minHeight: 44,
          },
        },
      },
    },
  },
});
