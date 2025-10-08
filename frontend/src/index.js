import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReactQueryProvider } from './provider/react-query';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import { Button } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        preventDuplicate={true}
        action={(snackbarKey) => (
          <Button variant="text" sx={{ color: 'white' }} onClick={() => closeSnackbar(snackbarKey)}>
            Close
          </Button>
        )}
      >
        <App />
      </SnackbarProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
