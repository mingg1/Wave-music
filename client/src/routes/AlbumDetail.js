import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useParams } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import CommentBox from '../components/CommentBox';
import TrackCard from '../components/TrackCard';
import {
  GET_COMMENTS,
  mapDispatchToProps,
  mapStateToProps,
} from '../queries/commentQuery';
import { MainTitle } from '../components/Typographies';
import Comment from '../components/Comment';
import { connect } from 'react-redux';

const GET_ALBUM = gql`
  query Album($albumIds: ID!) {
    albums(ids: $albumIds) {
      id
      artists {
        name
      }
      album_type
      name
      images {
        url
      }
      tracks {
        items {
          id
          preview_url
          name
          duration_ms
          type
          artists {
            name
            id
          }
        }
      }
      release_date
    }
  }
`;

const AlbumDetail = ({ getFetchedComments, state }) => {
  const { comments } = state;
  const type = 'album';
  //const [comments, setComments] = useState(undefined);
  const [album, setAlbum] = useState([]);
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites } = useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_ALBUM, {
    variables: { albumIds: id },
  });
  const getTypeAndId = () => ({ type, refId: album.id });
  const [getComments] = useLazyQuery(GET_COMMENTS);
  //useComments(artist?.type || null, artist?.id || null, setComments);
  const fetchComments = async (type, pageId) => {
    if ((type, pageId)) {
      const {
        data: { comments },
      } = await getComments({
        variables: { type, pageId },
      });
      //  console.log(type, pageId, data, error);
      //      setComments(comments);
      getFetchedComments(comments);
    }
  };

  useEffect(() => {
    console.log(comments);
    if (!loading && error) {
      fetchToken();
    }
    if (data && data.albums) {
      setAlbum((prevState) => data.albums[0]);
    }
    if (album) {
      fetchComments(type, album?.id);
      //setIsliked(!!userFavorites?.albums?.map((f) => f.id)?.includes(id));
    }
  }, [error, userFavorites, loading, album]);

  return (
    <>
      <p> {(loading || error) && 'Loading..'} </p>
      {data && album && (
        <>
          <div>
            <div
              style={{ display: 'flex', width: '70vw', margin: '48px auto' }}
            >
              <img
                src={album?.images && album.images[0].url}
                style={{ width: '15vw' }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ marginLeft: 30 }}>
                  <MainTitle>{album.name}</MainTitle>
                  <Typography component="h3" variant="h4">
                    {album.artists?.map((a) => a.name)}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    {album.release_date}
                  </Typography>
                  <Typography component="span" variant="span">
                    {album.album_type}
                  </Typography>

                  {loggedInUser && (
                    <LikeButton
                      trackId={album.id}
                      type={type}
                      userId={loggedInUser.id}
                      isLiked={
                        !!userFavorites?.albums?.map((f) => f?.id)?.includes(id)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '80vw' }}>
            {album.tracks?.items?.map((track) => (
              <TrackCard
                key={track.id}
                track={{
                  ...track,
                  album: { images: [{ url: album.images[0]?.url }] },
                }}
                favorites={userFavorites}
              />
            ))}
          </div>
          <div style={{ width: '80vw' }}>
            {loggedInUser && <CommentBox getTypeAndId={getTypeAndId} />}
            {Array.isArray(comments) &&
              comments?.map((comment) => (
                <Comment
                  commentData={comment}
                  key={comment.id}
                  loggedInUser={loggedInUser.id}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);
