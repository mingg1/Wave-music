import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import { Typography } from '@mui/material';
import PlaylistHeader from '../components/PlaylistHeader';
import TrackCard from '../components/TrackCard';
import LoadingIcon from '../components/LoadingIcon';
import GridContainer from '../components/GridContainer';
import ImageCard from '../components/ImageCard';

const GET_USER_INFO = gql`
  query UserPlaylists($userId: ID!) {
    userPlaylists(userId: $userId) {
      id
      name
      userMade
    }
    user(id: $userId) {
      nickname
      favorites {
        tracks {
          id
          duration_ms
          name
          preview_url
          album {
            name
            images {
              url
            }
          }
          artists {
            name
            images {
              url
            }
            id
            type
          }
          type
        }
        artists {
          name
          type
          images {
            url
          }
          id
        }
        albums {
          name
          images {
            url
          }
          id
          type
          artists {
            name
          }
        }
      }
    }
  }
`;

const User = () => {
  const { id } = useParams();
  const { fetchToken, userFavorites } = useContext(TokenContext);
  const { loading, data, error } = useQuery(GET_USER_INFO, {
    variables: { userId: id },
  });

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
          <Typography>{data.user.nickname}</Typography>
          <Typography>Playlists</Typography>
          {data.userPlaylists && (
            <GridContainer>
              {data.userPlaylists?.map((pl) => {
                return (
                  <ImageCard
                    element={pl}
                    key={pl.id}
                    type="playlist"
                    userMade={pl.userMade}
                  />
                );
              })}
            </GridContainer>
          )}
          <Typography>Favorites</Typography>
          <Typography>Tracks</Typography>
          <Typography>Artists</Typography>
          <Typography>Albums</Typography>
        </>
      )}
    </>
  );
};

export default User;
