import React from 'react';
import { Typography } from '@mui/material';

const PlaylistHeader = ({ element }) => {
  return (
    <div style={{ display: 'flex' }}>
      <img src={element?.coverImg} style={{ width: '20vw' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h2">
          {element?.name}
        </Typography>
        <Typography component="h5" variant="h5">
          {element?.description}
        </Typography>
      </div>
    </div>
  );
};
export default PlaylistHeader;
