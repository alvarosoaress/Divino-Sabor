import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from './assets/theme';
import GlobalStyles from './GlobalStyle';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './data/AuthProvider';

export default function App() {
  return (
    <ThemeProvider theme={colors}>
      <AuthProvider>
        <BrowserRouter>
          <Router />
          <GlobalStyles />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
