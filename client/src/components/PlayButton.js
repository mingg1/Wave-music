import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { addSong, setCurrentSong } from '../store';

const PlayButton = ({ track, songsSet, state, setCurrentSong }) => {
  const [hovered, setHovered] = useState(false);
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
        color={hovered ? '#b48cff' : 'white'}
        size={40}
        style={{
          position: 'absolute',
          transform: 'translateX(-50%)',
          left: '50%',
          bottom: '25px',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
