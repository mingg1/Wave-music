import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import LikeButton from './LikeButton';
import AddTrackButton from './AddTrackButton';
import PlayButton from './PlayButton';
import placeholder from './images/playlistPlaceholder.png';
import DeleteButton from './DeleteTrackButton';

const calculateTrackDuration = (millisec) => {
  const minutes = Math.floor(millisec / 60000);
  const seconds = ((millisec % 60000) / 1000).toFixed(0);
  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const TrackCard = ({ track, favorites, owner }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const [isPlayBtnShown, setIsPlayBtnShown] = useState(false);
  return (
    <div
      key={track.id}
      style={{
        maxWidth: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: 'auto auto 16px auto',
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{ width: 90, height: 90 }}
        onMouseEnter={() => {
          if (track?.preview_url) {
            setIsPlayBtnShown(true);
          }
        }}
        onMouseLeave={() =>
          setTimeout(() => {
            setIsPlayBtnShown(false);
          }, 1000)
        }
      >
        <img
          style={{ width: '100%' }}
          src={track?.album?.images[0]?.url || placeholder}
        />
      </div>

      {isPlayBtnShown && <PlayButton track={track} />}

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
          id={track?.id}
          to={`/track/${track?.id}`}
          style={{
            marginBottom: 8,
            textDecoration: 'none',
            fontWeight: 600,
            color: 'black',
            fontSize: 18,
          }}
        >
          {track?.name}
        </Link>
        <div style={{ display: 'flex' }}>
          {track?.artists?.map((artist) => (
            <Link
              key={artist.id}
              id={artist.id}
              to={`/artist/${artist.id}`}
              style={{
                marginRight: 12,
                fontWeight: 600,
                textDecoration: 'none',
                color: '#05396d',
              }}
            >
              {artist.name}
            </Link>
          ))}
        </div>
      </div>
      <Typography style={{ alignSelf: 'center', marginRight: 16 }}>
        {calculateTrackDuration(track?.duration_ms)}
      </Typography>
      {loggedInUser && (
        <div style={{ alignSelf: 'center' }}>
          <LikeButton
            trackId={track?.id}
            type={track?.type}
            userId={loggedInUser.id}
            isLiked={favorites?.tracks?.map((f) => f.id).includes(track.id)}
          />
          <AddTrackButton
            key={track?.id}
            trackId={track?.id}
            userId={loggedInUser.id}
          />
          {owner === loggedInUser.id && <DeleteButton trackId={track?.id} />}
        </div>
      )}
    </div>
  );
};
export default TrackCard;
