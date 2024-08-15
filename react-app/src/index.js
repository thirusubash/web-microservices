import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import Loading from './Loading';  // Loading component for Suspense fallback
import reportWebVitals from './reportWebVitals';  // Performance monitoring
import store from './redux/store';  // Redux store
import { ThemeProviderContext } from 'context/ThemeContext';  // Theme context
import { msalConfig } from 'api/authConfig';  // MSAL configuration
import PropTypes from 'prop-types'; // Import prop-types for prop validation
// Lazy load the main App and Layout components
const App = lazy(() => import('./App'));
const Layout = lazy(() => import('./layout/Layout'));

// Initialize the MSAL instance for authentication
const msalInstance = new PublicClientApplication(msalConfig);

// Error Boundary component to catch errors in lazy-loaded components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // Custom error UI
    }

    return this.props.children;
  }
}

// Props validation using prop-types
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children prop is provided and is a valid React node
};

const Root = () => {
  return (
    <StrictMode>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </StrictMode>
  );
};

// Mount the application to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Root />);
}

// Send performance metrics to an analytics endpoint (optional)
reportWebVitals();  
