import React from 'react';
import ReactDOM from 'react-dom/client';
// @import pages
import App from './App';
// @import dependencies
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
// @import globalStyles
import './index.scss';
// @import fontStyles
import '@fontsource/inter/400.css'; // Regular weight
import '@fontsource/inter/700.css'; // Bold weight
import '@fontsource/inter/500.css'; // medium weight

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={client}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
