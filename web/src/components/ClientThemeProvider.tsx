import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default ClientThemeProvider;
