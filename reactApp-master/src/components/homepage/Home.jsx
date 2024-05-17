import React, { lazy, Suspense } from 'react';
import { Divider } from '@mui/material';
import Loading from '@components/layout/Loading';
import { API_ENDPOINTS } from '@config/apiConfig';
const HomePage = lazy(() => import('./HomePage'));
import ImageDisplay from '../../utils/ImageDisplay';

// Lazy load the ProductData component


const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomePage productType={"/api/homepages"} />
    </Suspense>
  );
};

export default Home;
