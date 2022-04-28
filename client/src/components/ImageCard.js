import React from 'react';
import { Link } from 'react-router-dom';
import portraitPlaceholder from './images/portraitPlaceholder.png';

const ImageCard = ({ element, type }) => {
  return (
    <div
      key={element.id}
      style={{
        borderRadius: 15,
        margin: 'auto',
        padding: '10%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        minWidth: '80%',
        maxWidth: '80%',
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        id={element.id}
        to={`/${type}/${element.id}`}
        style={{
          minWidth: '100%',
          /* min-height: 100%; */
          width: 'auto',
          height: 'auto',
        }}
      >
        <img
          alt={element.type}
          src={
            (element?.images && element?.images[0]?.url) || portraitPlaceholder
          }
          style={{
            minWidth: '100%',
            height: 180,
            borderRadius: 15,
            maxWidth: '100%',
          }}
        />
      </Link>
      <Link id={element.id} to={`/${type}/${element.id}`}>
        <h5>{element.name}</h5>
      </Link>
    </div>
  );
};
export default ImageCard;
