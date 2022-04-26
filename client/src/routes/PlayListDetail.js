import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';

const GET_PL_TRACKS = gql`
  query playlistTracks($playlistId: ID!) {
    playlistTracks(playlistId: $playlistId) {
      track {
        id
        type
        preview_url
        duration_ms
        name
        artists {
          id
          name
        }
        album {
          id
          name
        }
      }
    }
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation Mutation($trackId: ID, $type: String, $userId: ID) {
    addFavorite(id: $trackId, type: $type, userId: $userId) {
      tracks {
        id
        name
      }
    }
  }
`;

const PlayListDetail = () => {
  const location = useLocation();

  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites, setUserFavorites } =
    useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_PL_TRACKS, {
    variables: { playlistId: id },
  });

  const [addFavorite] = useMutation(TOGGLE_FAVORITE);

  const saveFavorite = async (trackId, type, userId, mutation) => {
    const {
      error,
      data: { addFavorite: items },
    } = await mutation({
      variables: {
        trackId,
        type,
        userId,
      },
    });
    if (error) {
      console.log(error);
    }
    console.log(items);
    setUserFavorites(items);
  };

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
    console.log(userFavorites);
    console.log(location.state);
  }, [error, userFavorites]);

  return (
    <div className="App">
      <header className="App-header">
        <p> {(loading || error) && 'Loading..'} </p>
        <div style={{ display: 'flex' }}>
          <img src={location.state.coverImg} style={{ width: '20vw' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h2">
              {location.state.name}
            </Typography>
            <Typography component="h5" variant="h5">
              {location.state.description}
            </Typography>
          </div>
        </div>
        <div>
          {data &&
            data.playlistTracks.map((t) => {
              const { track } = t;

              return (
                <div
                  key={track.id}
                  style={{ backgroundColor: 'tomato', marginBottom: 10 }}
                >
                  {Array.isArray(userFavorites)
                    ? userFavorites
                        .map((f) => f.id)
                        .includes(track.id)
                        .toString()
                    : '  d '}
                  <LikeButton
                    trackId={track.id}
                    type={track.type}
                    userId={loggedInUser.id}
                    isLiked={
                      Array.isArray(userFavorites) &&
                      userFavorites?.map((f) => f.id)?.includes(track.id)
                    }
                  />

                  <h5
                    onClick={() => {
                      console.log(track.id);
                      saveFavorite(
                        track.id,
                        track.type,
                        loggedInUser.id,
                        addFavorite
                      );
                    }}
                  >
                    {track.name}
                  </h5>
                  {track?.artists?.map((artist) => (
                    <Link id={artist.id} to={`/artist/${artist.id}`}>
                      {artist.name} {artist.id}
                    </Link>
                  ))}
                </div>
              );
            })}
        </div>
      </header>
    </div>
  );
};

export default PlayListDetail;
