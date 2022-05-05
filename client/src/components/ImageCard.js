import React from 'react';
import { Link } from 'react-router-dom';
import playlistPlaceholder from './images/playlistPlaceholder.png';

const ImageCard = ({ element, type, userMade }) => {
  return (
    <div
      style={{
        borderRadius: 15,
        margin: 'auto',
        padding: '10%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        minWidth: '80%',
        maxWidth: '80%',
        height: 260,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        state={userMade && { userMade }}
        id={element?.id}
        to={`/${type}/${element?.id}`}
        style={{
          minWidth: '100%',
          /* min-height: 100%; */
          width: 'auto',
          height: 'auto',
        }}
      >
        <img
          alt={element?.type || type}
          src={
            (element?.images && element?.images[0]?.url) || playlistPlaceholder
          }
          style={{
            minWidth: '100%',
            height: 200,
            borderRadius: 15,
            maxWidth: '100%',
          }}
        />
      </Link>
      <Link
        style={{
          margin: '8px 0',
          textDecoration: 'none',
          fontWeight: 600,
          color: 'black',
          fontSize: 18,
        }}
        state={userMade && { userMade }}
        id={element?.id}
        to={`/${type}/${element?.id}`}
      >
        {element?.name}
      </Link>
    </div>
  );
};
export default ImageCard;
