import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Typography, CircularProgress } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import CommentBox from '../components/CBox';

const GET_TRACK = gql`
  query Track($trackId: ID!) {
    tracks(ids: $trackId) {
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

    recommendations(seedTracks: $trackId) {
      id
      name
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

const TrackDetail = () => {
  const getTypeAndId = () => ({ type: track.type, refId: track.id });
  const [comments, setComments] = useState(undefined);
  //const location = useLocation();
  const [track, setTrack] = useState([]);
  const { id } = useParams();

  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites } = useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_TRACK, {
    variables: { trackId: id },
  });
  const [getComments] = useLazyQuery(GET_COMMENTS);
  const fetchComments = async (type, pageId) => {
    if ((type, pageId)) {
      const {
        data: { comments: commentData },
      } = await getComments({
        variables: { type, pageId },
      });

      setComments(commentData);
    }
  };

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
    if (data && data.tracks) {
      setTrack(data.tracks[0]);
    }
    if (track) {
      fetchComments(track.type, track.id);
    }
  }, [error, userFavorites, track, loading, comments]);

  return (
    <>
      <p> {(loading || error) && 'Loading..'} </p>
      {data && track && (
        <>
          <div>
            <div style={{ display: 'flex' }}>
              <img
                src={track?.album?.images && track?.album?.images[0]?.url}
                style={{ width: '20vw', maxWidth: 280 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginLeft: 30 }}>
                  <Typography component="h1" variant="h3">
                    {track.name}
                  </Typography>
                  <Typography component="h3" variant="h4">
                    {track.artists?.map((a) => a.name)}
                  </Typography>

                  {loggedInUser && (
                    <LikeButton
                      trackId={track.id}
                      type={track.type}
                      userId={loggedInUser.id}
                      isLiked={
                        !!userFavorites?.tracks?.map((f) => f.id)?.includes(id)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Typography component="h3" variant="h4">
            Recommendations
          </Typography>
          <Typography component="h3" variant="h4">
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
      )}
    </>
  );
};

export default TrackDetail;
