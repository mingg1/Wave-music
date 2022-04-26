import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography, CircularProgress } from '@mui/material';

import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';

const GET_ARTIST = gql`
  query Artist($artistId: ID!) {
    artist(id: $artistId) {
      id
      genres
      images {
        url
      }
      name
      type
    }
    artistTopTracks(id: $artistId) {
      name
      duration_ms
      id
      album {
        id
        name
        images {
          url
        }
      }
    }
    artistAlbums(id: $artistId) {
      id
      album_type
      name
      images {
        url
      }
      release_date
      artists {
        name
        id
      }
      type
    }
    relatedArtists(id: $artistId) {
      id
      name
      images {
        url
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

const ArtistDetail = () => {
  //const location = useLocation();

  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites, setUserFavorites } =
    useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_ARTIST, {
    variables: { artistId: id },
  });

  const [addFavorite] = useMutation(TOGGLE_FAVORITE);

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
    console.log(data);
  }, [error, userFavorites]);

  return (
    <div className="App">
      <header className="App-header">
        <p> {(loading || error) && 'Loading..'} </p>
        {data && data.artist && (
          <div>
            <div style={{ display: 'flex' }}>
              <img src={data.artist.images[0].url} style={{ width: '20vw' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography component="h1" variant="h2">
                  {data.artist?.name}
                </Typography>
              </div>
            </div>

            <Typography component="h3" variant="h4">
              Popular tracks
            </Typography>
            {data.artistTopTracks &&
              data.artistTopTracks.map((m) => (
                <div>
                  <img src={m.album?.images[0].url} style={{ width: '40px' }} />
                  <span>{m.name}</span>
                  <span>{m.album.name}</span>
                </div>
              ))}
            <Typography component="h3" variant="h4">
              Albums
            </Typography>
            {data.artistAlbums &&
              data.artistAlbums.map((m) => (
                <div>
                  <img src={m.images[0].url} style={{ width: '40px' }} />
                  <span>{m.name}</span>
                  <span>{m.release_date}</span>
                  {m.artists && m.artists.map((a) => a.name)}
                </div>
              ))}
            <Typography component="h3" variant="h4">
              Related Artists
            </Typography>
            {data.relatedArtists &&
              data.relatedArtists.map((m) => (
                <div key={m.id}>
                  <img
                    src={m?.images[0]?.url}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'gray',
                    }}
                  />
                  <span>{m.name}</span>
                </div>
              ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default ArtistDetail;
