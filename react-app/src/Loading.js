import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader" role="status" aria-live="polite" aria-busy="true"></div>
    </div>
  );
};

export default React.memo(Loading);
