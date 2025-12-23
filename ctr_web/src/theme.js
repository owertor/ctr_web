import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        }
      : {
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
  },
});