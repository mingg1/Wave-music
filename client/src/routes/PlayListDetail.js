import React, { useContext, useEffect } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import { connect } from 'react-redux';
import PlaylistHeader from '../components/PlaylistHeader';
import TrackCard from '../components/TrackCard';
import LoadingIcon from '../components/LoadingIcon';
import {
  GET_USER_PLAYLISTS,
  getPlaylistsQuery,
} from '../queries/userPlaylistQuery';
import { fetch } from '../store';

const GET_SF_PL_TRACKS = gql`
  query playlistTracks($playlistId: ID!) {
    playlistTracks(playlistId: $playlistId) {
      track {
        id
        type
        preview_url
        duration_ms
        name
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            url
          }
        }
      }
    }
  }
`;

const GET_USER_PL_TRACKS = gql`
  query Query($playlistId: ID!) {
    userPlaylist(playlistId: $playlistId) {
      name
      id
      owner {
        nickname
      }
      tracks {
        name
        preview_url
        duration_ms
        id
        album {
          name
          id
          images {
            url
          }
        }
        artists {
          id
          name
        }
        type
      }
      createdAt
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  getPlaylists: async (getUserPlaylists) =>
    dispatch(fetch(await getPlaylistsQuery(getUserPlaylists))),
});

const PlayListDetail = ({ getPlaylists }) => {
  const location = useLocation();
  const { id } = useParams();
  const isUserMade = location.state.userMade;
  const query = isUserMade ? GET_USER_PL_TRACKS : GET_SF_PL_TRACKS;
  const { fetchToken, userFavorites } = useContext(TokenContext);
  const { loading, data, error } = useQuery(query, {
    variables: { playlistId: id },
  });
  const [getUserPlaylists] = useLazyQuery(GET_USER_PLAYLISTS);

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
    getPlaylists(getUserPlaylists);
  }, [error, userFavorites]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && (
        <>
          <PlaylistHeader
            playlist={data?.playlistTracks}
            element={
              location?.state?.userMade
                ? {
                    name: data?.userPlaylist?.name,
                    owner: data?.userPlaylist?.owner?.nickname,
                  }
                : location?.state
            }
          />
          <div style={{ width: '100%' }}>
            {data && data?.playlistTracks
              ? data?.playlistTracks?.map((t) => {
                  const { track } = t;
                  return (
                    <TrackCard
                      key={track.id}
                      track={track}
                      favorites={userFavorites}
                    />
                  );
                })
              : data && data.userPlaylist?.tracks[0] !== null
              ? data.userPlaylist?.tracks?.map((track) => {
                  return (
                    <TrackCard
                      key={track?.id}
                      track={track}
                      favorites={userFavorites}
                    />
                  );
                })
              : 'not yet tracks'}
          </div>
        </>
      )}
    </>
  );
};

export default connect(null, mapDispatchToProps)(PlayListDetail);
