import { gql } from '@apollo/client';

export const GET_USER_PLAYLISTS = gql`
  query UserPlaylists($userId: ID!) {
    userPlaylists(userId: $userId) {
      id
      name
      userMade
      tracks {
        id
      }
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

  //  setUserPlaylists((prevState) => userPlaylists);
};
