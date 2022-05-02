import React from 'react';
import { Typography } from '@mui/material';
import playlistPlaceholder from './images/playlistPlaceholder.png';
import { MdPlayCircleFilled } from 'react-icons/md';
import { setPlayerSongs, setCurrentSong, togglePlaying } from '../store';
import { connect } from 'react-redux';

const PlaylistHeader = ({
  element,
  playlist,
  state,
  songsSet,
  togglePlaying,
}) => {
  const { player } = state;
  const playableList = playlist.reduce(
    (acc, t) => (t?.track?.preview_url ? [...acc, t.track] : acc),
    []
  );

  return (
    <div style={{ display: 'flex', width: '80%' }}>
      <img
        src={element?.coverImg || playlistPlaceholder}
        style={{ width: '20vw' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h2">
          {element?.name}
        </Typography>
        <Typography component="h5" variant="h5">
          {element?.description || element?.owner}
        </Typography>
        <MdPlayCircleFilled
          size={40}
          onClick={() => {
            songsSet(playableList);

            togglePlaying(player.playing);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  songsSet: (songList) => dispatch(setPlayerSongs(songList)),
  setCurrentSong: (index) => dispatch(setCurrentSong(index)),
  togglePlaying: (playing) => dispatch(togglePlaying(!playing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistHeader);
