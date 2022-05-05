import React from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';

const PlaylistPlayBtn = ({ setPlaylist }) => {
  return (
    <MdPlayCircleFilled
      style={{ cursor: 'pointer' }}
      size={40}
      onClick={setPlaylist}
    />
  );
};

export default PlaylistPlayBtn;
