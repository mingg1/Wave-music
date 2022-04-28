import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Typography, CircularProgress } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import CommentBox from '../components/CBox';

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

const GET_COMMENTS = gql`
  query Comments($type: String!, $pageId: ID!) {
    comments(type: $type, pageId: $pageId) {
      id
      text
      owner {
        nickname
      }
      createdAt
    }
  }
`;

const AlbumDetail = () => {
  const [comments, setComments] = useState(undefined);

  const [album, setAlbum] = useState([]);
  const { id } = useParams();
  console.log(id);
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites } = useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_ALBUM, {
    variables: { albumIds: id },
  });
  const getTypeAndId = () => ({ type: 'album', refId: album.id });
  const [getComments] = useLazyQuery(GET_COMMENTS);
  //useComments(artist?.type || null, artist?.id || null, setComments);
  const fetchComments = async (type, pageId) => {
    if ((type, pageId)) {
      const {
        data: { comments },
        error,
      } = await getComments({
        variables: { type, pageId },
      });
      console.log(type, pageId, data, error);
      setComments(comments);
    }
  };

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
    if (data && data.albums) {
      setAlbum((prevState) => data.albums[0]);
    }
    if (album) {
      console.log(album);
      fetchComments('album', album.id);
      //setIsliked(!!userFavorites?.albums?.map((f) => f.id)?.includes(id));
    }
  }, [error, userFavorites, loading, album, comments]);

  return (
    <>
      <p> {(loading || error) && 'Loading..'} </p>
      {data && album && (
        <>
          <div>
            <div style={{ display: 'flex' }}>
              <img
                src={album?.images && album.images[0].url}
                style={{ width: '20vw', maxWidth: 280 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginLeft: 30 }}>
                  <Typography component="h1" variant="h3">
                    {album.name}
                  </Typography>
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
                      type="album"
                      userId={loggedInUser.id}
                      isLiked={
                        !!userFavorites?.albums?.map((f) => f.id)?.includes(id)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {album.tracks?.items?.map((track) => (
              <div>
                <Typography component="h5" variant="h5">
                  {track?.name}
                </Typography>
                <Typography component="h6" variant="h6">
                  {track.artists?.map((a) => (
                    <Link to={`/artist/${a.id}`}>{a.name + ' '}</Link>
                  ))}
                </Typography>
                <Typography component="h6" variant="h6">
                  {track.duration_ms}
                </Typography>
              </div>
            ))}
          </div>
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
      )}
    </>
  );
};

export default AlbumDetail;
