import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import TokenContext from '../contexts/token-context';
import ImageCard from '../components/ImageCard';
import GridContainer from '../components/GridContainer';
import TrackCard from '../components/TrackCard';

const SEARCH = gql`
  query Search($query: String!, $type: String!) {
    search(query: $query, type: $type) {
      users {
        nickname
        id
      }
      albums {
        items {
          name
          id
          images {
            url
          }
          artists {
            id
            name
          }
        }
      }
      artists {
        items {
          name
          id
          images {
            url
          }
          type
        }
      }
      tracks {
        items {
          id
          type
          duration_ms
          name
          preview_url
          album {
            images {
              url
            }
          }
          artists {
            name
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const { fetchToken, userFavorites } = useContext(TokenContext);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('query');
  const searchType = params.get('type');

  const { loading, data, error } = useQuery(SEARCH, {
    variables: { query, type: searchType },
  });

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
    console.log(data);
  }, [error, userFavorites]);

  return (
    <div style={{ width: '70%' }}>
      <Typography>Searched by '{query}'</Typography>
      {(searchType === 'album' || searchType === 'all') && (
        <>
          <Typography>Albums</Typography>
          <GridContainer>
            {data?.search?.albums?.items?.map((album) => (
              <ImageCard element={album} type="album" />
            ))}
          </GridContainer>
        </>
      )}
      {(searchType === 'artist' || searchType === 'all') && (
        <>
          <Typography>Artists</Typography>
          <GridContainer>
            {data?.search?.artists?.items?.map((artist) => (
              <ImageCard element={artist} type={artist.type} />
            ))}
          </GridContainer>
        </>
      )}
      {(searchType === 'track' || searchType === 'all') && (
        <>
          <Typography>Tracks</Typography>

          {data?.search?.tracks?.items?.map((track) => (
            <TrackCard key={track.id} track={track} favorites={userFavorites} />
          ))}
        </>
      )}
      {(searchType === 'user' || searchType === 'all') && (
        <>
          <Typography>Users</Typography>
          <GridContainer>
            {data?.search?.users?.map((user) => (
              <ImageCard
                element={{ id: user.id, name: user.nickname }}
                type="user"
              />
            ))}
          </GridContainer>
        </>
      )}
    </div>
  );
};

export default Search;
