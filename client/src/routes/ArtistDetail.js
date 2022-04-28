import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Typography, CircularProgress } from '@mui/material';

import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import LikeButton from '../components/LikeButton';
import CommentBox from '../components/CBox';
import useComments from '../hooks/useComments';

const GET_ARTIST = gql`
  query Artist($artistId: ID!) {
    artist(ids: $artistId) {
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

const GET_COMMENTS = gql`
  query Query($type: String!, $pageId: ID!) {
    comments(type: $type, pageId: $pageId) {
      owner {
        nickname
      }
      text
      id
      createdAt
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
  const [artist, setArtist] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites } = useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_ARTIST, {
    variables: { artistId: id },
  });
  const [getComments] = useLazyQuery(GET_COMMENTS);
  //useComments(artist?.type || null, artist?.id || null, setComments);
  const fetchComments = async (type, pageId) => {
    const {
      data: { comments: commentData },
    } = await getComments({
      variables: { type, pageId },
    });

    setComments(commentData);
  };

  const isLiked = () => {
    try {
      return userFavorites.artists.map((f) => f.id).includes(artist?.id);
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
    if (data && data.artist) {
      setArtist(data.artist[0]);
    }
    if (artist) {
      fetchComments(artist.type, artist.id);
    }
  }, [error, userFavorites, loading, artist, comments]);

  const getTypeAndId = () => ({ type: artist.type, refId: artist.id });

  return (
    <>
      <p> {(loading || error) && 'Loading..'} </p>
      {data && artist && (
        <div>
          <div style={{ display: 'flex' }}>
            <img
              src={artist.images && artist.images[0].url}
              style={{ width: '20vw' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="h1" variant="h2">
                {artist?.name}
              </Typography>
            </div>
            {loggedInUser && (
              <LikeButton
                trackId={artist.id}
                type={artist.type}
                userId={loggedInUser.id}
                isLiked={isLiked()}
              />
            )}
          </div>

          <Typography component="h3" variant="h4">
            Popular tracks
          </Typography>
          {data.artistTopTracks &&
            data.artistTopTracks.map((m) => (
              <Link to={`/track/${m.id}`}>
                <img src={m.album?.images[0].url} style={{ width: '40px' }} />
                <span>{m.name}</span>
                <span>{m.album.name}</span>
              </Link>
            ))}
          <Typography component="h3" variant="h4">
            Albums
          </Typography>
          {data.artistAlbums &&
            data.artistAlbums.map((m) => (
              <Link key={m.id} to={`/album/${m.id}`}>
                <img src={m.images[0].url} style={{ width: '40px' }} />
                <span>{m.name}</span>
                <span>{m.release_date}</span>
                {m.artists && m.artists.map((a) => a.name)}
              </Link>
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

      <Typography component="h1" variant="h4">
        Comments
      </Typography>
      {loggedInUser && <CommentBox getTypeAndId={getTypeAndId} />}
      {Array.isArray(comments) &&
        comments?.map((comment) => (
          <div>
            <span>
              {comment.owner.nickname}
              {': '}
            </span>
            <span>{comment.text}</span>
          </div>
        ))}
    </>
  );
};

export default ArtistDetail;
