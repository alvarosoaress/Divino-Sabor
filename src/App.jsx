import React from 'react';
import { ThemeProvider } from 'styled-components';
import { colors } from './assets/Theme';
import Header from './components/Header';
import GlobalStyles from './GlobalStyle';
import Home from './pages/Home';

export default function App() {
  return (
    <ThemeProvider theme={colors}>
      <GlobalStyles />
      <Header />
      <Home />
    </ThemeProvider>
  );
}
