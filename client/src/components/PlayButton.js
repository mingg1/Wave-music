import React from 'react';
import { connect } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { addSong, setCurrentSong } from '../store';

const PlayButton = ({ track, songsSet, state, setCurrentSong }) => {
  const { player } = state;
  return (
    <div
      style={{
        marginRight: 'auto',
        width: 90,
        height: 90,
        background: 'linear-gradient(#c6c6c642,#0000009e)',
        position: 'absolute',
        color: 'white',
      }}
    >
      <FaPlay
        size={40}
        style={{
          position: 'absolute',
          transform: 'translateX(-50%)',
          left: '50%',
          bottom: '25px',
          cursor: 'pointer',
        }}
        onClick={() => {
          songsSet(track);
          setCurrentSong(player.songs.length);
          //   togglePlaying(player.playing);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  songsSet: (songList) => dispatch(addSong(songList)),
  setCurrentSong: (index) => dispatch(setCurrentSong(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
