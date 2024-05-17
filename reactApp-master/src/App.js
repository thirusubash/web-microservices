import React, { lazy, Suspense } from 'react';
import Layout from '@components/layout/Layout';
import routes from './routes';
import Loading from '@components/layout/Loading';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  return (

    <Layout>
      <Suspense fallback={<Loading />}>
        {routes}
      </Suspense>
    </Layout>

  );
};

export default App;
