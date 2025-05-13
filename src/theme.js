import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#002233',
      light: '#335566',
      dark: '#001122',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e1d9cc',
      light: '#f5f2ec',
      dark: '#b1a99c',
      contrastText: '#000000',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          textTransform: 'none',
        },
        contained: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#002233',
          color: '#ffffff',
        },
      },
    },
  },
});
export default theme;
