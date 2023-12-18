import { createTheme } from '@mui/material';

const font = "'Inter', sans-serif";

const mediaQueryTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: '#002868ff',
    },
    secondary: {
      main: '#002868ff',
      // contrastText: '#002868ff',
    },
    background: {
      // default: '#002868ff',
    },
    colors: {
      // darkblue: '#002868ff',
      // lightgreen: '#002868ff',
    },
  },
  typography: {
    fontFamily: font,
    h3: {
      [mediaQueryTheme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    h4: {
      [mediaQueryTheme.breakpoints.down('sm')]: {
        fontSize: '1.75rem',
      },
    },
  },
});

export default theme;
