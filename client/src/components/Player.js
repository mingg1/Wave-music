import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import {
  IoPauseOutline,
  IoShuffle,
  IoRepeat,
  IoVolumeMedium,
} from 'react-icons/io5';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Typography } from '@mui/material';
import {
  setCurrentSong,
  togglePlaying,
  toggleRandom,
  toggleRepeat,
} from '../store';

const PlayerContainer = styled.div`
  box-shadow: 30px 0 0 0 rgba(21, 27, 38, 0.15);
  background-color: #282828;
  width: 100vw;
  height: 100px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  display: grid;
  z-index: 1;
`;

const Player = ({
  state,
  togglePlaying,
  toggleRandom,
  toggleRepeat,
  setCurrent,
}) => {
  const { player } = state;
  let audio = useRef('audio_tag');
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleVolume = (volume) => {
    setVolume(volume);
    audio.current.volume = volume;
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * duration) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };

  const prevSong = () => {
    if (player.random) {
      setCurrent(~~(Math.random() * player.songs.length));
    } else {
      if (player.currentSong === 0) {
        setCurrent(player.songs.length - 1);
      } else {
        setCurrent(player.currentSong - 1);
      }
    }
  };

  const nextSong = () => {
    if (player.random) {
      setCurrent(~~(Math.random() * player.songs.length));
    } else {
      if (player.currentSong === player.songs.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(player.currentSong + 1);
      }
    }
  };

  // End of Song
  const handleEnd = () => {
    // Check for random and repeat options
    if (player.random) {
      setCurrent(~~(Math.random() * player.songs.length));
    } else {
      if (player.repeat) {
        nextSong();
      } else if (player.currentSong === player.songs.length - 1) {
        return;
      } else {
        nextSong();
      }
    }
  };

  const toggleAudio = async () => {
    if (audio.current.paused) {
      let play = await audio.current.play();

      if (play !== undefined) {
        await play.play();
      }
    } else {
      audio.current.pause();
    }
  };

  useEffect(() => {
    if (player.songs !== [] && player.playing) {
      toggleAudio();
    }
  }, [player.songs, player.currentSong]);

  return (
    <PlayerContainer>
      <audio
        ref={audio}
        preload="true"
        onEnded={handleEnd}
        onCanPlay={(e) => setDuration(e.target.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        src={player.songs && player.songs[player.currentSong]?.preview_url}
        type="audio/mpeg"
      ></audio>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          alt="album cover image"
          style={{
            width: '85px',
            height: '85px',
            padding: '0 15px',
          }}
          src={
            player.songs &&
            player.songs[player.currentSong]?.album?.images[0]?.url
          }
        />
        <div style={{ flex: 1 }}>
          <Typography>
            {player.songs && player.songs[player.currentSong]?.name}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {player.songs &&
              player.songs[player.currentSong]?.artists?.map((artist) => (
                <Typography style={{ marginRight: 12 }}>
                  {artist?.name}
                </Typography>
              ))}
          </div>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              alignSelf: 'center',
              justifySelf: 'center',
              position: 'absolute',
              left: '50%',
            }}
          >
            <MdSkipPrevious onClick={prevSong} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => {
                togglePlaying(player.playing);
                toggleAudio();
              }}
            >
              {player.playing ? <IoPauseOutline /> : <FaPlay />}
            </div>
            <MdSkipNext onClick={nextSong} />
            <input
              onChange={handleProgress}
              value={duration ? (currentTime * 100) / duration : 0}
              type="range"
              name="progresBar"
              id="prgbar"
            />
          </div>
        </div>
        <div style={{ marginRight: 24 }}>
          <IoRepeat
            onClick={() => toggleRepeat(player.repeat)}
            color={player.repeat ? 'white' : 'gray'}
          />
          <IoShuffle
            onClick={() => toggleRandom(player.random)}
            color={player.random ? 'white' : 'gray'}
          />
          <div>
            <IoVolumeMedium />
            <input
              value={Math.round(volume * 100)}
              type="range"
              name="volBar"
              id="volBar"
              onChange={(e) => handleVolume(e.target.value / 100)}
            />
          </div>
        </div>
      </div>
    </PlayerContainer>
  );
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  togglePlaying: (playing) => dispatch(togglePlaying(!playing)),
  toggleRepeat: (repeat) => dispatch(toggleRepeat(!repeat)),
  toggleRandom: (random) => dispatch(toggleRandom(!random)),
  setCurrent: (id) => dispatch(setCurrentSong(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
