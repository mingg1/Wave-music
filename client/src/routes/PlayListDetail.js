import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';

import PlaylistHeader from '../components/PlaylistHeader';
import TrackCard from '../components/TrackCard';
import LoadingIcon from '../components/LoadingIcon';

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
          images {
            url
          }
        }
      }
    }
  }
`;

const PlayListDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const { fetchToken, userFavorites } = useContext(TokenContext);
  const { loading, data, error } = useQuery(GET_PL_TRACKS, {
    variables: { playlistId: id },
  });

  // const [addFavorite] = useMutation(TOGGLE_FAVORITE);

  // const saveFavorite = async (trackId, type, userId, mutation) => {
  //   const {
  //     error,
  //     data: { addFavorite: items },
  //   } = await mutation({
  //     variables: {
  //       trackId,
  //       type,
  //       userId,
  //     },
  //   });
  //   if (error) {
  //     console.log(error);
  //   }
  //   console.log(items);
  //   setUserFavorites(items);
  // };

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
  }, [error, userFavorites]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && (
        <>
          <PlaylistHeader element={location?.state} />
          <div>
            {data &&
              data.playlistTracks.map((t) => {
                const { track } = t;
                return (
                  <TrackCard
                    key={track.id}
                    track={track}
                    favorites={userFavorites}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default PlayListDetail;
