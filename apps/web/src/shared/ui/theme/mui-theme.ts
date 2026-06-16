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
  },
});
