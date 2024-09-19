import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { persistor, store, } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme.ts';
import { ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
