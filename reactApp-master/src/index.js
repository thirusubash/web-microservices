import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { register } from './serviceWorkerRegistration';

import ProfileInitializer from '@auth/ProfileInitializer'; // Import the ProfileInitializer component
import Loading from '@components/layout/Loading';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

const App = lazy(() => import('./App')); // Lazily load the App component

const root = document.getElementById('root');

// Use createRoot to render your app
createRoot(root).render(
  <Provider store={store}>
    {/* Render the ProfileInitializer component */}
    <ProfileInitializer />
    <Router>
      {/* Wrap the App component with Suspense for lazy loading */}
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Router>
  </Provider>
);

reportWebVitals();
register();
