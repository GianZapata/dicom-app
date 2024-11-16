"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: '#2c359a'
      }
   },
});


export const Provider = ({ children }: any) => {
   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Toaster />
         { children }
      </ThemeProvider>
   );
}