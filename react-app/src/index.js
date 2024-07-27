// index.js
import React, { Suspense, lazy } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Loading from './Loading';
import reportWebVitals from './reportWebVitals';
import Layout from './layout/Layout';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store';
import { ThemeProviderContext } from 'context/ThemeContext';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from 'api/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const App = lazy(() => import('./App'));

const Root = () => {
  return (
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <ThemeProviderContext>
            <HelmetProvider>
              <MsalProvider instance={msalInstance}>
                <Router>
                  <Layout>
                    <App />
                  </Layout>
                </Router>
              </MsalProvider>
            </HelmetProvider>
          </ThemeProviderContext>
        </Provider>
      </Suspense>
    </StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Root />);
}

reportWebVitals();
