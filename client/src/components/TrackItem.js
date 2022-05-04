import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import LikeButton from './LikeButton';
import AddTrackButton from './AddTrackButton';
import placeholder from './images/playlistPlaceholder.png';
import DeleteButton from './DeleteTrackButton';

const TrackItem = ({ track, clickEvt, selected }) => {
  const [toggled, setToggled] = useState(false);
  const [border, setBorder] = useState(false);

  return (
    <div
      key={track.id}
      style={{
        paddingRight: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: '8px 24px',
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-between',
        border: border && '3px solid black',
        cursor: (selected < 5 || toggled) && 'pointer',
      }}
      onClick={() => {
        clickEvt(track.id, track.type);
        if (selected < 5 || toggled) {
          setBorder(!toggled);
          setToggled(!toggled);
        } else setBorder(false);
      }}
    >
      <img
        style={{ width: 90, height: 90 }}
        src={track?.album?.images[0]?.url || placeholder}
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
        <Typography fontFamily="Montserrat" fontWeight="600" fontSize={20}>
          {track?.name}
        </Typography>
        <div style={{ display: 'flex' }}>
          {track?.artists?.map((artist, i) => (
            <Typography
              key={artist.id}
              fontFamily="Montserrat"
              fontWeight="500"
              style={{ marginRight: 6 }}
            >
              {artist.name}
              {i !== track.artists.length - 1 && ','}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TrackItem;
