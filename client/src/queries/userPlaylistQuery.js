import { gql } from '@apollo/client';
import { add, addTracks, deletePlaylist } from '../store';

export const GET_USER_PLAYLISTS = gql`
  query UserPlaylists($userId: ID!) {
    userPlaylists(userId: $userId) {
      id
      name
      userMade
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
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($playlistId: ID!) {
    deletePlaylist(playlistId: $playlistId) {
      id
    }
  }
`;

export const getPlaylistsQuery = async (getUserPlaylists) => {
  try {
    const { data } = await getUserPlaylists({
      variables: {
        userId: JSON.parse(localStorage.getItem('user'))?.id,
      },
    });

    return data?.userPlaylists;
  } catch (e) {
    console.log(e);
  }
};

export const mapStateToProps = (state) => {
  return { state };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    addPlayList: (playlist) => dispatch(add(playlist)),
    addTrack: (newPl) => dispatch(addTracks(newPl)),
    deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
  };
};
