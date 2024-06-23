// src/App.js
import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Form from './Form.js';

const theme = createTheme({
  palette: {
    background: {
      default: '#f8f9fa',
    },
  },
});

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Form/>
    </ThemeProvider>
  );
}

export default App;
