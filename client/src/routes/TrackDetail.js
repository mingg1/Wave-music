import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import CommentBox from '../components/CommentBox';
import Comment from '../components/Comment';
import TrackCard from '../components/TrackCard';
import { connect } from 'react-redux';
import {
  GET_COMMENTS,
  mapDispatchToProps,
  mapStateToProps,
} from '../queries/commentQuery';
import { MainTitle, SubTitle } from '../components/Typographies';
import LoadingIcon from '../components/LoadingIcon';

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

const TrackDetail = ({ getFetchedComments, state }) => {
  const { comments } = state;
  const [track, setTrack] = useState([]);
  const getTypeAndId = () => ({ type: track.type, refId: track.id });
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
      getFetchedComments(commentData);
    }
  };

  useEffect(() => {
    console.log(track.id);
    if (!loading && error) {
      fetchToken();
    }
    if (data && data.tracks) {
      setTrack(data.tracks[0]);
    }
    if (track) {
      fetchComments(track.type, track.id);
    }
  }, [error, userFavorites, track, loading, id]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && track && (
        <div style={{ width: '70vw', margin: '48px auto' }}>
          <div
            style={{
              display: 'flex',
              width: '60vw',
              margin: '48px auto',
              justifyContent: 'flex-start',
            }}
          >
            <img
              src={track?.album?.images && track?.album?.images[0]?.url}
              style={{ width: '15vw', height: '15vw' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginLeft: 30 }}>
                <MainTitle>{track.name}</MainTitle>
                <div style={{ display: 'flex', gap: 24 }}>
                  {track.artists?.map((a) => (
                    <SubTitle key={a.id}>
                      <Link to={`/artist/${a.id}`}>{a.name}</Link>
                    </SubTitle>
                  ))}
                </div>
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

          <div style={{ width: '100%', margin: 'auto' }}>
            <div style={{ marginLeft: '5rem' }}>
              <SubTitle>Related Tracks</SubTitle>
            </div>
            {data.recommendations?.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                favorites={userFavorites}
              />
            ))}

            {loggedInUser && (
              <CommentBox key={track.id} getTypeAndId={getTypeAndId} />
            )}
            {Array.isArray(comments) &&
              comments?.map((comment) => (
                <Comment
                  commentData={comment}
                  key={comment.id}
                  loggedInUser={loggedInUser.id}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetail);
