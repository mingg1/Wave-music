import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import LikeButton from '../components/LikeButton';
import CommentBox from '../components/CommentBox';
import placeholderImg from '../components/images/playlistPlaceholder.png';
import {
  GET_COMMENTS,
  mapDispatchToProps,
  mapStateToProps,
} from '../queries/commentQuery';
import ImageCard from '../components/ImageCard';
import GridContainer from '../components/GridContainer';
import TrackCard from '../components/TrackCard';
import LoadingIcon from '../components/LoadingIcon';
import Comment from '../components/Comment';
import { MainTitle, SubTitle } from '../components/Typographies';
import { connect } from 'react-redux';

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
      preview_url
      duration_ms
      id
      album {
        id
        name
        images {
          url
        }
      }
      artists {
        name
        id
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

const ArtistDetail = ({ getFetchedComments, state }) => {
  const { comments } = state;
  const [artist, setArtist] = useState(undefined);
  //const [comments, setComments] = useState(undefined);
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites } = useContext(TokenContext);

  const { loading, data, error } = useQuery(GET_ARTIST, {
    variables: { artistId: id },
  });
  const [getComments] = useLazyQuery(GET_COMMENTS);

  const fetchComments = async (type, pageId) => {
    const {
      data: { comments: commentData },
    } = await getComments({
      variables: { type, pageId },
    });
    getFetchedComments(commentData);
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
  }, [error, userFavorites, loading, artist, id]);

  const getTypeAndId = () => ({ type: artist?.type, refId: artist?.id });

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && artist && (
        <div>
          <div style={{ display: 'flex', width: '70vw', margin: '48px auto' }}>
            <img
              src={(artist?.images && artist?.images[0]?.url) || placeholderImg}
              style={{ width: '15vw' }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 30,
              }}
            >
              <MainTitle>{artist?.name}</MainTitle>

              {loggedInUser && (
                <LikeButton
                  trackId={artist.id}
                  type={artist.type}
                  userId={loggedInUser.id}
                  isLiked={isLiked()}
                />
              )}
            </div>
          </div>
          <SubTitle style={{ marginLeft: '5rem' }}>Popular tracks</SubTitle>
          <div style={{ width: '80vw' }}>
            {data.artistTopTracks &&
              data.artistTopTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  favorites={userFavorites}
                />
              ))}
            <SubTitle style={{ marginLeft: '5rem' }}>Albums</SubTitle>
            <GridContainer visible={true}>
              {data.artistAlbums &&
                data.artistAlbums.map((album) => (
                  <ImageCard element={album} type="album" key={album.id} />
                ))}
            </GridContainer>
            <SubTitle style={{ marginTop: 24, marginLeft: '5rem' }}>
              Related Artists
            </SubTitle>
            <GridContainer visible={true}>
              {data?.relatedArtists &&
                data?.relatedArtists.map((r) => (
                  <ImageCard element={r} type={artist?.type} key={r.id} />
                ))}
            </GridContainer>
          </div>
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
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
