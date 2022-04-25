import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import AuthContext from '../contexts/auth-context';

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

/*{userFavorites &&
                  userFavorites.map((f) => f.id).includes(track.id)
                    ? 'liked!'
                    : ''} */

const PlayListDetail = () => {
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites, setUserFavorites } =
    useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_PL_TRACKS, {
    variables: { playlistId: id },
  });

  const [addFavorite, refetch] = useMutation(TOGGLE_FAVORITE);

  const saveFavorite = async (trackId, type, userId) => {
    const {
      error,
      data: { addFavorite: items },
    } = await addFavorite({
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
  }, [error, userFavorites]);

  return (
    <div className="App">
      <header className="App-header">
        <p> {(loading || error) && 'Loading..'} </p>
        <div>
          {data &&
            data.playlistTracks.map((t) => {
              const { track } = t;

              return (
                <div key={track.id} style={{ backgroundColor: 'tomato' }}>
                  {Array.isArray(userFavorites)
                    ? userFavorites
                        .map((f) => f.id)
                        .includes(track.id)
                        .toString()
                    : '  d '}

                  <h5
                    onClick={() => {
                      console.log(track.id);
                      saveFavorite(track.id, track.type, loggedInUser.id);
                    }}
                  >
                    {track.name}
                  </h5>
                  {track?.artists?.map((artist) => (
                    <h6>{artist.name}</h6>
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
