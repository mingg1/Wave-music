import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';
import AddTrackButton from './AddTrackButton';

const TrackCard = ({ track, favorites }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  return (
    <div
      style={{
        maxWidth: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: 'auto auto 16px auto',
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={track.album?.images[0]?.url}
        style={{ width: 90, height: 90 }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          marginLeft: 16,
          flex: 1,
        }}
      >
        <Link
          id={track.id}
          to={`/track/${track.id}`}
          style={{ marginBottom: 8 }}
        >
          {track.name}
        </Link>
        <div style={{ display: 'flex' }}>
          {track?.artists?.map((artist) => (
            <Link
              id={artist.id}
              to={`/artist/${artist.id}`}
              style={{ marginRight: 12 }}
            >
              {artist.name}
            </Link>
          ))}
        </div>
      </div>
      {loggedInUser && (
        <div style={{ alignSelf: 'center' }}>
          <LikeButton
            trackId={track.id}
            type={track.type}
            userId={loggedInUser.id}
            isLiked={favorites?.tracks?.map((f) => f.id)?.includes(track.id)}
          />
          <AddTrackButton />
        </div>
      )}
    </div>
  );
};
export default TrackCard;
