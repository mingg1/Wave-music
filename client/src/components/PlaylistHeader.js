import React from 'react';
import { Typography } from '@mui/material';
import playlistPlaceholder from './images/playlistPlaceholder.png';
import { setPlayerSongs, setCurrentSong, togglePlaying } from '../store';
import { connect } from 'react-redux';
import DeletePlaylistBtn from './DeletePlaylistBtn';
import PlaylistPlayBtn from './PlaylistPlayBtn';

const PlaylistHeader = ({
  element,
  playlist,
  state,
  songsSet,
  togglePlaying,
}) => {
  const { player } = state;
  const playableList =
    Array.isArray(playlist) && playlist[0]?.track
      ? playlist?.reduce(
          (acc, t) => (t?.track?.preview_url ? [...acc, t.track] : acc),
          []
        )
      : playlist?.reduce(
          (acc, t) => (t?.preview_url ? [...acc, t] : acc),
          []
        ) || [];

  return (
    <div
      style={{
        display: 'flex',
        width: '80%',
        margin: 'auto',
        marginBottom: '2rem',
      }}
    >
      <img
        src={element?.coverImg || playlistPlaceholder}
        style={{ width: '30%', marginRight: '2rem' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Typography component="h1" variant="h2">
          {element?.name}
        </Typography>
        <Typography component="h5" variant="h5">
          {element?.description || element?.owner}
        </Typography>
        <div style={{ display: 'flex', gap: 16 }}>
          <PlaylistPlayBtn
            setPlaylist={() => {
              songsSet(playableList);
              !player.playing && togglePlaying(player.playing);
            }}
          />
          {element?.owner && <DeletePlaylistBtn />}
        </div>
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
