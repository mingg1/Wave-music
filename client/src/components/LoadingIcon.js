import React from 'react';
import { Bars } from 'react-loader-spinner';

const LoadingIcon = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <Bars
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default LoadingIcon;
