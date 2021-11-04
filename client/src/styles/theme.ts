import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      error: string;
      primary: string;
      default: string;
      bar: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      error?: string;
      primary?: string;
      default?: string;
      bar?: string;
    };
  }
}

export const theme = createTheme({
  colors: {
    error: '#D32F2F',
    primary: '#1976D2',
    default: '#C4C4C4',
    bar: '#FFFF99',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          html: {
            overflowY: 'scroll',
          },
        },
      },
    },
  },
});
