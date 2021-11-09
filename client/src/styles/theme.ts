import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      error: string;
      primary: string;
      default: string;
      bar1: string;
      bar2: string;
      bar3: string;
      bar4: string;
      bar5: string;
      bar6: string;
      bar7: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      error?: string;
      primary?: string;
      default?: string;
      bar1?: string;
      bar2?: string;
      bar3?: string;
      bar4?: string;
      bar5?: string;
      bar6?: string;
      bar7?: string;
    };
  }
}

export const theme = createTheme({
  colors: {
    error: '#D32F2F',
    primary: '#1976D2',
    default: '#C4C4C4',
    bar1: '#4CAF50',
    bar2: '#8BC34A',
    bar3: '#FFEB3B',
    bar4: '#FF9800',
    bar5: '#FF5722',
    bar6: '#F50057',
    bar7: '#AA2E25',
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
