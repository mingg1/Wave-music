import React from 'react';

const GridContainer = (props) => {
  return (
    <div
      style={{
        maxWidth: '80%',
        display: props.visible ? 'grid' : 'none',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: 24,
        margin: 'auto',
      }}
    >
      {props.children}
    </div>
  );
};
export default GridContainer;
