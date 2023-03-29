import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from './assets/theme';
import GlobalStyles from './GlobalStyle';
import Router from './routes';

export default function App() {
  return (
    <ThemeProvider theme={colors}>
      <BrowserRouter>
        <GlobalStyles />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
