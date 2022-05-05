import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import CommentBox from '../components/CommentBox';
import Comment from '../components/Comment';
import TrackCard from '../components/TrackCard';
import { MainTitle } from '../components/Typographies';

const GET_RECOMMENDATION = gql`
  query Query($seedArtists: ID, $seedGenres: String, $seedTracks: ID) {
    recommendations(
      seedArtists: $seedArtists
      seedGenres: $seedGenres
      seedTracks: $seedTracks
    ) {
      id
      duration_ms
      name
      preview_url
      album {
        id
        images {
          url
        }
        name
        artists {
          id
          name
        }
      }
      artists {
        name
        id
        genres
      }
      type
    }
  }
`;

const CurationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artist, genre, track } = location.state;
  const { fetchToken, userFavorites } = useContext(TokenContext);
  const { loading, data, error } = useQuery(GET_RECOMMENDATION, {
    variables: {
      seedArtists: artist?.toString() || '',
      seedGenres: genre?.toString() || '',
      seedTracks: track.toString() || '',
    },
  });

  useEffect(() => {
    if (!location.state) {
      navigate('/curation');
    }

    if (!loading && error) {
      fetchToken();
    }
  }, [error, userFavorites, loading]);

  return (
    <>
      <p> {(loading || error) && 'Loading..'} </p>
      {data && (
        <>
          <MainTitle>Recommended tracks for you!</MainTitle>
          <div style={{ width: '80vw' }}>
            {data.recommendations?.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                favorites={userFavorites}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CurationResult;
