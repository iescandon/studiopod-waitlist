'use client';
import { createTheme } from '@mui/material/styles';
import { Manrope } from 'next/font/google';

const font = Manrope({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#d4ac7c'
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  }
});

export default theme;