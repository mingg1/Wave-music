import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import { Slider } from '@mui/material';
import {
  IoPauseOutline,
  IoShuffle,
  IoRepeat,
  IoVolumeMedium,
} from 'react-icons/io5';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  setCurrentSong,
  togglePlaying,
  toggleRandom,
  toggleRepeat,
} from '../store';
import { Link } from 'react-router-dom';

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
  const audio = useRef('audio_tag');
  const [volume, setVolume] = useState(0.1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleVolume = (volume) => {
    setVolume(volume);
    audio.current.volume = volume;
  };

  const handleProgress = (e) => {
    const currentProgress = (e.target.value * duration) / 100;
    setCurrentTime(currentProgress);
    audio.current.currentTime = currentProgress;
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

  // End of the song
  const handleEnd = () => {
    // Check for random and repeat options
    if (player.random) {
      setCurrent(~~(Math.random() * player.songs.length));
    } else {
      if (player.repeat) {
        if (player.songs.length === 1) {
          toggleAudio();
        } else {
          nextSong();
        }
      } else togglePlaying(player.playing);
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
    if (player.songs.length !== 0) {
      // toggleAudio();
      audio.current.pause();
      audio.current.currentTime = 0;
      if (player.playing)
        audio.current.play();
    }
  }, [player.currentSong]);

  useEffect(() => {
    if (player.songs.length !== 0 && player.playing) {
      // toggleAudio();
      audio.current.pause();
      audio.current.currentTime = 0;
      audio.current.play();
    }
  }, [player.songs]);

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
            (player.songs &&
              player.songs[player.currentSong]?.album?.images[0]?.url) ||
            'http://www.scottishculture.org/themes/scottishculture/images/music_placeholder.png'
          }
        />
        <div
          style={{
            flex: 1,
            height: 60,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-evenly',
          }}
        >
          <Link
            id={player?.songs[player.currentSong]?.id}
            to={`/track/${player?.songs[player.currentSong]?.id}`}
            style={{
              marginBottom: 8,
              fontWeight: 600,
              color: 'white',
              fontSize: '1.2rem',
              textDecoration: 'none',
            }}
          >
            {player.songs && player.songs[player.currentSong]?.name}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {player.songs &&
              player.songs[player.currentSong]?.artists?.map((artist) => (
                <Link
                  key={artist?.id}
                  id={artist?.id}
                  to={`/artist/${artist?.id}`}
                  style={{
                    marginRight: 12,
                    color: 'gray',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {artist?.name}
                </Link>
              ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            position: 'absolute',
            left: '50%',
            justifySelf: 'center',
            marginLeft: -50,
            height: 60,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 70,
              marginBottom: 10,
            }}
          >
            <MdSkipPrevious
              onClick={prevSong}
              size={30}
              color="white"
              cursor="pointer"
            />
            <div
              onClick={() => {
                togglePlaying(player.playing);
                toggleAudio();
              }}
            >
              {player.playing ? (
                <IoPauseOutline size={30} cursor="pointer" color="white" />
              ) : (
                <FaPlay size={30} color="#a350d3" cursor="pointer" />
              )}
            </div>
            <MdSkipNext
              onClick={nextSong}
              size={30}
              color="white"
              cursor="pointer"
            />
          </div>
          <Slider
            size="small"
            onChange={handleProgress}
            value={duration ? (currentTime * 100) / duration : 0}
            sx={{
              color: '#a350d3',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
              },
            }}
          />
        </div>

        <div
          style={{
            marginRight: 24,
            gap: 16,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IoRepeat
            size={30}
            onClick={() => toggleRepeat(player.repeat)}
            color={player.repeat ? 'white' : 'gray'}
            cursor="pointer"
          />
          <IoShuffle
            size={30}
            onClick={() => toggleRandom(player.random)}
            color={player.random ? 'white' : 'gray'}
            cursor="pointer"
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IoVolumeMedium size={30} color="white" />
            <Slider
              onChange={(e) => handleVolume(e.target.value / 100)}
              aria-label="Volume"
              defaultValue={Math.round(volume * 100)}
              sx={{
                width: 100,
                color: 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  backgroundColor: '#fff',
                },
              }}
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
